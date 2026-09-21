param(
  [string]$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
)
$ErrorActionPreference = 'Stop'
$pages = Get-ChildItem -Path $Root -Filter '*.html' -File
$errors = New-Object System.Collections.Generic.List[string]

foreach ($page in $pages) {
  $html = Get-Content -Raw $page.FullName

  if ($html -match '<img[^>]+src=["'']\s*["'']') { $errors.Add("$($page.Name): empty image src") }
  if ($html -match 'data-src=') { $errors.Add("$($page.Name): legacy data-src remains") }
  if ($html -match 'class=["''][^"'']*lazy-load') { $errors.Add("$($page.Name): legacy lazy-load hook remains") }
  $images = [regex]::Matches($html, '<img\\b[^>]*>', 'IgnoreCase')
  foreach ($image in $images) {
    if ($image.Value -notmatch '\\bwidth=["'']\\d+["'']' -or $image.Value -notmatch '\\bheight=["'']\\d+["'']') {
      $errors.Add("$($page.Name): image is missing width/height: $($image.Value.Substring(0, [Math]::Min(140, $image.Value.Length)))")
    }
  }
  if ($html -match 'aos-2\.3\.4') { $errors.Add("$($page.Name): AOS asset reference remains") }

  $h1 = ([regex]::Matches($html, '<h1\b', 'IgnoreCase')).Count
  if ($h1 -ne 1) { $errors.Add("$($page.Name): expected exactly one H1, found $h1") }
  if ($html -notmatch '<title>\s*[^<]+</title>') { $errors.Add("$($page.Name): missing title") }
  if ($html -notmatch '<meta\s+name=["'']description["'']') { $errors.Add("$($page.Name): missing meta description") }
  if ($html -notmatch '<link\s+rel=["'']canonical["'']') { $errors.Add("$($page.Name): missing canonical") }
}

if ($errors.Count -gt 0) {
  $errors | ForEach-Object { Write-Error $_ }
  exit 1
}

Write-Host "QA passed: $($pages.Count) HTML pages checked."
