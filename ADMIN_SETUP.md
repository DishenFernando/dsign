# D-SIGN DESIGNERS v4 — secure admin setup (React/Vite + Supabase)

The website remains available without a backend. The `/admin` route requires a *real* Supabase project and an explicitly authorized email/password account. **There is no hard-coded default password.** Deployment without the setup shows a setup explanation, not a working admin.

## 1) Database and storage (one time)

1. Create a project at <https://supabase.com/dashboard>.
2. Open **SQL Editor → New query**, paste the entire `supabase/schema.sql`, and run it. This creates `public.admin_users`, `public.site_content`, `public.projects`, row-level security policies, and a public image bucket with *admin-only* uploads/deletes. It seeds the existing nine gallery items as **design concepts**.
3. In **Authentication → Providers**, leave email/password authentication enabled. Disable public self-signup if you won't support public accounts. In **Authentication → Users**, use **Add user** to create an email/password admin account with a strong, unique password (and preferably email confirmation). Do **not** enter this password into React, `.env`, SQL, or source control.
4. Back in **SQL Editor**, add the admin to the allowed list. Substitute the real email carefully:

```sql
insert into public.admin_users (user_id)
select id from auth.users where email = 'YOUR_ADMIN_EMAIL@example.com'
on conflict (user_id) do nothing;
```

Verify exactly one user matched:

```sql
select u.id, u.email from auth.users u
join public.admin_users a on a.user_id = u.id;
```

Only users listed in `admin_users` may change site content, projects and media. More users can be authorized by explicitly inserting their user IDs. Revocation is `delete from public.admin_users where user_id = 'UUID_HERE';`.

## 2) Configure the Vite frontend

Copy `.env.example` to `.env.local` and set **only** the public Supabase project URL and publishable key:

```powershell
Copy-Item .env.example .env.local
notepad .env.local
npm.cmd install
npm.cmd run check
npm.cmd run dev
```

```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

The older `VITE_SUPABASE_ANON_KEY` is supported for projects that use legacy anon keys. The publishable key is intentionally visible to site visitors; **RLS is the security boundary**.

NEVER use a `service_role`, `sb_secret_...`, database password, JWT signing secret, or admin password in any `VITE_*` variable. Every Vite variable is bundled into public JS.

### Vercel environment variables

In your **Vercel project → Settings → Environment Variables**, create the same two keys for Production, and optionally Preview. Redeploy the project after adding variables. Production uses `https://YOUR_DOMAIN/admin` for login and `/` for the public site.

The included `vercel.json` rewrites `/admin` to the Vite application and sends a `noindex` response header for the admin path. Hiding `/admin` from search engines is not authentication—Supabase Auth and SQL RLS enforce access.

## 3) Admin features

- **Overview:** published/draft counts and quick links.
- **Projects & gallery:** create/edit/delete, classify work as design concept vs real client work, change category, upload an image, set display order, draft/publish.
- **Services:** edit cards, icons, tags, images and descriptions.
- **Page content:** hero headline/highlights, about text, section headings, FAQ, contact and footer copy.
- **FAQs:** create/delete/edit entries.
- **Process & benefits:** edit step details, the four-stage mobile journey and the project planner.
- **Media library:** upload/reuse/delete images (JPG/PNG/WebP/AVIF up to 5 MB). Deleting an image does not rewrite project references—check where it is used.
- **Settings:** phone, WhatsApp number, logo, SEO title/description, default theme, splash visibility, enable/disable music, playback volume.

`Save & publish` persists **site copy/services/settings**. Gallery projects save individually in their own editor. Published content is immediately available to public visitors on their next load/refresh. Draft projects are visible only to authorized administrators. WhatsApp enquiries are **not** stored in the admin database. Visitor analytics remain in the Vercel dashboard.

## 4) Essential authorization checks

Run these checks before relying on the admin in production:

1. With no Supabase variables, `/` still shows the original gallery and `/admin` shows setup info (not an insecure login).
2. Set up Supabase and visit `/admin`. A wrong password must fail; correct credentials without an `admin_users` membership must be denied and signed out.
3. An authorized admin can add a **draft** project. In an incognito browser at `/`, the draft must **not** appear.
4. Publish that project; open `/` in an incognito window and verify it appears. Edit/delete and verify the result.
5. Sign out. Anonymous requests must not be able to insert/update/delete `projects` or `site_content`, and anonymous uploads to `site-media` must fail. SQL RLS provides the enforcement; route visibility alone is not sufficient.
6. Change the theme in public mode and refresh. The choice must persist. Check desktop, iPhone Safari, Chrome Android, gallery modals, form inputs and the four-stage slider.
7. Verify music volume with headphones. Browsers may reject **audible autoplay** without a visitor gesture; the website retries at the first interaction and offers a mute control.

For any Supabase error like `relation does not exist`, `permission denied`, or `row level security`, rerun/inspect the SQL setup rather than weakening RLS policies. Keep user signups disabled if only admin login is needed, enable MFA for admin accounts where supported, and use unique long passwords.

## 5) Privacy and deployment notes

Gallery image URLs are public assets, and visible text in `site_content` is publicly readable. Do not enter secrets, API keys, or private client information in public content. For actual client work, confirm permission before publishing screenshots/testimonials.

The SQL script can be rerun: existing records are preserved; gallery concepts are seeded only if the table is empty. It intentionally **does not** create a default admin password or public admin registration form.

Official docs: <https://supabase.com/docs/guides/auth/quickstarts/react>, <https://supabase.com/docs/guides/database/postgres/row-level-security>, <https://supabase.com/docs/guides/storage/security/access-control>.
