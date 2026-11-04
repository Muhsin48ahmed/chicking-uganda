# Chicking Uganda website

Multi-page site for Chicking Uganda (Jumbo Plaza, Kampala), built with Vite, React 19, TypeScript, Tailwind CSS v4 and react-three-fiber.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit + page tests (Vitest)
npm run typecheck
npm run build      # production build in dist/
```

## Pages

| Route        | What it shows |
|--------------|---------------|
| `/`          | 3D bucket hero with an Original/Spicy/Grilled switch, live open/closed status, fan favourites, bucket-size picker, reasons to choose Chicking, map |
| `/menu`      | Full menu with prices, sticky category tabs, flavour filter, search |
| `/deals`     | Weekly offer, deals, buckets, the in-store menu boards (tap to zoom) |
| `/locations` | Store details, hours, map, directions, delivery |
| `/about`     | Brand story, global stats, world flavours, halal promise |
| `/franchise` | Franchise models and formats; applications go to chickingglobal.com |
| `/contact`   | Contact form (sends via WhatsApp), FAQ, socials |

## Updating content

Everything editable is in plain data files, so nobody needs to touch the components:

- **Prices and menu items:** `src/data/menu.ts`
- **Deals and the weekly offer:** `src/data/deals.ts`
- **Phone, hours, address, map, delivery and social links:** `src/config/site.ts`
- **Brand stats, fun facts, franchise copy:** `src/data/brand.ts`
- **Promo videos:** `src/data/videos.ts`. Paste the number from the end of a TikTok link.

### Hero background video

The home page opens on a silent, looping video (`public/videos/`). It is cut from Chicking's brand ad,
the same footage the old chicking.ug hero streamed from chickingoman.com. The 60-second, 30 MB original
was trimmed to about 26 seconds, lightly denoised, upscaled with a sharp (Lanczos) filter and sharpened:
9.4 MB for desktop (`hero-desktop.mp4`, 1920×1080) and 4.0 MB for phones (`hero-mobile.mp4`, a
608×1080 portrait version, reframed shot by shot with `scripts/reframe-mobile-video.py` so people, food and the bucket stay in view on phones). That keeps it as clear as the original on large and retina screens at a third of the size. A still poster shows first and
stays if the video can't play. The video doesn't autoplay with reduced motion or Data Saver on, pauses
when scrolled out of view, and has a pause button. To use different footage, replace those four files
and keep the names. To re-create them from new footage:

```bash
ffmpeg -i source.mp4 -vf "hqdn3d=1.2:1.2:4:4,scale=1920:1080:flags=lanczos,unsharp=5:5:0.55:5:5:0,format=yuv420p" -an -c:v libx264 -preset slower -crf 25.5 -maxrate 3.2M -bufsize 6.4M -movflags +faststart public/videos/hero-desktop.mp4
```

**Confirm with Chicking** that the Uganda site may keep using this brand footage, or ask for newer ad footage.

### Promo videos

The Home, Deals and Our story pages have a swipeable reel of Chicking Uganda's TikTok ads.
Nothing loads from TikTok until a visitor presses play; each card shows one of our product photos until then.
TikTok's player can fail inside some in-app browsers and strict-privacy browsers, so every card also has a
"Watch on TikTok" link. **More reliable:** ask Chicking for the original ad files (MP4). Put them in
`public/videos/` and set `file` on the video in `videos.ts`; the site then plays them itself, with no TikTok involved.

Product photos in `public/images/menu/` were cut from the current menu boards by
`scripts/crop-menu-images.py`. To swap in proper product shots, replace a `.webp` file
and keep its name.

## Confirm before launch

These came from public sources and need checking with the store:

1. **Prices newer than the menu boards:** TikTok posts show Crunchy Box at UGX 25,000 (the board says 24,000). Menu prices still follow the boards, so check them all against today's prices.
2. **Pizza:** the Buy 1 Get 1 deal (Wednesday and Saturday, Medium 31K / Large 41K) is on the Deals page, but pizzas are not on the menu boards. Add them to the menu?
3. **Second branch:** a TikTok post mentions an outlet at Agenda 2000 Stage, Kireka–Kyaliwajala Road. Add it to `LOCATIONS` if it is part of Chicking Uganda.
4. **Global stats:** chickingglobal.com says 36+ countries and 475+ outlets, but the old chicking.ug says 35+ and 300+. The site uses the global figures.
5. **Instagram and an email address:** neither was found. Add them to `site.ts` if they exist.
6. **Kids Meal C and D photos** reuse the Royal Crunchy and Royal Match images.

## Hosting

**Preview mode:** `index.html` has a `noindex` robots tag so the preview link stays out of Google
while chicking.ug is still the official site. Delete that line when this site goes live.

The site builds to static files and works on Vercel (`vercel.json`) or Netlify (`public/_redirects`); both route every path to `index.html`.
The three.js bundle (~280 KB gzipped) loads only on the home page, and only when WebGL is available.
Visitors with reduced motion turned on, or without WebGL, see a still photo instead.
