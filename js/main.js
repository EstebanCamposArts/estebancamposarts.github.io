// === Variables globales ===
let currentGallery = [];
let currentIndex = 0;

let modal, modalImg, modalClose, modalPrev, modalNext;

document.addEventListener("DOMContentLoaded", () => {
  // Asignar elementos del DOM solo cuando estén listos
  modal = document.getElementById("image-modal");
  modalImg = document.getElementById("modal-img");
  modalClose = document.getElementById("modal-close");
  modalPrev = document.getElementById("modal-prev");
  modalNext = document.getElementById("modal-next");

  // Eventos comunes
  modalClose.addEventListener("click", closeModal);
  modalPrev.addEventListener("click", prevImage);
  modalNext.addEventListener("click", nextImage);

  window.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  // Cargar galerías existentes (3D Modeling)
  document.querySelectorAll(".modeler-grid img").forEach(img => {
    img.addEventListener("click", () => openModelerGallery(img));
  });

  // Cargar nuevas galerías (Sports Photography)
  document.querySelectorAll(".gallery-grid img").forEach(img => {
    img.addEventListener("click", () => openSportsGallery(img));
  });
});

// === Funciones para 3D Modeling Gallery ===
function openModelerGallery(img) {
  const src = img.dataset.hd || img.src;

  // Extraer carpeta desde la ruta usando regex
  const match = src.match(/3dmodeling\/([^\/]+)/);
  const folder = match ? match[1] : "";

  // Obtener galería por carpeta o usar directamente esta imagen
  currentGallery = galleries[folder] || [src];

  // Validar índice
  currentIndex = currentGallery.indexOf(src);
  if (currentIndex === -1) {
    console.warn("⚠️ Imagen no encontrada en la galería:", src);
    currentGallery = [src];
    currentIndex = 0;
  }

  showImage(currentIndex);
  modal.style.display = "flex";
}

// === Funciones para Sports Gallery ===
function openSportsGallery(img) {
  const src = img.dataset.hd || img.src;

  // Extraer carpeta desde la ruta usando regex
  const match = src.match(/fotografia\/([^\/]+)/);
  const folder = match ? match[1] : "";

  // Obtener galería por carpeta o usar directamente esta imagen
  currentGallery = galleries[folder] || [src];
 
  // Validar índice
  currentIndex = currentGallery.indexOf(src);
  if (currentIndex === -1) {
    console.warn("⚠️ Imagen no encontrada en la galería deportiva:", src);
    currentGallery = [src];
    currentIndex = 0;
  }

  showImage(currentIndex);
  modal.style.display = "flex";
}

// === Generador automático de galerías deportivas ===
function generateSportsImageList(folder) {
  if (!folder) return [];

  const basePath = `assets/images/fotografia/sports/${folder}/jpg/`;
  const imageCount = 24;
  const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const list = [];

  for (let i = 1; i <= imageCount; i++) {
    for (const ext of extensions) {
      const path = `${basePath}${folder}_${i}${ext}`;
      // Aquí asumes que todas existen (ya que tú controlas las carpetas)
      list.push(path);
    }
  }

  return list;
}

// === Función general para mostrar imagen ===
function showImage(index) {
  modalImg.src = currentGallery[index];
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  showImage(currentIndex);
}

function closeModal() {
  modal.style.display = "none";
  modalImg.src = "";
}