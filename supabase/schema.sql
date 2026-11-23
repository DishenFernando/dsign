-- D-SIGN DESIGNERS v4 content administration — run ONCE in Supabase SQL Editor.
-- IMPORTANT: SQL Editor is privileged. Never paste credentials into source files.
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create table if not exists public.site_content (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint homepage_only check (id = 'homepage'),
  constraint payload_object check (jsonb_typeof(payload) = 'object')
);
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) between 1 and 140),
  type text not null default 'Marketing' check (type in ('Marketing','E-commerce','Web Apps')),
  subtitle text not null default '',
  category text not null default '',
  description text not null default '',
  image_url text not null default '',
  features text[] not null default '{}',
  kind text not null default 'concept' check (kind in ('concept','client')),
  published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end; $$;
drop trigger if exists content_updated_at on public.site_content;
create trigger content_updated_at before update on public.site_content
for each row execute function public.set_updated_at();
drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at before update on public.projects
for each row execute function public.set_updated_at();

-- No admin credentials or role assignments are exposed through public JSON.
-- SECURITY DEFINER avoids recursive RLS when checking membership.
create or replace function public.is_site_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admin_users where user_id = (select auth.uid()));
$$;
revoke all on function public.is_site_admin() from public;
grant execute on function public.is_site_admin() to anon, authenticated;

alter table public.admin_users enable row level security;
alter table public.site_content enable row level security;
alter table public.projects enable row level security;

-- Admin membership can be created/removed ONLY from Supabase SQL Editor/server-side admin.
revoke all on public.admin_users from anon, authenticated;
grant select on public.admin_users to authenticated;
drop policy if exists "admins can read own membership" on public.admin_users;
create policy "admins can read own membership" on public.admin_users for select to authenticated
using (user_id = (select auth.uid()));

grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;
drop policy if exists "anyone can read public site content" on public.site_content;
create policy "anyone can read public site content" on public.site_content for select to anon, authenticated using (true);
drop policy if exists "admins manage site content" on public.site_content;
create policy "admins manage site content" on public.site_content for all to authenticated
using ((select public.is_site_admin())) with check ((select public.is_site_admin()));

grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;
drop policy if exists "public sees published projects" on public.projects;
create policy "public sees published projects" on public.projects for select to anon, authenticated
using (published or (select public.is_site_admin()));
drop policy if exists "admins manage projects" on public.projects;
create policy "admins manage projects" on public.projects for all to authenticated
using ((select public.is_site_admin())) with check ((select public.is_site_admin()));

-- Image library is publicly viewable but ONLY approved admins can upload/delete.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media', 'site-media', true, 5242880, ARRAY['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "site media public downloads" on storage.objects;
create policy "site media public downloads" on storage.objects for select to anon, authenticated
using (bucket_id = 'site-media');
drop policy if exists "site media admin uploads" on storage.objects;
create policy "site media admin uploads" on storage.objects for insert to authenticated
with check (bucket_id = 'site-media' and (select public.is_site_admin()));
drop policy if exists "site media admin updates" on storage.objects;
create policy "site media admin updates" on storage.objects for update to authenticated
using (bucket_id = 'site-media' and (select public.is_site_admin()))
with check (bucket_id = 'site-media' and (select public.is_site_admin()));
drop policy if exists "site media admin deletes" on storage.objects;
create policy "site media admin deletes" on storage.objects for delete to authenticated
using (bucket_id = 'site-media' and (select public.is_site_admin()));

insert into public.site_content (id, payload) values ('homepage','{}'::jsonb)
on conflict (id) do nothing;

-- First-run sample gallery: these are CONCEPTS, NOT real client deliveries.
-- Only insert on an empty gallery so running setup twice doesn't duplicate items.
insert into public.projects (title, type, subtitle, category, description, image_url, features, kind, published, sort_order)
select seed.title, seed.type, seed.subtitle, seed.category, seed.description, seed.image_url, seed.features, 'concept', true, seed.sort_order
from (values
 (1,'The Modern Spaces','Marketing','Architecture & brand presence','Business website concept','An editorial website direction for a modern architecture studio.','/images/concepts/studio-spaces.webp',array['Immersive landing page','Portfolio storytelling','Clear enquiry flow']),
 (2,'Form & Function','E-commerce','Contemporary homeware store','E-commerce concept','A tactile, product-led online shopping experience for considered living.','/images/concepts/nordic-objects.webp',array['Curated product discovery','Mobile-friendly collections','Thoughtful conversion journeys']),
 (3,'Clarity Workspace','Web Apps','Operations & analytics platform','Web application concept','An intuitive dashboard direction that makes complex information easier to navigate.','/images/concepts/digital-flux.webp',array['Role-based journeys','Data visualisation','Organised workflows']),
 (4,'Horizon Residences','Marketing','Premium real estate experience','Property website concept','A sophisticated property showcase designed around imagery and clear next steps.','/images/concepts/horizon-villa.webp',array['Property storytelling','Responsive galleries','Lead generation']),
 (5,'Atelier Living','E-commerce','Refined lifestyle collection','Online store concept','A warm, minimalist shopping direction for premium interior products.','/images/concepts/atelier-interiors.webp',array['Product collections','Editorial storytelling','Shopping experience']),
 (6,'Flux Analytics','Web Apps','Insights & decision platform','Dashboard concept','A data-led web application direction with a clear, confident visual language.','/images/concepts/luminous-platform.webp',array['Custom dashboard layouts','API-ready interactions','Accessible navigation']),
 (7,'Northline Studio','Marketing','Interior architecture presence','Studio website concept','A visual-first studio website concept that balances imagery and meaningful content.','/images/concepts/modern-residence.webp',array['Service storytelling','Project showcases','Enquiry pathways']),
 (8,'Everyday Edit','E-commerce','Design-led product boutique','Retail concept','An inviting storefront concept with a visual product discovery experience.','/images/concepts/everyday-objects.webp',array['Collection browsing','Product highlights','Streamlined mobile layout']),
 (9,'Cloudline Console','Web Apps','Business management workspace','SaaS interface concept','A streamlined workspace direction for everyday business operations.','/images/concepts/cloud-workspace.webp',array['Modular components','Organised information','Scalable interface patterns'])
) as seed(sort_order, title, type, subtitle, category, description, image_url, features)
where not exists (select 1 from public.projects);

-- NEXT STEP (execute separately after creating the email/password account in Auth > Users):
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'YOUR_ADMIN_EMAIL@example.com'
-- on conflict (user_id) do nothing;
-- Keep email signups DISABLED for public users in Authentication > Providers if not needed.
