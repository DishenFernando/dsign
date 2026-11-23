# D-SIGN DESIGNERS — Production QA Checklist

Review on a live development server before deploying. This checklist documents expected behavior; it is **not** a claim that browser tests have been completed.

## Desktop and responsive layouts

- [ ] Desktop 1440 × 900: logo visible, header clear, hero mockup fits without horizontal overflow.
- [ ] Laptop 1280 × 720: navigation and CTA fit, services grid remains readable.
- [ ] Tablet 768 × 1024: hamburger menu opens below the header, closes with Escape and when a link is chosen.
- [ ] Mobile 390 × 844 and 320 × 700: no horizontal scrolling; forms fit; all gallery cards and dialogs are readable.
- [ ] Footer logo remains legible on its light backing and business number is correct.

## Interactions

- [ ] All navigation links scroll to the matching section.
- [ ] Service cards link to the intended WhatsApp chat.
- [ ] Project planner tabs change explanatory image, text and inclusion list.
- [ ] Planner's "Discuss this idea" selects the correct project type in the contact form.
- [ ] Gallery category buttons filter the nine concepts correctly (3 in each category).
- [ ] Both gallery card buttons open a preview; gallery Previous/Next and keyboard left/right arrows work.
- [ ] Escape and the close button close the gallery, returning keyboard focus to the original trigger.
- [ ] Tab stays inside the open gallery and mobile navigation.
- [ ] FAQ accordion opens and closes using keyboard and pointer.
- [ ] Back-to-top appears after scrolling and works on desktop/mobile.
- [ ] Contact form validates name and a description of at least 10 characters; submission opens a draft WhatsApp message and does not auto-send it.

## Accessibility, assets, SEO and deployment

- [ ] `npm.cmd run check:assets` passes.
- [ ] `npm.cmd run build` completes without errors.
- [ ] Browser Console has no React warnings, image 404s or runtime errors.
- [ ] Images load from `/images/concepts/` (WebP) without hotlinked services.
- [ ] Test using keyboard-only and a screen reader; check focus, headings and labels.
- [ ] Turn on reduced-motion OS preference; movements stop or become negligible.
- [ ] Run Chrome Lighthouse to measure accessibility, performance, SEO and best practices.
- [ ] Confirm business phone `+94 70 118 8941`, WhatsApp link and all service copy.
- [ ] Confirm portfolio clearly describes mockups as fictional design concepts.
- [ ] Confirm preview image and metadata after Vercel deployment, and set your canonical domain.
