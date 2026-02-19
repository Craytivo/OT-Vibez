# Template Sources

Edit `*.src.html` files in this folder, then rebuild generated pages.

Current mapping:
- `src/index.src.html` -> `index.html`
- `src/services.src.html` -> `services.html`
- `src/privacy.src.html` -> `privacy.html`
- `src/terms.src.html` -> `terms.html`
- `src/hourly-rehearsal-studio-edmonton.src.html` -> `hourly-rehearsal-studio-edmonton.html`
- `src/podcast-room-rental-edmonton.src.html` -> `podcast-room-rental-edmonton.html`
- `src/band-rehearsal-space-edmonton.src.html` -> `band-rehearsal-space-edmonton.html`
- `src/music-video-studio-edmonton.src.html` -> `music-video-studio-edmonton.html`
- `src/rehearsal-membership-pricing-edmonton.src.html` -> `rehearsal-membership-pricing-edmonton.html`

Build command:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools/build-includes.ps1
```
