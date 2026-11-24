# A Little Birthday Magic 🎂

A mobile-first, friendship-focused birthday microsite built with React, Vite, Tailwind CSS v4, Motion and Canvas Confetti. It includes the four supplied photos, a CSS 3D gift box, an interactive scrapbook gallery, a revealable letter, an animated cake, scratch cards, a timed star-catching mini-game and a fireworks/confetti finale.

## Requirements

- Node.js 20.19+ (or a newer supported LTS release)
- npm

## Run locally

```bash
npm install
npm run dev
```

Vite prints a local address (normally `http://localhost:5173`). Open it in a browser. Use the music toggle in the top-right corner to start or pause the original ambient soundtrack. Browsers require a visitor gesture before audio can play, so music does not autoplay.

## Production build

```bash
npm run build
npm run preview
```

The static production site is generated in `dist/`. It can be deployed to Vercel, Netlify, Cloudflare Pages or any static host. For Vercel, use the default Vite settings: build command `npm run build`, output directory `dist`.

## Password lock

The opening screen is protected by a friendly date-based password gate. The hint shown to the visitor is **“Password is the date when we first met.”** The expected password is `05042024`. The screen explicitly explains the format as **DDMMYYYY (8 digits)** and shows `05/04/2024 → 05042024`, including a reminder to keep the leading zero.

This is a front-end surprise gate, not secure authentication: the password is present in the client-side JavaScript bundle and the static photo/audio assets can still be accessed directly by someone with technical knowledge. Do not use it to protect confidential files.

## Personalize before sharing

Open `src/birthdayContent.js`. Change:

- `name` and `nickname`
- `introLine`
- `letter` paragraphs
- `memories` captions
- `scratchMessages`
- `finalMessage` and `signOff`

The four supplied photographs are in `public/images/` as optimized WebP files:

- `memory-01.webp` — solo portrait in a white-and-gold saree
- `memory-02.webp` — the two-friend photo in festive outfits
- `memory-03.webp` — the two-friend photo by the bus
- `memory-04.webp` — dance portrait

Replace a photo by overwriting the corresponding WebP file (keep the same filename) or update the matching `image` path in `src/birthdayContent.js`.

## Included visual / interaction details

- Cinematic dark intro with floating particles and warm gold details
- CSS 3D gift box with a lid-opening animation and confetti reveal
- Paper-texture scrapbook with four clickable Polaroid frames and a photo lightbox
- Friendship-focused letter in a clickable envelope
- CSS illustrated birthday cake with flickering candle flames and blow-out interaction
- Canvas scratch cards with a reveal button fallback
- 20-second star-catching game with score and restart
- Canvas Confetti finale with a replay action
- Original generated ambient loop in `public/audio/birthday-ambient.wav`
- Reduced-motion CSS support and mobile/desktop layouts

## Music

The included music is an original synthesized ambient loop generated for this project. It is bundled locally; no external audio service is required. Playback starts only after the visitor clicks the music control.

## Notes

- This is a static frontend project. It does not collect, upload or store visitor data.
- Photo captions and letter copy are starter text. Personalize them before sharing so the experience feels genuinely yours.
- Keep the photos private to the intended recipient. Anyone with the public website link can view assets included in the site.
