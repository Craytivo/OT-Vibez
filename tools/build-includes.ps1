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
    'rehearsal-membership-pricing-edmonton'
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
