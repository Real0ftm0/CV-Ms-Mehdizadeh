// ---------- Mobile menu toggle ----------
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true" || false;
    navToggle.setAttribute("aria-expanded", !expanded);
    navLinks.classList.toggle("show");
  });
}

// ---------- Year in footer ----------
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ---------- Modal logic ----------
if (document.body.classList.contains("projects-page")) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentAlbum = [];
  let currentIndex = 0;
  

  if (modal) modal.style.display = "none";

  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", (e) => {
      e.preventDefault(); 

      const images = card.dataset.images ? card.dataset.images.split(",") : [];
      const bg = card.dataset.bg;
      if (images.length > 0) {
        currentAlbum = images;
        currentIndex = 0;

        modal.style.display = "flex"; 
        if (bg) modal.style.backgroundImage = `url(${bg})`;
        modalImg.src = currentAlbum[currentIndex];
        captionText.innerHTML = card.querySelector("h3")?.innerText || "";
      }
    });
  });

  function showImage(index) {
    if (currentAlbum.length === 0) return;
    if (index < 0) index = currentAlbum.length - 1;
    if (index >= currentAlbum.length) index = 0;
    currentIndex = index;
    modalImg.src = currentAlbum[currentIndex];
  }

  // دکمه‌ها
  if (prevBtn) prevBtn.onclick = () => showImage(currentIndex - 1);
  if (nextBtn) nextBtn.onclick = () => showImage(currentIndex + 1);
  if (closeBtn) closeBtn.onclick = () => modal.style.display = "none";

  window.onclick = e => { if (e.target === modal) modal.style.display = "none"; }
}
document.querySelectorAll(".award-card").forEach(card => {
  const mainImg = card.querySelector(".award-images img:first-child");
  if (mainImg) {
    mainImg.addEventListener("click", () => {
      currentAlbum = [mainImg.src]; // فقط همین عکس
      currentIndex = 0;

      modal.style.display = "flex";
      modal.style.backgroundImage = "none";
      modalImg.src = currentAlbum[currentIndex];
      captionText.innerHTML = card.querySelector("h3")?.innerText || "";
    });
  }
});
// ---------- Award Modal logic ----------
const awardModal = document.getElementById("award-modal");
const awardModalImg = document.getElementById("award-modal-img");
const awardClose = document.querySelector(".award-close");

document.querySelectorAll("img.open-award").forEach(img => {
  img.addEventListener("click", () => {
  awardModal.style.display = "flex"; // اینجا flex فعال بشه
  awardModalImg.src = img.src;
});

});

if (awardClose) {
  awardClose.onclick = () => awardModal.style.display = "none";
}

window.addEventListener("click", e => {
  if (e.target === awardModal) {
    awardModal.style.display = "none";
  }
});
