// generate-gallery.js
const fs = require('fs');
const path = require('path');

const baseDir = 'assets/images/3dmodeling/'; // Carpeta base donde están tus modelos
const output = 'js/gallery-config.js';     // Ubicación actualizada del archivo de salida

// Archivos a ignorar
const ignoreFiles = ['.ds_store', 'thumbs.db', '.gitkeep'];

// Extensiones permitidas
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);

function getImagesFromFolder(folderPath) {
  try {
    const files = fs.readdirSync(folderPath);
    return files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.has(ext) && !ignoreFiles.includes(file.toLowerCase());
      })
      .map(file => path.join(folderPath, file).replace(/\\/g, '/'));
  } catch (err) {
    console.error(`❌ Error leyendo carpeta ${folderPath}:`, err.message);
    return [];
  }
}

function buildGalleryConfig() {
  try {
    const folders = fs.readdirSync(baseDir)
      .filter(folder => {
        const fullPath = path.join(baseDir, folder);
        return fs.statSync(fullPath).isDirectory();
      });

    let config = '// === Galerías generadas automáticamente ===\n';
    config += 'const galleries = {\n';

    for (const folder of folders) {
      const images = getImagesFromFolder(path.join(baseDir, folder));
      if (images.length > 0) {
        config += `  "${folder}": [\n`;
        config += images.map(img => `    "${img}"`).join(',\n');
        config += '\n  ],\n';
      } else {
        console.warn(`⚠️ Carpeta vacía o sin imágenes: ${folder}`);
      }
    }

    config += '};\n';
    
    fs.writeFileSync(output, config);
    console.log(`✅ Galería generada correctamente: ${output}`);
  } catch (err) {
    console.error(`❌ Error al generar la galería:`, err.message);
  }
}

buildGalleryConfig();




