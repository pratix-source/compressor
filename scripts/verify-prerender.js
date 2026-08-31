const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const pagePath = path.join(root, 'dist', 'en', 'file-compressor', 'index.html');
const html = fs.readFileSync(pagePath, 'utf8');
const required = [
  '<title>Pratix Compressor – Free Online File Compression</title>',
  '<meta name="description" content="Compress code, SVG, PDF and images entirely in your browser. No upload, no server, 100% private." />',
  '<link rel="canonical" href="https://pratix.io/en/file-compressor" />',
  'hreflang="en"',
  'hreflang="x-default"',
  'id="prerendered-seo-content"',
  'FileReader',
  'compressSingleImage',
  'canvas',
];
const missing = required.filter(marker => !html.includes(marker));
if (missing.length) throw new Error(`Missing markers: ${missing.join(', ')}`);
if ((html.match(/data-prerender-hreflang="true"/g) || []).length !== 2) {
  throw new Error('Expected exactly 2 pilot hreflang links');
}
console.log('Static head and client-side compressor markers: passed');
