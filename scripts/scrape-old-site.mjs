#!/usr/bin/env node
/**
 * Crawl the old Webador site and pull down every page + image.
 *
 *   node scripts/scrape-old-site.mjs [startUrl] [outDir]
 *
 * Defaults: https://www.red-rock-remodeling.net/  ->  ./old-site/
 *
 * Output:
 *   old-site/pages/<slug>.html   raw HTML of each crawled page
 *   old-site/pages/<slug>.txt    visible text (headings/paragraphs) of each page
 *   old-site/images/<file>       every unique image, full resolution
 *   old-site/manifest.json       pages, images, alt text, and where each image was used
 *
 * No dependencies — Node 18+ (global fetch).
 */
import { mkdir, writeFile, stat } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';

const START = new URL(process.argv[2] ?? 'https://www.red-rock-remodeling.net/');
const OUT = process.argv[3] ?? 'old-site';
const HOST = START.hostname.replace(/^www\./, '');
const UA = 'Mozilla/5.0 (compatible; rrr-migration-scraper/1.0)';
const IMG_EXT = /\.(jpe?g|png|webp|gif|svg|avif|bmp)$/i;
const CONCURRENCY = 4;

const pagesDir = join(OUT, 'pages');
const imagesDir = join(OUT, 'images');
await mkdir(pagesDir, { recursive: true });
await mkdir(imagesDir, { recursive: true });

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&nbsp;/g, ' ');

const isInternal = (u) => u.hostname.replace(/^www\./, '') === HOST;

function pageSlug(u) {
  const p = u.pathname.replace(/\/+$/, '').replace(/^\//, '');
  return (p || 'index').replace(/[^a-z0-9._-]+/gi, '_').slice(0, 120);
}

/** Strip Webador/CDN resize params so we get the original file. */
function canonicalImageUrl(raw, base) {
  let u;
  try {
    u = new URL(decode(raw.trim()), base);
  } catch {
    return null;
  }
  if (!/^https?:$/.test(u.protocol) || !IMG_EXT.test(u.pathname)) return null;
  // Webador CDN (primary.jwwb.nl) serves resized variants via query params; the bare path is the original.
  u.search = '';
  u.hash = '';
  return u.href;
}

function extractLinks(html, base) {
  const out = new Set();
  for (const m of html.matchAll(/<a\b[^>]*?\bhref\s*=\s*["']([^"'#]+)["']/gi)) {
    try {
      const u = new URL(decode(m[1]), base);
      if (isInternal(u) && /^https?:$/.test(u.protocol) && !IMG_EXT.test(u.pathname)) {
        u.hash = '';
        u.search = '';
        out.add(u.href);
      }
    } catch {
      /* ignore bad hrefs */
    }
  }
  return out;
}

function attr(tag, name) {
  const m = tag.match(new RegExp('\\b' + name + '\\s*=\\s*["\']([^"\']+)["\']', 'i'));
  return m ? m[1] : null;
}

function extractImages(html, base) {
  const found = new Map(); // url -> { alt }
  const add = (raw, alt = '') => {
    const u = canonicalImageUrl(decode(raw).replace(/^["'\s]+|["'\s]+$/g, ''), base);
    if (!u) return;
    if (!found.has(u) || (!found.get(u).alt && alt)) found.set(u, { alt: decode(alt) });
  };

  // <img> tags: src, data-src, srcset, data-srcset, plus alt
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    const alt = attr(tag, 'alt') ?? '';
    for (const a of ['src', 'data-src', 'data-lazy-src', 'data-original']) {
      const v = attr(tag, a);
      if (v) add(v, alt);
    }
    for (const a of ['srcset', 'data-srcset']) {
      const v = attr(tag, a);
      if (v) for (const part of decode(v).split(',')) add(part.trim().split(/\s+/)[0], alt);
    }
  }
  // <source srcset> inside <picture>
  for (const m of html.matchAll(/<source\b[^>]*\bsrcset\s*=\s*["']([^"']+)["']/gi))
    for (const part of decode(m[1]).split(',')) add(part.trim().split(/\s+/)[0]);
  // CSS background-image / inline styles
  for (const m of html.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) add(m[1]);
  // <a href="...jpg"> (lightbox originals), <link rel=icon/preload>, og:image etc.
  for (const m of html.matchAll(/<(?:a|link)\b[^>]*\bhref\s*=\s*["']([^"']+)["']/gi)) add(m[1]);
  for (const m of html.matchAll(/<meta\b[^>]*\bcontent\s*=\s*["']([^"']+)["']/gi)) add(m[1]);
  // Anything JSON-embedded / escaped (Webador puts image URLs in inline JS)
  for (const m of html.matchAll(/https?:(?:\\\/|\/){2}[^"'\s\\)]+?\.(?:jpe?g|png|webp|gif|svg)/gi))
    add(m[0].replace(/\\\//g, '/'));

  return found;
}

function extractText(html) {
  const body = html.replace(
    /<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<noscript[\s\S]*?<\/noscript>/gi,
    ''
  );
  const title = decode(body.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '').trim();
  const lines = [];
  for (const m of body.matchAll(/<(h[1-6]|p|li|blockquote|figcaption|td|th)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const text = decode(m[2].replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, ''))
      .replace(/\s+/g, ' ')
      .trim();
    if (text) lines.push(/^h[1-6]$/i.test(m[1]) ? '\n' + m[1].toUpperCase() + ': ' + text : text);
  }
  return 'TITLE: ' + title + '\n' + lines.join('\n') + '\n';
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA }, redirect: 'follow' });
  if (!res.ok) throw new Error(res.status + ' ' + url);
  return { html: await res.text(), finalUrl: res.url };
}

async function download(url, dest) {
  try {
    if ((await stat(dest)).size > 0) return 'cached';
  } catch {
    /* not there yet */
  }
  const res = await fetch(url, { headers: { 'user-agent': UA }, redirect: 'follow' });
  if (!res.ok) throw new Error(String(res.status));
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  return 'downloaded';
}

// ---- crawl pages (BFS) ----
const queue = [START.href];
const seenPages = new Set(queue);
const pages = [];
const images = new Map(); // url -> { alt, pages: Set }

while (queue.length) {
  const url = queue.shift();
  let html, finalUrl;
  try {
    ({ html, finalUrl } = await fetchText(url));
  } catch (err) {
    console.error('  ! page failed: ' + url + ' (' + err.message + ')');
    continue;
  }
  const u = new URL(finalUrl);
  const slug = pageSlug(u);
  await writeFile(join(pagesDir, slug + '.html'), html);
  await writeFile(join(pagesDir, slug + '.txt'), extractText(html));
  const imgs = extractImages(html, finalUrl);
  for (const [src, meta] of imgs) {
    const entry = images.get(src) ?? { alt: '', pages: new Set() };
    if (!entry.alt && meta.alt) entry.alt = meta.alt;
    entry.pages.add(u.pathname);
    images.set(src, entry);
  }
  pages.push({ url: finalUrl, slug, images: imgs.size });
  console.log('page  ' + u.pathname + '  (' + imgs.size + ' images)');
  for (const link of extractLinks(html, finalUrl)) {
    if (!seenPages.has(link)) {
      seenPages.add(link);
      queue.push(link);
    }
  }
}

// ---- download images ----
const usedNames = new Set();
const jobs = [...images.entries()].map(([src, meta]) => {
  const u = new URL(src);
  let name = basename(u.pathname) || 'image';
  if (!extname(name)) name += '.jpg';
  name = name.replace(/[^a-z0-9._-]+/gi, '_');
  let candidate = name;
  let i = 2;
  while (usedNames.has(candidate)) candidate = name.replace(/(\.[^.]+)$/, '-' + i++ + '$1');
  usedNames.add(candidate);
  return { src, file: candidate, alt: meta.alt, pages: [...meta.pages] };
});

let ok = 0;
let failed = 0;
async function worker() {
  for (;;) {
    const job = jobs.find((j) => !j.status);
    if (!job) break;
    job.status = 'pending';
    try {
      job.status = await download(job.src, join(imagesDir, job.file));
      ok++;
      console.log('img   ' + job.status.padEnd(10) + ' ' + job.file);
    } catch (err) {
      job.status = 'failed: ' + err.message;
      failed++;
      console.error('  ! image failed: ' + job.src + ' (' + err.message + ')');
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

await writeFile(
  join(OUT, 'manifest.json'),
  JSON.stringify({ crawledAt: new Date().toISOString(), start: START.href, pages, images: jobs }, null, 2)
);

console.log('\nDone. ' + pages.length + ' pages, ' + ok + ' images saved, ' + failed + ' failed -> ' + OUT + '/');
