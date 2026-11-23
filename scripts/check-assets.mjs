/** Lightweight dependency-free checks; run with `npm run check:assets`. */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const app = readFileSync(resolve(root, 'src/App.jsx'), 'utf8');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const css = readFileSync(resolve(root, 'src/styles.css'), 'utf8');
const failures = [];
function expect(condition, message) { if (!condition) failures.push(message); }

const publicImages = [
  ...app.matchAll(/["'](\/images\/[^"']+|\/dsign-logo-dark\.png|\/audio\/[^"']+)["']/g),
  ...html.matchAll(/(?:href|content)=["'](\/(?:favicon\.png|og-cover\.png))["']/g),
  ...css.matchAll(/url\(["']?(\/images\/[^)'" ]+)/g),
].map(match => match[1]);
for (const url of new Set(publicImages)) {
  expect(existsSync(resolve(root, 'public', url.slice(1))), `Missing local asset: ${url}`);
}
const concepts = readdirSync(resolve(root, 'public/images/concepts')).filter(file => file.endsWith('.webp'));
expect(concepts.length === 9, `Expected 9 locally bundled concept images, found ${concepts.length}`);
expect((app.match(/category: '[^']+ concept'/g) || []).length >= 3, 'Expected concept portfolio labels');
expect(app.includes('Concept projects') || app.includes('not commissioned client work'), 'Explicit portfolio concept disclaimer missing');
expect(app.includes('prefers-reduced-motion'), 'Reduced-motion support missing');
expect(app.includes('aria-modal="true"'), 'Accessible gallery dialog missing');
expect(app.includes('wa.me/'), 'WhatsApp enquiry link missing');
expect(app.includes('audio.play()'), 'Autoplay attempt missing');
expect(app.includes('aria-pressed={playing}'), 'Music toggle not accessible');
expect(!css.includes('background: #f7fbff;\n  border: 1px solid rgba(255,255,255,.58);'), 'Old boxed brand treatment remains');
if (failures.length) {
  console.error(failures.map(message => `FAIL: ${message}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`PASS: ${new Set(publicImages).size} referenced local assets, 9 concepts, disclosure and accessible controls`);
}
