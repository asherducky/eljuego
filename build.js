// Builds the Netlify-ready site: node build.js  →  site/index.html (upload the site folder)
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'ashen-reach.html'), 'utf8');
const out = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>' + src + '</body></html>';
fs.mkdirSync(path.join(__dirname, 'site'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'site', 'index.html'), out);
console.log('Wrote site/index.html');
