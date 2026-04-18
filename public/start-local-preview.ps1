param(
  [int]$Port = 8080
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootFull = [System.IO.Path]::GetFullPath($root)

function Get-ContentType {
  param([string]$Path)

  switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    '.html' { 'text/html; charset=utf-8' }
    '.css' { 'text/css; charset=utf-8' }
    '.js' { 'application/javascript; charset=utf-8' }
    '.json' { 'application/json; charset=utf-8' }
    '.svg' { 'image/svg+xml' }
    '.png' { 'image/png' }
    '.jpg' { 'image/jpeg' }
    '.jpeg' { 'image/jpeg' }
    '.gif' { 'image/gif' }
    '.webp' { 'image/webp' }
    '.ico' { 'image/x-icon' }
    '.fbx' { 'application/octet-stream' }
    '.glb' { 'model/gltf-binary' }
    '.gltf' { 'model/gltf+json; charset=utf-8' }
    '.txt' { 'text/plain; charset=utf-8' }
    default { 'application/octet-stream' }
  }
}

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()

Write-Host ""
Write-Host "Local preview is running at http://localhost:$Port/" -ForegroundColor Green
Write-Host "Serving files from $rootFull" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop." -ForegroundColor Yellow
Write-Host ""

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    $sendBody = $request.HttpMethod -ne 'HEAD'

    try {
      $relativePath = [System.Uri]::UnescapeDataString($request.Url.AbsolutePath.TrimStart('/'))
      if ([string]::IsNullOrWhiteSpace($relativePath)) {
        $relativePath = 'index.html'
      }

      $relativePath = $relativePath.Replace('/', '\')
      $candidatePath = Join-Path $rootFull $relativePath

      if (Test-Path -LiteralPath $candidatePath -PathType Container) {
        $candidatePath = Join-Path $candidatePath 'index.html'
      }

      $fullPath = [System.IO.Path]::GetFullPath($candidatePath)
      if (-not $fullPath.StartsWith($rootFull, [System.StringComparison]::OrdinalIgnoreCase)) {
        $response.StatusCode = 403
        if ($sendBody) {
          $body = [System.Text.Encoding]::UTF8.GetBytes('Forbidden')
          $response.OutputStream.Write($body, 0, $body.Length)
        }
        continue
      }

      if (-not (Test-Path -LiteralPath $fullPath -PathType Leaf)) {
        $response.StatusCode = 404
        if ($sendBody) {
          $body = [System.Text.Encoding]::UTF8.GetBytes('Not Found')
          $response.OutputStream.Write($body, 0, $body.Length)
        }
        continue
      }

      $bytes = [System.IO.File]::ReadAllBytes($fullPath)
      $response.StatusCode = 200
      $response.ContentType = Get-ContentType -Path $fullPath
      $response.ContentLength64 = $bytes.Length
      $response.AddHeader('Cache-Control', 'no-cache')
      if ($sendBody) {
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
      }
    }
    catch {
      $response.StatusCode = 500
      if ($sendBody) {
        $body = [System.Text.Encoding]::UTF8.GetBytes('Server Error')
        $response.OutputStream.Write($body, 0, $body.Length)
      }
    }
    finally {
      $response.OutputStream.Close()
    }
  }
}
finally {
  $listener.Stop()
  $listener.Close()
}
