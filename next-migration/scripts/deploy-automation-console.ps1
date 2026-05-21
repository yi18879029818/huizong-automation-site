[CmdletBinding()]
param(
    [string]$ApiBaseUrl,
    [string]$SiteBaseUrl = "https://www.coolyne.com",
    [string]$DeployConfig = "wrangler.deploy.jsonc",
    [string]$InternalAutomationUsername,
    [string]$InternalAutomationPassword,
    [string]$HuizongInternalApiToken,
    [switch]$SkipBuild,
    [switch]$SkipSecrets,
    [switch]$SkipDeploy,
    [switch]$SkipHealthCheck
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-RequiredValue {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name,
        [string]$CurrentValue,
        [switch]$Secret
    )

    if ($CurrentValue) {
        return $CurrentValue
    }

    if ($Secret) {
        $secureValue = Read-Host "Enter $Name" -AsSecureString
        $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureValue)
        try {
            return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
        }
        finally {
            if ($bstr -ne [IntPtr]::Zero) {
                [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
            }
        }
    }

    return (Read-Host "Enter $Name").Trim()
}

function Invoke-Step {
    param(
        [Parameter(Mandatory = $true)]
        [string]$FilePath,
        [string[]]$Arguments = @(),
        [hashtable]$Environment = @{}
    )

    $argumentText = if ($Arguments.Count -gt 0) { $Arguments -join " " } else { "" }
    Write-Host ">> $FilePath $argumentText"

    $oldValues = @{}
    foreach ($entry in $Environment.GetEnumerator()) {
        $oldValues[$entry.Key] = [Environment]::GetEnvironmentVariable($entry.Key, "Process")
        [Environment]::SetEnvironmentVariable($entry.Key, $entry.Value, "Process")
    }

    try {
        & $FilePath @Arguments
        if ($LASTEXITCODE -ne 0) {
            throw "Command failed with exit code ${LASTEXITCODE}: $FilePath $argumentText"
        }
    }
    finally {
        foreach ($entry in $Environment.GetEnumerator()) {
            [Environment]::SetEnvironmentVariable($entry.Key, $oldValues[$entry.Key], "Process")
        }
    }
}

function Set-WranglerSecret {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name,
        [Parameter(Mandatory = $true)]
        [string]$Value,
        [Parameter(Mandatory = $true)]
        [string]$ConfigPath
    )

    if (-not $Value) {
        throw "Secret $Name is empty."
    }

    Write-Host ">> Setting Cloudflare secret $Name"
    $previousInputEncoding = [Console]::InputEncoding
    try {
        [Console]::InputEncoding = [System.Text.UTF8Encoding]::new($false)
        $Value | & npx wrangler secret put $Name --config $ConfigPath
        if ($LASTEXITCODE -ne 0) {
            throw "wrangler secret put failed for $Name with exit code ${LASTEXITCODE}."
        }
    }
    finally {
        [Console]::InputEncoding = $previousInputEncoding
    }
}

$scriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectDirectory = Split-Path -Parent $scriptDirectory
$resolvedConfigPath = Join-Path $projectDirectory $DeployConfig

if (-not (Test-Path -LiteralPath $resolvedConfigPath)) {
    throw "Wrangler config not found: $resolvedConfigPath"
}

$ApiBaseUrl = Get-RequiredValue -Name "HUIZONG_API_BASE_URL" -CurrentValue $ApiBaseUrl

if (-not $SkipSecrets) {
    $InternalAutomationUsername = Get-RequiredValue -Name "INTERNAL_AUTOMATION_USERNAME" -CurrentValue $InternalAutomationUsername
    $InternalAutomationPassword = Get-RequiredValue -Name "INTERNAL_AUTOMATION_PASSWORD" -CurrentValue $InternalAutomationPassword -Secret
    $HuizongInternalApiToken = Get-RequiredValue -Name "HUIZONG_INTERNAL_API_TOKEN" -CurrentValue $HuizongInternalApiToken -Secret
}

$configContent = Get-Content -Raw -LiteralPath $resolvedConfigPath | ConvertFrom-Json
if (-not $configContent.vars) {
    $configContent | Add-Member -MemberType NoteProperty -Name vars -Value ([pscustomobject]@{})
}
if ($null -eq $configContent.vars.PSObject.Properties["HUIZONG_API_BASE_URL"]) {
    $configContent.vars | Add-Member -MemberType NoteProperty -Name HUIZONG_API_BASE_URL -Value $ApiBaseUrl
}
else {
    $configContent.vars.HUIZONG_API_BASE_URL = $ApiBaseUrl
}

$tempConfigPath = Join-Path $env:TEMP ("wrangler.automation.{0}.jsonc" -f ([Guid]::NewGuid().ToString("N")))
$configContent | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath $tempConfigPath -Encoding UTF8

try {
    Push-Location $projectDirectory

    if (-not $SkipBuild) {
        Invoke-Step -FilePath "npx" -Arguments @("-y", "node@20", "./node_modules/next/dist/bin/next", "build")
        Invoke-Step -FilePath "npx" -Arguments @("-y", "node@20", "./node_modules/@opennextjs/cloudflare/dist/cli/index.js", "build")
    }

    if (-not $SkipSecrets) {
        Set-WranglerSecret -Name "HUIZONG_INTERNAL_API_TOKEN" -Value $HuizongInternalApiToken -ConfigPath $tempConfigPath
        Set-WranglerSecret -Name "INTERNAL_AUTOMATION_USERNAME" -Value $InternalAutomationUsername -ConfigPath $tempConfigPath
        Set-WranglerSecret -Name "INTERNAL_AUTOMATION_PASSWORD" -Value $InternalAutomationPassword -ConfigPath $tempConfigPath
    }

    if (-not $SkipDeploy) {
        Invoke-Step -FilePath "npx" -Arguments @("wrangler", "deploy", "--config", $tempConfigPath, "--keep-vars")
    }

    if (-not $SkipHealthCheck) {
        $healthUri = ([Uri]::new([Uri]$SiteBaseUrl, "/api/automation/health")).AbsoluteUri
        $username = $InternalAutomationUsername
        $password = $InternalAutomationPassword

        if (-not $username -or -not $password) {
            throw "Health check requires INTERNAL_AUTOMATION_USERNAME and INTERNAL_AUTOMATION_PASSWORD."
        }

        $pair = "{0}:{1}" -f $username, $password
        $encodedPair = [Convert]::ToBase64String([System.Text.Encoding]::ASCII.GetBytes($pair))

        Write-Host ">> Checking $healthUri"
        $response = Invoke-WebRequest -Uri $healthUri -Headers @{ Authorization = "Basic $encodedPair" }
        $payload = $response.Content | ConvertFrom-Json
        $payload | ConvertTo-Json -Depth 10

        if (-not $payload.ok) {
            throw "Automation health check returned ok=false."
        }
    }
}
finally {
    Pop-Location
    if (Test-Path -LiteralPath $tempConfigPath) {
        Remove-Item -LiteralPath $tempConfigPath -Force
    }
}
