// Builds dist/ from src/. Run with: npm run build
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import * as t from './src/templates/templates.mjs';

const json = (f) => JSON.parse(readFileSync(`src/data/${f}`, 'utf8'));
const site = json('site.json');
const activities = json('activities.json');
const where = json('locations.json');
const faqs = json('faqs.json');

// Menu is derived from the sections, in page order.
const menu = [site.about, ...activities, where, faqs, site.contact];

const html = [
  t.head(site),
  t.header(site, menu),
  '',
  '<main>',
  t.hero(site.hero),
  '',
  [t.textSection(site.about), ...activities.map(t.activity), t.where(where), t.faqs(faqs), t.textSection(site.contact)].join('\n\n'),
  '</main>',
  t.footer(site),
].join('\n');

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist/styles', { recursive: true });
writeFileSync('dist/index.html', html);
cpSync('src/styles/main.css', 'dist/styles/main.css');
cpSync('src/assets/images', 'dist/images', { recursive: true });
if (existsSync('src/js')) cpSync('src/js', 'dist/js', { recursive: true });
console.log(`Built dist/ with ${activities.length} activities: ${activities.map(a => a.menu).join(', ')}`);
