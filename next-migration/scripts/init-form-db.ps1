[CmdletBinding()]
param(
    [string]$Database = "FORM_DB",
    [string]$Config = "wrangler.deploy.jsonc",
    [string]$SqlFile = "..\\..\\database\\form_db.bootstrap.sql",
    [switch]$Local,
    [switch]$Preview,
    [switch]$Remote
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$scriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectDirectory = Split-Path -Parent $scriptDirectory
$resolvedConfig = Join-Path $projectDirectory $Config
$resolvedSqlFile = [System.IO.Path]::GetFullPath((Join-Path $scriptDirectory $SqlFile))

if (-not (Test-Path -LiteralPath $resolvedConfig)) {
    throw "Wrangler config not found: $resolvedConfig"
}

if (-not (Test-Path -LiteralPath $resolvedSqlFile)) {
    throw "SQL bootstrap file not found: $resolvedSqlFile"
}

$locationFlagCount = @($Local.IsPresent, $Preview.IsPresent, $Remote.IsPresent) | Where-Object { $_ } | Measure-Object | Select-Object -ExpandProperty Count
if ($locationFlagCount -gt 1) {
    throw "Choose only one of -Local, -Preview, or -Remote."
}

$args = @(
    "wrangler",
    "d1",
    "execute",
    $Database,
    "--config",
    $resolvedConfig,
    "--file",
    $resolvedSqlFile,
    "--yes"
)

if ($Local) {
    $args += "--local"
}
elseif ($Preview) {
    $args += "--preview"
}
else {
    $args += "--remote"
}

Write-Host ">> npx $($args -join ' ')"
Push-Location $projectDirectory
try {
    & npx @args
    if ($LASTEXITCODE -ne 0) {
        throw "wrangler d1 execute failed with exit code ${LASTEXITCODE}."
    }
}
finally {
    Pop-Location
}
