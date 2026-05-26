# Schmidt Revolution - Demo by KODA.PLUS

Hyper-personalisierter E-Commerce-Demo fuer **Schmidt Revolution / felge.de** - Premium Alufelgen Made in Bad Segeberg.

> Live: https://schmidt-revolution-demo.vercel.app

## Stack

- **Astro 6.3.7** (static SSG)
- **React 18** islands (motion, configurator, dealer map, catalog filters)
- **Tailwind CSS 3** + custom Schmidt brand tokens
- **Motion** (Framer Motion v11) - alle Animationen
- **MapLibre GL** - dealer-map mit CARTO dark tiles
- Auftragsbezogene Mock-Daten in `src/data/`

Pre-konfiguriert fuer Migration auf **Medusa.js** Backend (`/data/*.ts` => API).

## Struktur

```
src/
  components/        # Astro + React island components
    Hero.tsx           # Cinematic 100vh-nav hero
    Configurator.tsx   # 6-step wheel configurator
    DealerMap.tsx      # MapLibre map with filters
    CatalogGrid.tsx    # Filterable wheel catalog
    ProductDetail.tsx  # PDP with finish/size selectors
    SubBrands.tsx      # Revolution/Performance/Classics/Rugged
  data/              # Mock data (wheels, dealers, gallery, shop, vehicles)
  pages/
    index.astro        # Landing
    felgen/            # Wheel catalog + PDP
    galerie/           # Customer car gallery
    konfigurator.astro # Configurator
    haendler.astro     # Dealer map fullscreen
    shop.astro         # Original accessories shop
    manufaktur.astro   # Brand story
  layouts/
    Layout.astro       # Base layout with SEO meta, Nav, Footer, KODA badge
public/scraped/      # Brand assets scraped from felge.de + shop.felge.de
```

## Development

```bash
npm install
npm run dev      # http://127.0.0.1:4321
npm run build    # static build to dist/
npm run preview  # preview built site
```

## Deployment

Vercel-ready. `.npmrc` enthaelt `legacy-peer-deps=true` fuer @astrojs/tailwind kompatibilitaet.

```bash
vercel --prod
```

## Pages

| Route | Description |
|---|---|
| `/` | Hero, sub-brands, kategorie, highlights, manufaktur, dealer-map preview |
| `/felgen` | Felgen-Katalog mit Live-Filtern (Bauart, Linie, Groesse) |
| `/felgen/[slug]` | Produkt-Detail mit Size/Width/Finish Picker |
| `/konfigurator` | 6-Step Live-Konfigurator (Auto → Bauart → Felge → Groesse → Finish → Check) |
| `/galerie` | Echte Kundenfahrzeuge mit Detail-Pages |
| `/galerie/[slug]` | Umbau-Detail mit Dealer-Profil |
| `/haendler` | Fullscreen Dealer-Karte mit Service-Filtern |
| `/shop` | Nabenkappen, Logos, Streetwear, Zubehoer |
| `/manufaktur` | Brand-Story Bad Segeberg |

## Brand Tokens

- Primary Yellow: `#FFD400` (Schmidt Revolution)
- Ink: `#0A0A0B`
- Carbon: `#161618`
- Silver: `#A9ADB4`
- Sub-Brand Accents: Performance `#FF2A2A`, Rugged `#7A8B5C`

---

Built by [KODA.PLUS](https://koda.plus)
