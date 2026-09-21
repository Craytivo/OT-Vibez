param(
  [string]$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path,
  [string[]]$Pages = @(
    'index',
    'services',
    'privacy',
    'terms',
    'hourly-rehearsal-studio-edmonton',
    'podcast-room-rental-edmonton',
    'band-rehearsal-space-edmonton',
    'music-video-studio-edmonton',
    'rehearsal-membership-pricing-edmonton',
    'edmonton-rehearsal-checklist',
    'do-i-need-gear-to-rehearse',
    'hourly-rehearsal-vs-minimum-block-rentals'
  )
)

$ErrorActionPreference = 'Stop'

function Resolve-Includes {
  param(
    [string]$Content,
    [string]$RootDir,
    [int]$Depth = 0
  )

  if ($Depth -gt 10) {
    throw 'Include nesting too deep.'
  }

  $pattern = '<!--\s*@include\s+([^\s]+)\s*-->'
  return [regex]::Replace($Content, $pattern, {
      param($m)
      $relativePath = $m.Groups[1].Value
      $includePath = Join-Path $RootDir $relativePath
      if (-not (Test-Path $includePath)) {
        throw "Missing include file: $relativePath"
      }
      $includedContent = Get-Content -Raw -Path $includePath
      return Resolve-Includes -Content $includedContent -RootDir $RootDir -Depth ($Depth + 1)
    })
}

foreach ($page in $Pages) {
  $srcPath = Join-Path $Root "src/$page.src.html"
  $outPath = Join-Path $Root "$page.html"

  if (-not (Test-Path $srcPath)) {
    throw "Missing source file: $srcPath"
  }

  $srcContent = Get-Content -Raw -Path $srcPath
  $built = Resolve-Includes -Content $srcContent -RootDir $Root
  $banner = "<!-- GENERATED FILE: Do not edit $page.html directly. Edit src/$page.src.html and run tools/build-includes.ps1 -->`r`n"
  Set-Content -Path $outPath -Value ($banner + $built) -NoNewline
  Write-Host "Built $outPath"
}

# Keep the XML sitemap synchronized with the source page registry.
$sitemapPath = Join-Path $Root 'sitemap.xml'
$urls = foreach ($page in $Pages) {
  $srcPath = Join-Path $Root "src/$page.src.html"
  $lastmod = (Get-Item $srcPath).LastWriteTimeUtc.ToString('yyyy-MM-dd')
  $loc = if ($page -eq 'index') { 'https://otvibez.com/' } else { "https://otvibez.com/$page.html" }
  "  <url>`r`n    <loc>$loc</loc>`r`n    <lastmod>$lastmod</lastmod>`r`n    <changefreq>weekly</changefreq>`r`n  </url>"
}
$sitemap = @('<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">') + $urls + '</urlset>'
Set-Content -Path $sitemapPath -Value ($sitemap -join "`r`n") -NoNewline
Write-Host "Built $sitemapPath"

$qaPath = Join-Path $Root 'tools/qa.ps1'
if (Test-Path $qaPath) { & $qaPath -Root $Root }