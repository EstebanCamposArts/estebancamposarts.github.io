// === Variables globales ===
let currentGallery = [];
let currentIndex = 0;

// === Elementos del DOM (se cargan después del DOM) ===
let modal, container, modalClose, modalPrev, modalNext;

document.addEventListener("DOMContentLoaded", () => {
  // Asignar elementos del DOM solo cuando estén listos
  modal = document.getElementById("image-modal");
  container = document.getElementById("modal-content-container");
  modalClose = document.getElementById("modal-close");
  modalPrev = document.getElementById("modal-prev");
  modalNext = document.getElementById("modal-next");

  // Eventos
  document.querySelectorAll(".modeler-grid img").forEach(img => {
    img.addEventListener("click", () => openModal(img));
  });

  modalClose.addEventListener("click", closeModal);
  modalPrev.addEventListener("click", prevImage);
  modalNext.addEventListener("click", nextImage);

  window.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
});

// === Funciones principales ===
function openModal(img) {
  const src = img.dataset.hd || img.src;

  // Extraer carpeta usando regex para mayor seguridad
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

  // Mostrar contenido en modal
  showMedia(currentIndex);
  modal.style.display = "flex";

  // Logs para depuración
  console.log("Ruta completa:", src);
  console.log("Carpeta detectada:", folder);
  console.log("Galería disponible:", currentGallery);
  console.log("Índice actual:", currentIndex);
}

function showMedia(index) {
  const mediaUrl = currentGallery[index];
  if (!container) {
    console.error("❌ No se encontró #modal-content-container");
    return;
  }

  container.innerHTML = ""; // Limpiar contenido anterior

  if (isImage(mediaUrl)) {
    const img = document.createElement("img");
    img.src = mediaUrl;
    img.alt = "Imagen ampliada";
    img.className = "modal-image";
    img.loading = "lazy";

    img.onerror = () => {
      container.innerHTML = "<p>❌ Error al cargar la imagen.</p>";
      console.error("❌ Imagen no encontrada:", mediaUrl);
    };

    container.appendChild(img);
  } else if (isVideo(mediaUrl)) {
    const video = document.createElement("video");
    video.src = mediaUrl;
    video.controls = true;
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;
    video.className = "modal-video";

    video.onloadedmetadata = () => video.play();
    video.onerror = () => {
      container.innerHTML = "<p>Hubo un error cargando el video.</p>";
    };

    container.appendChild(video);
  } else {
    container.innerHTML = "<p>Formato no compatible</p>";
  }
}

function isImage(url) {
  return /\.(jpe?g|png|gif|webp)$/i.test(url);
}

function isVideo(url) {
  return /\.(mp4|webm|ogg)$/i.test(url);
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  showMedia(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  showMedia(currentIndex);
}

function closeModal() {
  modal.style.display = "none";
  if (container) container.innerHTML = ""; // Detener video si hay uno
}

// === Galerías generadas automáticamente ===
const galleries = {
  golem: [
    "assets/images/3dmodeling/golem/golem.jpg",
    "assets/images/3dmodeling/golem/golem_1.jpg",
    "assets/images/3dmodeling/golem/golem_2.jpg"
  ],
  ashora: [
    "assets/images/3dmodeling/ashora/ashora.jpg",
    "assets/images/3dmodeling/ashora/ashora_1.jpg",
    "assets/images/3dmodeling/ashora/ashora_2.jpg",
    "assets/images/3dmodeling/ashora/ashora_3.jpg"
  ],
  ayara: [
    "assets/images/3dmodeling/ayara/ayara.jpg",
    "assets/images/3dmodeling/ayara/ayara_1.jpg",
    "assets/images/3dmodeling/ayara/ayara_2.jpg",
    "assets/images/3dmodeling/ayara/ayara_3.jpg"
  ],
  bust: [
    "assets/images/3dmodeling/bust/bust.jpg",
    "assets/images/3dmodeling/bust/bust_1.jpg",
    "assets/images/3dmodeling/bust/bust_2.jpg"
  ],
  cleo: [
    "assets/images/3dmodeling/cleo/cleo.jpg",
    "assets/images/3dmodeling/cleo/cleo_1.jpg",
    "assets/images/3dmodeling/cleo/cleo_2.jpg",
    "assets/images/3dmodeling/cleo/cleo_3.jpg",
    "assets/images/3dmodeling/cleo/cleo_4.jpg",
    "assets/images/3dmodeling/cleo/cleo_5.jpg"
  ],
  jack: [
    "assets/images/3dmodeling/jack/jack.jpg",
    "assets/images/3dmodeling/jack/jack_1.jpg",
    "assets/images/3dmodeling/jack/jack_2.jpg"
  ],
  ogi: [
    "assets/images/3dmodeling/ogi/ogi.jpg",
    "assets/images/3dmodeling/ogi/ogi_1.jpg",
    "assets/images/3dmodeling/ogi/ogi_2.jpg"
  ],
  pichon: [
    "assets/images/3dmodeling/pichon/pichon.jpg",
    "assets/images/3dmodeling/pichon/pichon_1.jpg"
  ],
  rob: [
    "assets/images/3dmodeling/rob/rob.jpg",
    "assets/images/3dmodeling/rob/rob_1.jpg",
    "assets/images/3dmodeling/rob/rob_2.jpg"
  ],
};