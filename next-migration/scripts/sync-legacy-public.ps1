$sourceDir = Join-Path $PSScriptRoot "..\\..\\public"
$destinationDir = Join-Path $PSScriptRoot "..\\public"

if (Test-Path $destinationDir) {
  Remove-Item -LiteralPath $destinationDir -Recurse -Force
}

New-Item -ItemType Directory -Path $destinationDir -Force | Out-Null
Copy-Item -LiteralPath $sourceDir\\* -Destination $destinationDir -Recurse -Force

Write-Host "Synced legacy public assets from $sourceDir to $destinationDir"
