#!/usr/bin/env node

/**
 * Build distribution package.
 * Creates a zip file with all necessary files for using Asta.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create/clean subdirectories (keep dist/asta.html).
console.log('Preparing dist directory...');
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Clean subdirectories
['css', 'js', 'fonts'].forEach(dir => {
  const dirPath = path.join('dist', dir);
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true });
  }
  fs.mkdirSync(dirPath);
});

// Copy files
console.log('Copying files...');
fs.copyFileSync('src/css/asta.css', 'dist/css/asta.css');
fs.copyFileSync('src/css/asta.min.css', 'dist/css/asta.min.css');
fs.copyFileSync('src/js/asta.js', 'dist/js/asta.js');
fs.copyFileSync('src/js/asta.min.js', 'dist/js/asta.min.js');

// Copy all font files
const fontFiles = fs.readdirSync('src/fonts').filter(f => f.endsWith('.woff2'));
fontFiles.forEach(file => {
  fs.copyFileSync(path.join('src/fonts', file), path.join('dist/fonts', file));
});

console.log('Creating archive...');

// Create zip archive using Node.js native implementation.
const archiver = require('archiver');
const output = fs.createWriteStream('dist/asta.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  const fileSizeInMB = (archive.pointer() / (1024 * 1024)).toFixed(2);
  console.log('✓ Created dist/asta.zip');
  console.log(`Archive size: ${fileSizeInMB} MB`);
  console.log('\nDistribution package ready at: dist/asta.zip');
  console.log('Contains:');
  console.log('  - asta.html (starter template)');
  console.log('  - css/asta.css');
  console.log('  - css/asta.min.css');
  console.log('  - js/asta.js');
  console.log('  - js/asta.min.js');
  console.log('  - fonts/*.woff2');
  console.log('\nTo get started: Extract the zip and open asta.html in your browser!');
});

archive.on('error', (err) => {
  console.error('Failed to create zip archive');
  throw err;
});

archive.pipe(output);
archive.directory('dist/css', 'css');
archive.directory('dist/js', 'js');
archive.directory('dist/fonts', 'fonts');
archive.file('dist/asta.html', { name: 'asta.html' });
archive.finalize();
