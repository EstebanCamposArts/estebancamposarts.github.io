// === Variables globales ===
let currentGallery = [];
let currentIndex = 0;

// === Elementos del DOM ===
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
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

// === Funciones del modal ===
function openModal(img) {
  const src = img.dataset.hd || img.src;
  const parts = src.split("/");
  const folder = parts[parts.length - 2]; // Carpeta actual

  currentGallery = galleries[folder] || [src];
  currentIndex = currentGallery.indexOf(src);
  if (currentIndex === -1) currentIndex = 0;

  modal.style.display = "flex";
  modalImg.src = currentGallery[currentIndex];
}

function closeModal() {
  modal.style.display = "none";
  modalImg.src = "";
  currentGallery = [];
  currentIndex = 0;
}

function showImage(index) {
  currentIndex = (index + currentGallery.length) % currentGallery.length;
  modalImg.src = currentGallery[currentIndex];
}

function nextImage() {
  showImage(currentIndex + 1);
}

function prevImage() {
  showImage(currentIndex - 1);
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