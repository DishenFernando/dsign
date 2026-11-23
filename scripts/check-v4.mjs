import { readFileSync, existsSync } from 'node:fs';
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const sources = {
  app: read('src/App.jsx'), admin: read('src/AdminPanel.jsx'),
  theme: read('src/v4.css'), sql: read('supabase/schema.sql'),
  main: read('src/main.jsx'), defaults: read('src/siteDefaults.js')
};
const checks = [
  ['admin route isolated from public home', /\/admin\(\?:/.test(sources.main) || sources.main.includes('isAdminRoute')],
  ['admin checks actual authenticated user', sources.admin.includes('supabase.auth.getUser()')],
  ['admin checks membership', sources.admin.includes("from('admin_users')")],
  ['login uses password-based Supabase Auth', sources.admin.includes('signInWithPassword')],
  ['gallery has draft and publish controls', sources.admin.includes('published') && sources.admin.includes('ProjectEditor')],
  ['public gallery filters published projects', read('src/lib/siteData.js').includes(".eq('published', true)")],
  ['SQL uses row-level security', sources.sql.includes('enable row level security')],
  ['SQL denies public admin membership edits', sources.sql.includes('revoke all on public.admin_users from anon, authenticated')],
  ['Storage uploads require admin', sources.sql.includes('"site media admin uploads"') && sources.sql.includes('public.is_site_admin()')],
  ['light theme rules present', sources.theme.includes(':root[data-theme="light"]')],
  ['dark theme rules present', sources.theme.includes(':root[data-theme="dark"]')],
  ['splash honors reduced motion', read('src/components/SplashScreen.jsx').includes('prefers-reduced-motion')],
  ['audio volume is editable', sources.app.includes('content.site.music_volume')],
  ['Vercel deployment is configured', existsSync(new URL('../vercel.json', import.meta.url))],
  ['No hardcoded admin credentials', !sources.admin.includes('admin123') && !sources.admin.includes('DEFAULT_PASSWORD')]
];
let failed = false;
for (const [name, pass] of checks) {
  console.log(`${pass ? 'PASS' : 'FAIL'}: ${name}`);
  if (!pass) failed = true;
}
if (failed) process.exitCode = 1;
