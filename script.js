// Mobile menu toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true" || false;
    navToggle.setAttribute("aria-expanded", !expanded);
    navLinks.classList.toggle("show");
  });
}

// Year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Modal gallery logic
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentAlbum = [];
let currentIndex = 0;

// کلیک روی کارت پروژه
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const images = card.dataset.images.split(",");
    currentAlbum = images;
    currentIndex = 0;

    modal.style.display = "block";
    modalImg.src = currentAlbum[currentIndex];
    captionText.innerHTML = card.querySelector("h3").innerText;
  });
});

function showImage(index) {
  if (index < 0) index = currentAlbum.length - 1;
  if (index >= currentAlbum.length) index = 0;
  currentIndex = index;
  modalImg.src = currentAlbum[currentIndex];
}

if (prevBtn) prevBtn.onclick = () => showImage(currentIndex - 1);
if (nextBtn) nextBtn.onclick = () => showImage(currentIndex + 1);
if (closeBtn) closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; }
