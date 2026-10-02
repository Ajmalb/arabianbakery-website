# Arabian Bakery (അറേബ്യൻ ബേക്കറി) — arabianbakery.com

Website for Arabian Bakery, Main Road, Kulathupuzha, Kollam, Kerala · +91 99461 31881.

Plain HTML/CSS/JS — no build step. Hosted free on **GitHub Pages** with the custom domain **arabianbakery.com**.

## Files

| Path | What it is |
|---|---|
| `index.html` | The whole website |
| `assets/css/style.css` | Design and layout |
| `assets/js/data.js` | **Menu items, gallery photos, reviews, opening hours — edit this to update content** |
| `assets/js/app.js` | Menu filter, order basket → WhatsApp, cake booking → WhatsApp, open/closed badge, gallery |
| `assets/images/` | Optimized photos and logo |
| `CNAME` | Tells GitHub Pages to serve the site at `arabianbakery.com` |
| `404.html`, `robots.txt`, `sitemap.xml` | Not-found page and search-engine files |
| `_old-site/` | Backup of the previous website (ignored by git, not published) |

## Preview locally

```bash
python -m http.server 8000
```
Then open http://localhost:8000

## Publish on GitHub Pages (one-time setup)

1. Create a free account at https://github.com and a new **public** repository, e.g. `arabianbakery-website` (don't add a README).
2. Push this folder:
   ```bash
   git remote add origin https://github.com/<your-username>/arabianbakery-website.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages** → *Source*: **Deploy from a branch** → Branch: **main**, folder **/ (root)** → Save.
4. Same page → *Custom domain*: `arabianbakery.com` → Save. (The `CNAME` file already contains it.)
5. At your domain registrar's DNS settings, add:

   | Type | Host / Name | Value |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153` |
   | AAAA | `@` | `2606:50c0:8001::153` |
   | AAAA | `@` | `2606:50c0:8002::153` |
   | AAAA | `@` | `2606:50c0:8003::153` |
   | CNAME | `www` | `<your-username>.github.io` |

   Remove any other existing A/AAAA records for `@` (e.g. registrar "parking" pages).
6. Wait for DNS to update (minutes to a few hours), then tick **Enforce HTTPS** under Settings → Pages.

## Updating the site later

Edit the files, then:
```bash
git add -A
git commit -m "Update menu"
git push
```
GitHub Pages republishes automatically within a minute or two. If you change CSS/JS, bump the `?v=` number on the
`<link>`/`<script>` tags in `index.html` so visitors' browsers fetch the new version.
