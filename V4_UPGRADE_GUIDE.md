# D-SIGN DESIGNERS Website v4.0 — upgrade from v3.3

**Baseline:** `D_SIGN_Designers_React_Vite_v3_3_Mobile_Slider_Updated.zip` (exact baseline supplied in the previous update).

## New features

- Short premium branded splash intro, skip button, remembers session, respects reduced-motion preference.
- Peaceful lobby soundtrack volume increased from 0.36 to 0.54, with admin volume adjustment, autoplay attempt and remembered mute control.
- Professional light and dark themes covering all website sections, responsive mobile navigation, dialogs and the admin workspace. Theme persists in visitor local storage.
- Separate `/admin` workspace with Supabase email/password authentication and database-enforced admin access.
- Editable projects/gallery (draft/published), services, hero/about/section copy, FAQs, process/benefits, slider stages, project planner, media, site preferences and music/appearance.
- Existing Vercel Analytics and mobile carousel preserved.

## Apply patch (PowerShell)

First back up or commit any local modifications:

```powershell
cd D:\Dsign\D-SIGN-Designers-React-Vite
$patch = "$env:USERPROFILE\Downloads\D_SIGN_Designers_v3_3_to_v4_Admin_Themes_Splash.patch"
git apply --check $patch
if ($LASTEXITCODE -ne 0) { throw "Patch mismatch. Download the complete v4 ZIP instead." }
git apply $patch
npm.cmd install
npm.cmd run check:assets
npm.cmd run check:v4
npm.cmd run build
npm.cmd run dev
```

You can visit `/` before configuring Supabase (bundled site content still works). To enable actual editing, follow `ADMIN_SETUP.md` and set the public Supabase project URL and publishable key in `.env.local` and Vercel settings.

## Deployment

1. Confirm `npm.cmd run build` succeeds locally.
2. Configure Supabase as explained in `ADMIN_SETUP.md`, create the admin user and set up RLS before enabling the admin in production.
3. Add required `VITE_*` variables to Vercel, commit/push changes and deploy.
4. Test `https://YOUR_DOMAIN/` and `https://YOUR_DOMAIN/admin`, sign in, create a draft then publish and verify the public gallery.
5. Test light/dark on mobile and desktop, sound mute and autoplay fallback, splash on first session visit.

**Browser limitation:** audible auto-play cannot be guaranteed on every visitor's first load. This restriction cannot be overridden through website code.

**Security note:** The admin path is publicly reachable but the dashboard is protected by real credentials and RLS. No password or admin secrets are shipped in this patch.
