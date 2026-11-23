# Latest upgrade: v3.2 — Vercel Web Analytics (23 November 2026)

Added Vercel Web Analytics for visitor and page-view insights. See **VERCEL_ANALYTICS_SETUP.md** for installation, enabling analytics in the Vercel dashboard, and verification. The previous logo, gallery, and ambient music behavior remain unchanged.

## Previous upgrade: v3 (23 November 2026)

For the transparent logo, ambient music control, and interactive design updates, read **V3_UPGRADE_GUIDE.md**. The page remains a static React/Vite project, with original self-hosted audio and no new npm dependencies.

# D-SIGN DESIGNERS — React + Vite Agency Website

A custom-built, premium responsive marketing website for **D-SIGN DESIGNERS**.

**Business:** D-SIGN DESIGNERS  
**Telephone:** `070 118 8941` / `+94 70 118 8941`  
**WhatsApp:** https://wa.me/94701188941  
**Tagline:** We design for you, for your requirements.

## What's included

- React 19 + Vite 6 with clean, editable source code
- Vercel Web Analytics for privacy-conscious visitor and page-view statistics on the deployed site
- Your supplied D-SIGN DESIGNERS logo, original matching favicon, branded social preview and nine optimized WebP concept images
- Premium navy/blue responsive visual system
- Sticky navigation, mobile menu, anchor navigation, active-section highlighting
- Custom hero with a layered browser illustration, subtle floating UI and mobile mockup
- Marketing websites, e-commerce and custom application service panels with original concept imagery
- SEO/security/performance/hosting feature grid
- Nine filterable image-gallery concept previews, with an accessible full-size lightbox (clearly labeled **concepts**, not client work)
- Interactive project planner with enquiry prefill; process, about, technology stack, FAQ accordion and contact sections
- Project enquiry form that generates a detailed WhatsApp message
- Search metadata, social preview image, business structured data, robots.txt
- Vercel deployment config and defensive response headers
- Reduced-motion handling, semantic markup, improved mobile navigation, keyboard navigation and back-to-top button

## Local setup

Requirements: Node.js 20.19+ or 22.x and npm.

```bash
npm install
npm run dev
```

Run `npm run check:assets` to verify bundled media and `npm run check` to verify media and production build.

Open the URL printed by Vite (typically `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

The production files are created in `dist/`.

## Deploy on Vercel

1. Create a GitHub repository, such as `dsign-designers-website`.
2. Upload all project files **except** `node_modules`, `dist`, and local secrets.
3. Visit https://vercel.com/new and import the GitHub repository.
4. Vercel should identify **Vite** from `vite.config.js` and `package.json`.
5. Use **Build Command:** `npm run build` and **Output Directory:** `dist`.
6. Click **Deploy**. For each later push to your main branch, Vercel can redeploy automatically.
7. When ready, add your purchased domain in **Project Settings → Domains** and configure DNS as instructed by Vercel.

No server, database, environment variables or API keys are necessary for this informational site.

## Change your content

| What | File |
|---|---|
| Business name / main navigation | `src/App.jsx` (`Logo`, `menuItems`) |
| WhatsApp number | `src/App.jsx` (`WHATSAPP_NUMBER`) |
| Telephone display | `src/App.jsx` (`BUSINESS_PHONE`) |
| Services and descriptions | `src/App.jsx` (`services` array) |
| Portfolio concepts and lightbox | `src/App.jsx` (`projects` array and `Portfolio` component) |
| Portfolio imagery | `public/images/concepts/*.webp` |
| Interactive planner | `src/App.jsx` (`ideaChoices` and `IdeaStudio`) |
| Delivery process | `src/App.jsx` (`steps` array) |
| FAQs | `src/App.jsx` (`faqs` array) |
| Brand colors and styling | `src/styles.css` (`:root`) |
| Supplied original logo | `public/dsign-logo-original.png` |
| Active favicon | `public/favicon.png` |
| Search and social previews | `index.html` and `public/og-cover.png` |
| Vercel deployment config | `vercel.json` |
| Web Analytics | `src/main.jsx`, `package.json`, `VERCEL_ANALYTICS_SETUP.md` |

## How the quote form works

The form collects project details **in the visitor's browser**, builds a properly encoded WhatsApp deep link, and opens WhatsApp to start a message to **+94 70 118 8941**. It does not save form submissions, maintain an inbox, or send the message automatically: the visitor must confirm sending inside WhatsApp.

The client can provide their name, business, optional phone, project type, tentative budget, timeframe and a project description. The WhatsApp message includes all fields. This avoids hosting a backend for the first launch; if you later want a CRM, use a real API with rate limits, spam controls, privacy disclosures and server-side validation.

## Before going live

- Enable Vercel Web Analytics in the project dashboard, deploy again, and verify production traffic using `VERCEL_ANALYTICS_SETUP.md`.
- Review and update your published privacy notice for analytics collection and applicable privacy requirements.

- Replace the nine **concept** portfolio designs with real screenshots and case studies when permitted by customers.
- Confirm brand/trademark availability and domain ownership.
- Add your real website URL to `og:url` and canonical tags after domain is chosen. Prefer an absolute `https://yourdomain/...` URL for `og:image` when possible.
- Decide whether to publish a privacy policy (especially if you add analytics, cookies or forms that store client data).
- Review service descriptions, pricing/budget options, supported integrations and aftercare commitments.
- Confirm actual hosting/subscription costs are communicated in client quotations.
- Verify all WhatsApp and phone links from mobile and desktop.
- Run Lighthouse/PageSpeed Insights after deployment and fix any concrete performance, accessibility or SEO issues found.
- Test contrast, screen-reader experience, keyboard navigation and browser compatibility.
- Don't promise fixed Google search rankings or perfect security; the site makes no such guarantee.

## Technology / operations notes

- No paid design library or paid animation license required.
- The ornamental motion uses CSS; the gallery can be navigated by mouse, touch controls and keyboard. Reveal effects use `IntersectionObserver` and honor `prefers-reduced-motion`.
- `lucide-react` is used for SVG icons. Assets generated for sample designs are bundled locally, so the project does not depend on hotlinked photography.
- The optional Google Fonts URL requires an internet connection; system font fallbacks will work without it.
- Vercel response headers include `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and a limited `Permissions-Policy`. A content security policy should be tested against fonts, scripts and other integrations before enabling.
- The example `/` rewrite in `vercel.json` is appropriate for a single-page app. If you add real multi-page routing, update it intentionally.

## License

This website package is prepared for use and customization by **D-SIGN DESIGNERS**. All fictional portfolio names are placeholders and must not be presented as existing paying clients.

## Version 2 upgrade

See `UPGRADE_GUIDE.md` for the apply instructions, feature changes, and known testing limits. See `QA_CHECKLIST.md` for pre-deployment checks.

## Autoplay background music (v3.1)

The original quiet ambient track starts automatically **with sound when the browser permits it**. Browsers commonly prohibit audible autoplay before user interaction; in that case, the first click, tap, or eligible keystroke anywhere on the website starts the music. Visitors can use the bottom-left speaker icon to mute or unmute it. Their choice is retained on refresh. The setting uses browser local storage (no cookies or external tracking).
