/**
 * Patch docmd's slugify functions to preserve CJK (Chinese) characters.
 *
 * docmd replaces all non-ASCII chars with hyphens in output paths,
 * but keeps original Chinese in navigation links — causing 404s.
 * This script adds CJK Unicode ranges to the allow-list so Chinese
 * characters survive slugify unchanged.
 *
 * Scans ALL .js files under node_modules/@docmd/ to catch cached copies.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const OLD_PATTERN = '[^a-zA-Z0-9\\-_.~]';
const NEW_PATTERN = '[^a-zA-Z0-9\\-_.~\\u4e00-\\u9fff\\u3400-\\u4dbf]';

function findJsFiles(dir, results = []) {
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        findJsFiles(fullPath, results);
      } else if (entry.name.endsWith('.js')) {
        results.push(fullPath);
      }
    }
  } catch { /* ignore permission errors */ }
  return results;
}

const root = 'node_modules/@docmd';
const jsFiles = findJsFiles(root);

// Regex to find the OLD pattern (without \u4e00) in the source code.
// Matches: /[^a-zA-Z0-9\-_.~]/g  but NOT /[^a-zA-Z0-9\-_.~\u4e00-...]/g
const oldRegexInSource = /\/\[\^a-zA-Z0-9\\\-_\.\~\]\/g/g;
// Skip files that already have \u4e00 (already patched or different usage)
const alreadyPatched = /\\u4e00-\\u9fff/;

let patched = 0;
let skipped = 0;

for (const file of jsFiles) {
  let content = readFileSync(file, 'utf8');

  // Skip if already patched
  if (alreadyPatched.test(content) && !oldRegexInSource.test(content)) {
    skipped++;
    continue;
  }

  // Skip if no match
  if (!oldRegexInSource.test(content)) {
    continue;
  }

  const before = content;
  content = content.replace(
    oldRegexInSource,
    '/[^a-zA-Z0-9\\-_.~\\u4e00-\\u9fff\\u3400-\\u4dbf]/g'
  );

  if (content !== before) {
    writeFileSync(file, content, 'utf8');
    console.log(`  [PATCHED] ${file.replace(/\\/g, '/')}`);
    patched++;
  }
}

console.log(`\nDone: ${patched} files patched, ${skipped} already patched, ${jsFiles.length} total .js files scanned.`);

if (patched === 0 && skipped === 0) {
  console.error('WARNING: No files were patched! Check if the regex pattern has changed.');
}
