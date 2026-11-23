import { supabase } from './supabase';
import { mergeContent } from '../siteDefaults';

export async function loadWebsiteData() {
  if (!supabase) return { content: mergeContent(), projects: null, source: 'static' };
  const [contentResult, projectsResult] = await Promise.all([
    supabase.from('site_content').select('payload').eq('id', 'homepage').maybeSingle(),
    supabase.from('projects').select('*').eq('published', true).order('sort_order', { ascending: true }).order('created_at', { ascending: true })
  ]);
  if (contentResult.error || projectsResult.error) {
    // Never show misleading stale 'success' in the admin. The public website
    // remains usable even if a project has not been configured yet.
    console.warn('Live website data unavailable; using bundled content.', contentResult.error || projectsResult.error);
    return { content: mergeContent(), projects: null, source: 'fallback' };
  }
  return { content: mergeContent(contentResult.data?.payload || {}), projects: projectsResult.data || [], source: 'live' };
}

export function uploadImage(file, onComplete) {
  if (!supabase) return Promise.reject(new Error('Supabase is not configured.'));
  const accepted = new Set(['image/jpeg','image/png','image/webp','image/avif']);
  if (!accepted.has(file.type)) return Promise.reject(new Error('Choose a JPG, PNG, WebP or AVIF image.'));
  if (file.size > 5 * 1024 * 1024) return Promise.reject(new Error('The maximum image size is 5 MB.'));
  const ext = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' }[file.type];
  const path = `${crypto.randomUUID()}.${ext}`;
  return supabase.storage.from('site-media').upload(path, file, { upsert: false, contentType: file.type }).then(({ error }) => {
    if (error) throw error;
    const { data } = supabase.storage.from('site-media').getPublicUrl(path);
    if (onComplete) onComplete(data.publicUrl);
    return data.publicUrl;
  });
}
