# v3.3 — Mobile Journey Slider

## What changed

The original scrolling text ticker used Unicode star characters and infinitely scrolled partial words on small screens. It has been replaced by:

- A four-stage desktop timeline with matching Lucide icons.
- An auto-advancing mobile carousel with **full, readable stages**: DESIGN, DEVELOP, DEPLOY, GROW.
- A short description for each step, step indicators, previous/next arrows, and horizontal swipe support.
- A seamless auto-loop between the last and first slide.
- Auto-advance only while the strip is on screen, and never while the tab is hidden.
- No auto-advance when a visitor prefers reduced motion.
- Manual interaction switches to manual control so the carousel does not move while a visitor is reading.
- Accessible button labels and a polite status message for user-selected slides.

## Files changed

- `src/App.jsx` — `Ticker` replaced with `JourneyStrip`.
- `src/styles.css` — redesigned timeline and slider styles, with responsive and reduced-motion rules.

No third-party packages or external images required. All existing music, logo, portfolio, and Vercel Analytics features are retained.

## Validate on Windows PowerShell

```powershell
npm.cmd install
npm.cmd run check:assets
npm.cmd run build
npm.cmd run dev
```

## Mobile browser QA

1. Open on a ~320–430 CSS-pixel mobile viewport.
2. Check the entire heading and detail remain visible within the slide.
3. Observe automatic slide changes once the strip is in view.
4. Swipe left/right; verify the manual arrows and indicators still work.
5. Confirm slides stop changing automatically after manual navigation.
6. Confirm reduced-motion setting disables automatic sliding.
7. Confirm the website's audio toggle, navbar, services, portfolio and analytics still work.

If a previous patch does not match local modifications, do not force it. Use the complete ZIP after backing up your project.
