# bladee.fyi

Single-file static clone of bladee.com. Just upload `index.html` to GitHub Pages (or any static host) and you're done.

## Deploy to GitHub Pages

1. Create a repo (e.g. `bladee-fyi`) on GitHub.
2. Add `index.html` to the root of the repo and commit.
3. Repo → **Settings → Pages** → Source: `Deploy from a branch`, Branch: `main` / root → Save.
4. Point your `bladee.fyi` custom domain at GitHub Pages:
   - Settings → Pages → Custom domain → `bladee.fyi`
   - On your DNS (Cloudflare/Namecheap/etc.), set a `CNAME` from `bladee.fyi` (or `www`) to `<your-username>.github.io`. For the apex `bladee.fyi`, you can use these A records instead:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
5. Wait a few minutes for GitHub to provision HTTPS. Done.

## Configuration

Open `index.html` and edit:

- **`SONGS` array** – each entry has `file` (background video URL), `youtube` (audio video id), `lyric`, `title`. Currently video visuals are hot-linked from `bladee.com` and audio is streamed from YouTube embeds.
- **`FORCE`** – set to a song `id` (e.g. `"trashstar"`) to always show that song while styling. Leave as `null` for random.
- **Contact link** – `mailto:` href on the `#contact-link` anchor.
- **Discord link** – href on the `discord` anchor.

## Notes

- The page has no build step, no dependencies, no backend. One HTML file.
- Audio requires the user click "click anywhere to enter" – browsers block autoplay with sound until a user gesture.
- If you ever want to host the videos yourself, drop the `.mp4` files next to `index.html` and change each `file:` to just the filename (e.g. `"trashstar.mp4"`).
