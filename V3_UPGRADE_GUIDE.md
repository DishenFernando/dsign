# D-SIGN DESIGNERS — V3 brand, UX and original ambient sound

## What changed

- Removed the outdated white rectangle on the header and footer logo; added a generated transparent, brighter dark-mode wordmark in `public/dsign-logo-dark.png`. The original asset remains available for reference.
- Updated the Open Graph preview without the white logo panel.
- Added a fully original, synthesised, slow ambient instrumental loop at `public/audio/quiet-horizons.mp3`, with a compact sound icon in the bottom-left corner.
- Requests audible autoplay immediately. **Most browsers block unmuted autoplay before a user gesture.** If blocked, music starts on the first eligible interaction with the page or through the music button. The visitor can mute/unmute at any time; a mute preference is remembered in browser storage.
- Added subtle, reduced-motion-aware ambient hero accents, elevated service and button hover treatments, an unobtrusive scroll-progress indicator, logo glow and mobile spacing improvements.
- Corrected the gallery modal to avoid moving keyboard focus back to Close every time the visitor browses Next/Previous.
- Preserved original client disclaimers, service information, WhatsApp contact functionality and the concept gallery.

## Pick the right installation path

### For V2 already installed
Apply `D_SIGN_Designers_v2_to_v3.patch` from the site root.

```powershell
cd 'D:\Dsign\D-SIGN-Designers-React-Vite'
$patch = "$env:USERPROFILE\Downloads\D_SIGN_Designers_v2_to_v3.patch"
git apply --check $patch
if ($LASTEXITCODE -ne 0) { throw 'Patch mismatch — do not force apply.' }
git apply $patch
npm.cmd install
npm.cmd run check:assets
npm.cmd run build
npm.cmd run dev
```

### If the older V2 patch was never applied
Apply `D_SIGN_Designers_original_to_v3.patch` **only if** your working tree still matches the initial project ZIP. Alternatively, extract the supplied complete v3 ZIP into a separate folder and migrate your personal edits.

### Deployment
Deploy to Vercel as before. The ambient track is a locally hosted MP3, so no audio CDN or npm dependency is needed. Sound is intentionally quiet; testing the final listening level on mobile and desktop is recommended.

## Manual checks

- Hard-refresh; logo should have no white rectangular backing and read clearly on both header and footer.
- Click the sound icon: the background audio should mute or unmute, with the icon and accessible label updating.
- Refresh after muting: music should remain muted. Unmute by tapping the icon.
- Use gallery Next/Previous by keyboard, Escape to close, and Tab to move through dialog controls.
- Test at 360, 390, 768, 1024 and 1440px viewports; verify nav drawer and sticky header.
- Check filter buttons, planner-to-form prefill, WhatsApp links and required fields.
- Test `prefers-reduced-motion: reduce` to make sure decorative movement stops.

## Known constraints

Autoplay is **best effort**, not guaranteed, due to browser security and user preferences. No sound is played from third-party sources. The enquiry form opens WhatsApp; it does not store submissions. All nine portfolio examples remain clearly labeled fictional concepts. Browser-based regression and a production Lighthouse audit still need completion if not explicitly verified by a local browser run.

## V3.1: Autoplay-first with a mute button

- Background music is **enabled by default**. On page load, the website immediately requests playback of the local original soundtrack at a gentle volume.
- If the browser blocks autoplay with sound, the website tries again on the first genuine tap, click, or non-navigation key interaction anywhere on the page. **A website cannot guarantee audible playback before user interaction.**
- The bottom-left speaker control now **mutes/unmutes** rather than pausing/resuming. The track can keep looping silently while muted.
- The visitor's choice is saved in local storage; the previous v3 `off` setting is respected as `muted` on upgrade.
- Sound control also serves as a direct Start Music action if autoplay was blocked. Screen-reader status and labels reflect actual playback state.
- The behavior uses the bundled track `public/audio/quiet-horizons.mp3`. No third-party audio service is required.

To install over v3, apply `D_SIGN_Designers_v3_to_v3_1_Autoplay.patch` from the project root and then run `npm.cmd run check:assets` and `npm.cmd run build`.
