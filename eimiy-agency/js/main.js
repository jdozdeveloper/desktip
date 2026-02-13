/* ==================== MENU SHOW Y HIDDEN ==================== */
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* ===== MENU SHOW ===== */
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* ===== MENU HIDDEN ===== */
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/* ==================== REMOVE MENU MOBILE ==================== */
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/* ==================== CHANGE BACKGROUND HEADER ==================== */
function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 80 viewport height, add the scroll-header class
  if (this.scrollY >= 80) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/* ==================== SCROLL SECTIONS ACTIVE LINK ==================== */
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__list a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__list a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
// Note: This function requires selectors that match exactly structure.
// Simplified version for this single page:
// We rely on simple click active state or remove this if we want scroll spy.
// For now, let's keep it simple and just use click action to close menu.

/* ==================== SHOW SCROLL UP ==================== */
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/* ==================== ANIMATION ON SCROLL ==================== */
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translate(0, 0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const fadeUpElements = document.querySelectorAll(".hidden-fade-up");
const fadeLeftElements = document.querySelectorAll(".hidden-fade-left");
const fadeRightElements = document.querySelectorAll(".hidden-fade-right");
const staggerElements = document.querySelectorAll(".hidden-stagger");

fadeUpElements.forEach((el) => observer.observe(el));
fadeLeftElements.forEach((el) => observer.observe(el));
fadeRightElements.forEach((el) => observer.observe(el));
staggerElements.forEach((el, index) => {
  // Add slight delay for stagger effect based on index if siblings
  // But CSS transition delay is cleaner or JS delay.
  // Let's use simple observer for now, can enhance with delay in JS
  observer.observe(el);
});

/* ==================== FORM SUBMISSION ==================== */
const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("contact-message");
const btnLoading = document.querySelector(".btn__loading");
const btnSuccess = document.querySelector(".btn__success");
const btnText = document.querySelector(".btn__text");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Show Loading
    btnText.style.display = "none";
    btnLoading.style.display = "block";

    // Simulate API call
    setTimeout(() => {
      btnLoading.style.display = "none";
      btnSuccess.style.display = "block";

      contactMessage.textContent =
        "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.";
      contactMessage.style.color = "var(--primary)";
      contactMessage.style.marginTop = "1rem";

      // Reset form
      contactForm.reset();

      // Reset button after 3 seconds
      setTimeout(() => {
        btnSuccess.style.display = "none";
        btnText.style.display = "block";
        contactMessage.textContent = "";
      }, 5000);
    }, 2000);
  });
}
