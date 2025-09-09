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

// ---------- Modal gallery logic (فقط در صفحه Projects) ----------
if (document.body.classList.contains("projects-page")) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentAlbum = [];
  let currentIndex = 0;
  

  // همیشه ابتدای صفحه مودال بسته باشه
  if (modal) modal.style.display = "none";

  // کلیک روی کارت پروژه
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", (e) => {
      e.preventDefault(); // جلوگیری از پرش

      const images = card.dataset.images ? card.dataset.images.split(",") : [];
      const bg = card.dataset.bg; // تصویر بک‌گراند آلبوم

      if (images.length > 0) {
        currentAlbum = images;
        currentIndex = 0;

        modal.style.display = "flex"; // فقط اینجا باز بشه
        if (bg) modal.style.backgroundImage = `url(${bg})`;
        modalImg.src = currentAlbum[currentIndex];
        captionText.innerHTML = card.querySelector("h3")?.innerText || "";
      }
    });
  });

  // نمایش تصویر خاص
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

  // بستن با کلیک بیرون
  window.onclick = e => { if (e.target === modal) modal.style.display = "none"; }
}
