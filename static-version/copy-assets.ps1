# PowerShell script to copy required assets for the static version of FGN Arquitetura website.
# Run this from the root of the project to create a fully standalone static site package in /static-version/

$StaticDir = $PSScriptRoot
$ProjectRoot = Split-Path -Parent $StaticDir

# Create directories if they do not exist
$ContentDest = Join-Path $StaticDir "content"
$ImagesDest = Join-Path $StaticDir "images"
$FontsDest = Join-Path $StaticDir "fonts"

if (!(Test-Path $ContentDest)) { New-Item -ItemType Directory -Path $ContentDest -Force | Out-Null }
if (!(Test-Path $ImagesDest)) { New-Item -ItemType Directory -Path $ImagesDest -Force | Out-Null }
if (!(Test-Path $FontsDest)) { New-Item -ItemType Directory -Path $FontsDest -Force | Out-Null }

Write-Host "Copying JSON content files..." -ForegroundColor Green
Copy-Item (Join-Path $ProjectRoot "content\*.json") -Destination $ContentDest -Force

Write-Host "Copying public assets (fonts & icons)..." -ForegroundColor Green
Copy-Item (Join-Path $ProjectRoot "public\*.woff") -Destination $StaticDir -Force
Copy-Item (Join-Path $ProjectRoot "public\*.woff2") -Destination $StaticDir -Force
Copy-Item (Join-Path $ProjectRoot "public\*.ttf") -Destination $StaticDir -Force
Copy-Item (Join-Path $ProjectRoot "public\favicon.svg") -Destination $StaticDir -Force

Write-Host "Copying images..." -ForegroundColor Green
Copy-Item (Join-Path $ProjectRoot "public\images\*") -Destination $ImagesDest -Recurse -Force

Write-Host "Success! The 'static-version' directory is now fully self-contained and ready to deploy on any static hosting!" -ForegroundColor Cyan
