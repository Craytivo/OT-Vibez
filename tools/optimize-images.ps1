param(
  [string]$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path,
  [int]$MaxWidth = 1600,
  [int[]]$Widths = @(480, 800, 1200, 1600),
  [int]$Quality = 82
)

$ErrorActionPreference = 'Stop'

$magick = Get-Command magick -ErrorAction SilentlyContinue
if (-not $magick) {
  throw 'ImageMagick was not found. Install ImageMagick and make sure "magick" is on PATH.'
}

$sourceDirs = @(
  (Join-Path $Root 'assets/images/studio-gallery'),
  (Join-Path $Root 'assets/images/Equipment'),
  (Join-Path $Root 'assets/images/partners')
)

$extensions = @('.jpg', '.jpeg', '.png')
$files = foreach ($dir in $sourceDirs) {
  if (Test-Path $dir) {
    Get-ChildItem $dir -File | Where-Object { $extensions -contains $_.Extension.ToLowerInvariant() }
  }
}

foreach ($file in $files) {
  $base = [IO.Path]::Combine($file.DirectoryName, $file.BaseName)
  foreach ($width in $Widths) {
    $suffix = "-$width"
    & magick $file.FullName -auto-orient -resize "$($width)x$($MaxWidth)>" -strip -quality $Quality "$base$suffix.webp"
    if ($LASTEXITCODE -ne 0) { throw "Failed to create $($file.Name) at ${width}px." }

    if ($width -le 1200) {
      & magick $file.FullName -auto-orient -resize "$($width)x$($MaxWidth)>" -strip -quality $Quality "$base$suffix.avif"
      if ($LASTEXITCODE -ne 0) { throw "Failed to create $($file.Name) AVIF at ${width}px." }
    }
  }
  Write-Host "Optimized $($file.FullName)"
}

Write-Host ''
Write-Host 'Image optimization complete.'
Write-Host 'Next: update HTML <picture>/<img srcset> markup to reference the generated variants, then run tools/qa.ps1.'
