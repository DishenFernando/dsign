# D-SIGN DESIGNERS — Website Visual & UX Upgrade (v2)

This upgrade was prepared from the supplied `D_SIGN_DESIGNERS_React_Vite_Vercel_Website(1).zip` baseline on **23 November 2026**.

## Included changes

- Integrated the **exact user-supplied D-SIGN DESIGNERS logo pixels** into a transparent PNG asset (only removed transparent canvas padding). It is displayed on a light surface so the dark `D-SIGN` lettering remains legible over the navy website.
- Added a matching PNG favicon derived from the logo and updated the Open Graph social cover.
- Added **nine** locally bundled, optimized WebP concept images; no image CDN is required. The gallery contains **nine fictional visual concepts**, explicitly labeled to avoid suggesting completed client commissions.
- Expanded the three service cards with related design imagery.
- Added a **choose-your-project** interactive guide that preselects the matching enquiry-form project type.
- Rebuilt the portfolio as a filterable visual gallery with responsive thumbnails and a keyboard-accessible detail dialog: Escape to close, left/right arrows to navigate, Tab focus containment, close-button focus and background-click-to-close.
- Improved mobile menu alignment and keyboard handling, added a back-to-top control and kept reduced-motion support.
- Added dependency-free local asset validation (`npm run check:assets`).

## Patch installation — Windows PowerShell

**Back up your current project** or commit outstanding changes first. These instructions expect the same starting source files as the ZIP submitted for the upgrade.

```powershell
cd 'D:\Dsign\D-SIGN-Designers-React-Vite'
$patch = "$env:USERPROFILE\Downloads\D_SIGN_Designers_Website_v2.patch"
git apply --check $patch
if ($LASTEXITCODE -ne 0) { throw 'Patch conflict: check your base project or use the full updated ZIP.' }
git apply $patch
if ($LASTEXITCODE -ne 0) { throw 'Patch application failed.' }

npm.cmd install
npm.cmd run check:assets
npm.cmd run build
npm.cmd run dev
```

Use `npm.cmd` rather than `npm` if your PowerShell configuration prevents `npm.ps1` from running. The dev server prints the local URL, generally `http://localhost:5173`.

If `git apply --check` reports conflicts, **do not force it**. Use the complete updated project ZIP in a separate folder and move over your own customizations deliberately.

## Build and deployment

There are no newly added npm dependencies. React 19, Vite 6 and lucide-react are still used. Existing Vercel deployment settings remain in place. Deploy after successful local `npm run build`; re-check any custom domain and Open Graph preview after deployment.

## Add real portfolio work later

Portfolio metadata is in `src/App.jsx` in the `projects` array, and images are in `public/images/concepts`. These generated images are **creative inspirations only**. Replace them with actual screenshots and factual case descriptions once project owners have approved their publication.

## Known limits and important checks

- The form is **WhatsApp deep-link based**, not an email form and not a submitted-lead database. A visitor still presses Send in WhatsApp.
- No automated cross-browser or Lighthouse audit has been performed here. The package's JSX syntax and asset references were checked. **A full Vite build must be run in your own environment** because npm registry access was unavailable in the generation environment.
- Check real mobile navigation, desktop/laptop spacing, keyboard focus, WhatsApp, images and the quote form before your production deployment.
- The app's original Google Fonts integration is external; system font fallbacks continue to work without it.
- For perfect SEO/social sharing after you register a domain, add the canonical URL and absolute Open Graph image URL to `index.html`.
