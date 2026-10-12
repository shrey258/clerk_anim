# Handoff

## Goal
A Clerk-style homepage hero: a rounded "peephole" frame over an oversized canvas of cards. The focused card sits in the middle; a dock pans between 7 animated widgets. Below it, a dark section hides an "open to engineering roles" note behind a cursor torch. It's Day 1 of the author's public series, "recreating animations until I land an engineering role".

## State (verified 2026-10-11)
- **Live:** https://clerkanim.vercel.app. Deployed from this folder; returns 200 with no console errors.
- **Posted on X:** https://x.com/shreyg258/status/2109296806933012584. A 13s video, with the link as a reply under it.
- **Uncommitted:** `git status` shows changes to `src/App.tsx`, `src/index.css`, `src/main.tsx`, `package.json`, `package-lock.json` and `.gitignore`, plus the new `src/HireMe.tsx` and this file. The last commit is `8187f04`. Commit when the author asks.
- `npm run build` and `npm run lint` pass.

## Run / deploy
```sh
npm install && npm run dev                                         # http://localhost:5173
npm run build && npm run lint
vercel deploy --prod --yes --scope shrey258s-projects              # personal scope, NOT the not-a-number-labs team
```
Stack: Vite, React 19, TypeScript, Tailwind v4 (only `@import` and two classes; styling is inline objects plus plain CSS classes in `src/index.css`).

## Code map
- **`src/App.tsx`:** `widgets` (dock name → card index → machine), and `Peephole`, which has 4 layers:
  1. `.peephole-back`: all 74 cards, each at opacity 0.6, animations paused, inert.
  2. `.peephole-fade`: a still white radial-gradient overlay (Clerk's mask, inverted).
  3. `.peephole-front`: the 7 widgets; only the focused one is visible (`.front-card[data-on]`).
  4. `.peephole-front::after`: an inset white box-shadow edge.

  Both card layers share one `.sheet` transform from `centreOn(slot)`. `BackCards` and `Widget` are `memo`'d so a click doesn't re-render ~2,000 nodes.
- **`src/layout.json`:** 74 card slots, from Clerk's source. `left`/`w` are % of 720, `top`/`h` are % of 602.
- **`src/Dock.tsx`:** 7 icon buttons. Names are `aria-label`s only; there's no visible tooltip, on purpose.
- **`src/machines/*`:** the 7 widgets (Radio 0, Train 8, Rain 39, Vinyl 12, Clocks 40, Ticker 43, Wave 26). Each keeps its own keyframes in a `<style>`. `theme.ts` holds the shared colours.
- **`src/scenery/*`:** the quieter cards. `Scenery.tsx` maps card index → content (22 cards that come into view; every other card is blank and never seen).
- **`src/HireMe.tsx`:** the bottom section.
- **`src/main.tsx`:** `<Analytics />` from `@vercel/analytics`.
- **`shadow.html`:** a dev-only shadow generator, not part of the build.

The author asked for **no comments in `src/`** and **simple code**. Keep it that way; reasons belong in this file.

## Decisions (and rejected options; don't redo)
- **Card contents:** "Tiny Machines", a Lisbon → Tokyo trip world. Rejected: One Life (artifacts from one week), Ephemera (tickets and stamps), Clerk-style auth screens (blatant copy), the same widget in every card, WebGL shaders, masonry, random packing.
- **Switcher:** the dock. Rejected:
  - a sidebar (both the cards-shrink and the frame-grows versions);
  - Clerk-style tabs ("a settings page");
  - Tour (autoplay);
  - Canvas (click cards);
  - Minimap.
- **Pan:** Clerk's exact values, `transform 1000ms cubic-bezier(0.4, 0, 0.2, 1)`, read live from clerk.com. The cross-fade is 500ms on the same curve. Rejected: 700ms ease-out (a lurch: 43% of the trip in 100ms) and 400ms ease-in-out quart.
- **Clerk layering, rebuilt cheaply:** per-card opacity instead of group opacity; a still white overlay instead of `mask-image` on moving content; an inset box-shadow instead of `filter: blur`. Same look, no per-frame re-composite.
- **120fps (measured in Arc on a 120Hz display, 35 pans, 0 dropped frames):**
  - back cards are always mounted;
  - Rain is 3 tiled background layers, not 110 drop elements;
  - Train's moving parts are separate HTML layers, not `<g>` animations inside one SVG.
- **HireMe:** "Blacklight", a dim UV torch (translate-only, trailing the cursor with lerp 0.22) revealing a quiet two-line note with a `mailto:` link.
  - Subtle on purpose: it must not read as begging.
  - It says "engineering", not "design engineering", on purpose.
  - Rejected: Heat (warm-spot trail), Breath (fog cloud), and a huge "Hire me".
- **Frame sizes:** Clerk's fixed px per breakpoint (`.peephole` in `index.css`), cards in % of a fixed 720×602 box. Phone layout (<768px) is not done.

## Demo video pipeline (for Day 2+)
- **What drops frames:** live screen capture on this Mac (5K/4K Retina display) drops Arc to ~30fps. What fixed it: quit "ego lite" (it uses heavy CPU) and set the Dell to 1920×1080 (BetterDisplay). Pause Cursorful's editor preview, because it loops and uses the GPU.
- **Take:** `~/Desktop/peephole-demo/drive.mjs` drives the **real cursor** in Arc. It reloads the page, zooms Arc to 90% if the page is under 1280px wide, calibrates screen↔page coordinates, hides the scrollbar, clicks the dock, and records the Arc window with macOS `screencapture`. Helpers in the same folder: `mouse` / `key` (compiled Swift) and `winid.swift`.
- **Then:** crop with ffmpeg (`crop=2504:1548:140:100`, trim, `scale=1920`). Cursorful mis-scales imported files wider than ~1920px.
- **Edit/export:** in Cursorful. Imported files get no auto-zoom or cursor smoothing. Settings used: 16:9, gradient tile 2 (lavender), 1080p.
- **Final file:** `~/Desktop/peephole-demo-fast.mp4` (13.9s, 1–1.3s holds).
- **Cursorful control:** `~/Documents/personal/cursorful-cli/cursorful.mjs` (`launch|status|setup|start|stop|eval`).
  - It launches through `open` with `ELECTRON_RUN_AS_NODE` removed. T3 Code leaks that variable, and a child-process launch borrows T3's permissions.
  - The editor is an out-of-process iframe (`cursorful.com/editor`); drive it through its own CDP target on port 9333.
- **Permissions:** T3 Code has Accessibility and Screen Recording, granted this session.

## X / posting notes
- The X research below comes from a research agent that read `xai-org/x-algorithm` (2026) and `twitter/the-algorithm-ml` (2023). I didn't re-check the repos.
  - Top weights: share via copy link (20), reply (5, +15 from mutual follows), quote (5), follow (4). Video watch time is weighted 0, and a video must be over 10s to count as a video view.
  - Posts from accounts the viewer doesn't follow get ×0.75; a second post from the same author in one feed gets ×0.5.
  - Posts are ranked for 48 hours. The current code has no link penalty and no Premium boost.
- Driving X's composer through ego-browser is flaky:
  - Edits to saved drafts don't persist.
  - The thread "+" button and clicks inside the box sometimes close the modal.
  - What works: post 1 with `page.click` on the scoped textarea plus `setInputFiles`, then reply via `⌘+Enter` (a link-preview overlay blocks the Reply button).
- The author's bio is now "22, prev @vibecodeapp".
- **Unverified:** whether Vercel Analytics is enabled in the dashboard. The tracking script responds 200; check the clerk_anim → Analytics tab.

## Next
1. **Day 2:** pick from the replies to the X post.
2. **Delete the stale "Day 1" draft in X Drafts** (the old caption). It could get posted twice.
3. **Add a page `<title>` and an OG image.** The tab title is still `clerk_anim`, so link cards are bare.
4. **Phone layout:** Clerk's `--lm/--tm/--wm` values.
5. **Commit the uncommitted work** when the author asks.

## Suggested skills
- `own-the-decision` and `work-in-public`: the author's session-start skills.
- `emil-prototype`: exploring a new piece as 3–5 variants behind a picker. It's how every decision here was made.
- `emil-get-creative`: when the author only has a vibe.
- `emil-animations` and `emil-performance`: easing, duration, 120fps work.
- `ego-browser`: anything on X.
- `vercel:deploy`: redeploys.
- `brain-career-amalgam`: positioning and posting advice.
