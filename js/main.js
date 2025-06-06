// === Variables globales ===
let currentGallery = [];
let currentIndex = 0;

// === Elementos del DOM ===
const modal = document.getElementById("image-modal");
const container = document.getElementById("modal-content-container");
const modalClose = document.getElementById("modal-close");
const modalPrev = document.getElementById("modal-prev");
const modalNext = document.getElementById("modal-next");

// === Event Listeners ===
document.querySelectorAll(".modeler-grid img").forEach(img => {
  img.addEventListener("click", () => openModal(img));
});

modalClose.addEventListener("click", closeModal);
modalPrev.addEventListener("click", prevImage);
modalNext.addEventListener("click", nextImage);

window.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

// === Funciones principales ===
function openModal(img) {
  const src = img.dataset.hd || img.src;
  const parts = src.split("/");
  const folder = parts[parts.length - 2]; // Carpeta actual

  currentGallery = galleries[folder] || [src];
  currentIndex = currentGallery.indexOf(src);
  if (currentIndex === -1) currentIndex = 0;

  showMedia(currentIndex);
  modal.style.display = "flex";
}

function showMedia(index) {
  const mediaUrl = currentGallery[index];
  container.innerHTML = ""; // Limpiar contenido anterior

  if (isImage(mediaUrl)) {
    const img = document.createElement("img");
    img.src = mediaUrl;
    img.alt = "Imagen ampliada";
    img.classList.add("modal-image");
    container.appendChild(img);
  } else if (isVideo(mediaUrl)) {
    const video = document.createElement("video");
    video.src = mediaUrl;
    video.controls = true; // Mostrar controles
    video.autoplay = true;
    video.loop = false;
    video.muted = true;
    video.playsInline = true;
    video.classList.add("modal-video");
    container.appendChild(video);
  }
}

function isImage(url) {
  return /\.(jpe?g|png|gif|webp)$/i.test(url);
}

function isVideo(url) {
  return /\.(mp4|webm|ogg)$/i.test(url);
}

function nextImage() {
  showMedia((currentIndex + 1) % currentGallery.length);
}

function prevImage() {
  showMedia((currentIndex - 1 + currentGallery.length) % currentGallery.length);
}

function closeModal() {
  modal.style.display = "none";
  container.innerHTML = ""; // Detener video si hay uno
}

// === Galerías por carpeta ===
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
    "assets/images/3dmodeling/ayara/ayara_3.jpg",
    "assets/images/3dmodeling/ayara/ayara_1.mp4"
  ],
  bust: [
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
    "assets/images/3dmodeling/ogi/ogi_2.jpg",
    "assets/images/3dmodeling/ogi/ogi_1.jpg"
  ],
  pichon: [
    "assets/images/3dmodeling/pichon/pichon.jpg",
    "assets/images/3dmodeling/pichon/pichon_1.jpg"
  ],
  rob: [
    "assets/images/3dmodeling/rob/rob.jpg",
    "assets/images/3dmodeling/rob/rob_1.jpg",
    "assets/images/3dmodeling/rob/rob_2.jpg",
    "assets/images/3dmodeling/rob/rob_1.mp4",
    "assets/images/3dmodeling/rob/rob_2.mp4"
  ],
  tubos: [
    "assets/images/3dmodeling/tubos.jpg"
  ],
  escalas: [
    "assets/images/3dmodeling/escalas.jpg"
  ],
  machine: [
    "assets/images/3dmodeling/machine.jpg",
    "assets/images/3dmodeling/machine_1.jpg"
  ]
};