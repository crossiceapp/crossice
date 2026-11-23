# CrossIce

A hockey whiteboard and practice-plan builder. One page, no account, works offline.

Live: https://USERNAME.github.io/crossice/   <-- replace USERNAME after you publish

## Updating the app

1. Replace `index.html` with the new version.
2. Open `sw.js` and change the version line — `crossice-v1` becomes `crossice-v2`, and so on.
   **This step is not optional.** Without it, phones that already installed the app
   keep serving the old copy from their cache.
3. Commit. Coaches pick the update up the next time they open it.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app. Everything is in this one file. |
| `manifest.webmanifest` | Name, icons and colors used when it installs to a home screen. |
| `sw.js` | Service worker — the offline cache. Bump its version on every update. |
| `icon-*.png`, `apple-touch-icon.png`, `favicon-64.png` | App icons. |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is. |

## Drills

Drills live in the browser's storage on each device, so they do not travel between
phones, computers or app versions on their own. Library → **Export file** writes a
JSON backup; **Import file** loads it on another device. Importing adds drills and
never overwrites the ones already there.
