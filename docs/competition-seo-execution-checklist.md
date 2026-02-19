# Beat-Competition SEO Execution Checklist

## 1) Domain Consolidation (Highest Priority)

Goal: keep all ranking signals on one canonical domain.

- Choose one canonical domain and stick to it everywhere:
  - `https://otvibezstudio.com` (current in canonicals/sitemap), or
  - `https://otvibez.com` (if rebranding to shorter domain).
- Implement permanent `301` redirects:
  - all `http -> https`
  - all `www -> non-www` (or reverse, but pick one)
  - all secondary domain traffic -> canonical domain
- Keep canonical tags aligned with redirects on every page.
- Keep only one sitemap domain:
  - `robots.txt` sitemap URL
  - `sitemap.xml` `<loc>` URLs
- Verify both domains in Google Search Console and set preferred property tracking there.
- Submit updated sitemap after redirect/canonical changes.
- Monitor for split indexing:
  - GSC Coverage: indexed URLs on wrong host
  - GSC Performance: impressions split by domain

Quick test commands:

```powershell
curl -I https://otvibez.com/
curl -I https://www.otvibezstudio.com/
curl -I http://otvibezstudio.com/
```

Expected: each non-canonical host returns `301` to the same canonical host.

## 2) Local Pack Optimization

Goal: improve map-pack visibility and click-through.

- Keep NAP exact everywhere:
  - Name: OT Vibez Studio
  - Address: `8762 50 Ave NW #202, Edmonton, AB T6B 1E8`
  - Phone: `(780) 522-1807`
- Ensure Google Business Profile categories prioritize:
  - Rehearsal studio
  - Recording studio
  - Podcast/video studio (secondary)
- Maintain review velocity:
  - request 2-4 new reviews/month
  - ask customers to mention service keywords naturally (rehearsal, podcast, membership, Edmonton)
- Add local trust links on-site:
  - `Google Reviews`
  - `Get Directions`
- Keep `MusicVenue` schema with `AggregateRating` aligned to visible claims.
- Add fresh location photos/posts in GBP weekly.

## 3) Conversion + SEO Page Expansion

Implemented in this pass:

- Added `rehearsal-membership-pricing-edmonton` landing page for the membership/pricing intent gap.
- Added internal links to this page in:
  - header service dropdown (desktop + mobile)
  - footer quick links
  - homepage/service page grouped local-page blocks
  - related-service blocks on other SEO pages
- Added sitemap/build integration for crawl discovery.

## 4) Next Tracking Checks

- In GA4, segment landing-page sessions for:
  - `/rehearsal-membership-pricing-edmonton.html`
  - compare CTA click-through to other SEO pages.
- In GSC, monitor query growth for:
  - `rehearsal membership edmonton`
  - `rehearsal space pricing edmonton`
  - `monthly rehearsal space edmonton`
