<#
.SYNOPSIS
    Robust HTTP Web Server for The Daily Loaf Bakery
    Runs on standard Windows PowerShell using .NET System.Net.HttpListener
#>

param(
    [int]$Port = 3000,
    [switch]$NoBrowser
)

$baseDir = $PSScriptRoot
if (-not $baseDir) { $baseDir = Get-Location }

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    $Port = 8080
    $prefix = "http://localhost:$Port/"
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($prefix)
    $listener.Start()
}

Write-Host "==========================================================" -ForegroundColor DarkYellow
Write-Host "  THE DAILY LOAF BAKERY - LOCAL DEVELOPMENT SERVER" -ForegroundColor Yellow
Write-Host "  URL: $prefix" -ForegroundColor Cyan
Write-Host "  Root: $baseDir" -ForegroundColor Gray
Write-Host "  Press Ctrl+C to stop the server." -ForegroundColor DarkGray
Write-Host "==========================================================" -ForegroundColor DarkYellow

if (-not $NoBrowser) {
    Start-Process $prefix
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".png"  = "image/png"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".webp" = "image/webp"
    ".woff2"= "font/woff2"
    ".woff" = "font/woff"
    ".ttf"  = "font/ttf"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        try {
            $rawPath = $request.Url.LocalPath.TrimStart('/')
            if ([string]::IsNullOrWhiteSpace($rawPath) -or $rawPath -eq "/") {
                $rawPath = "index.html"
            }

            $safePath = [System.IO.Path]::GetFullPath((Join-Path $baseDir $rawPath))
            if (-not $safePath.StartsWith($baseDir, [System.StringComparison]::OrdinalIgnoreCase)) {
                $response.StatusCode = 403
                $response.Close()
                continue
            }

            if (Test-Path $safePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($safePath).ToLower()
                $mime = "application/octet-stream"
                if ($mimeTypes.ContainsKey($ext)) {
                    $mime = $mimeTypes[$ext]
                }

                $bytes = [System.IO.File]::ReadAllBytes($safePath)
                $response.ContentType = $mime
                $response.ContentLength64 = $bytes.Length
                $response.AddHeader("Access-Control-Allow-Origin", "*")
                $response.AddHeader("Cache-Control", "no-cache")
                $response.StatusCode = 200

                if ($request.HttpMethod -ne "HEAD") {
                    $response.OutputStream.Write($bytes, 0, $bytes.Length)
                }
            } else {
                $notFound = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found</h1><p>The Daily Loaf Bakery: File not found.</p>")
                $response.ContentType = "text/html"
                $response.ContentLength64 = $notFound.Length
                $response.StatusCode = 404
                if ($request.HttpMethod -ne "HEAD") {
                    $response.OutputStream.Write($notFound, 0, $notFound.Length)
                }
            }
        } catch {
            # Ignore individual client errors
        } finally {
            $response.Close()
        }
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
