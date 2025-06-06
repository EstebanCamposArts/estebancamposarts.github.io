// generate-gallery.js
const fs = require('fs');
const path = require('path');

const baseDir = 'assets/images/3dmodeling'; // Carpeta base donde están tus modelos
const output = 'gallery-config.js';

function getImagesFromFolder(folderPath) {
  return fs.readdirSync(folderPath)
    .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
    .map(file => path.join(folderPath, file).replace(/\\/g, '/'));
}

function buildGalleryConfig() {
  const folders = fs.readdirSync(baseDir).filter(folder => fs.statSync(path.join(baseDir, folder)).isDirectory());
  let config = 'const galleries = {\n';

  for (const folder of folders) {
    const images = getImagesFromFolder(path.join(baseDir, folder));
    if (images.length > 0) {
      config += `  "${folder}": [\n`;
      config += images.map(img => `    "${img}"`).join(',\n');
      config += '\n  ],\n';
    }
  }

  config += '};\n';
  fs.writeFileSync(output, config);
  console.log(`✅ Galería generada: ${output}`);
}

buildGalleryConfig();