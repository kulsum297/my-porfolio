// ==========================================
// 1. Mobile navigation menu
// ==========================================
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

// Close the mobile menu after a navigation link is selected.
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ==========================================
// 2. Typing effect in the hero section
// ==========================================
const typedRole = document.querySelector("#typedRole");
const roles = ["Aspiring AI Professional", "Web Design Learner", "AI Content Creator"];
let roleIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (deleting) {
    letterIndex--;
  } else {
    letterIndex++;
  }

  typedRole.textContent = currentRole.substring(0, letterIndex);

  let delay = deleting ? 45 : 90;

  if (!deleting && letterIndex === currentRole.length) {
    deleting = true;
    delay = 1300; // Pause when a full title is visible.
  } else if (deleting && letterIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 350;
  }

  window.setTimeout(typeRole, delay);
}

typeRole();

// ==========================================
// 3. Reveal elements when they enter view
// ==========================================
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  // Fallback for browsers without IntersectionObserver.
  revealElements.forEach((element) => element.classList.add("visible"));
}

// ==========================================
// 4. Project category filter buttons
// ==========================================
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const matchesFilter =
        selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.classList.toggle("is-hidden", !matchesFilter);
    });
  });
});

// ==========================================
// 5. Contact form: open the visitor's email app
// ==========================================
// This is a front-end demo. A real website needs a back-end or form service
// to send messages without opening the visitor's email application.
const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");
const portfolioEmail = "your.email@example.com"; // Replace with your real email.

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    return;
  }

  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  const emailSubject = encodeURIComponent(`Portfolio contact: ${subject}`);
  const emailBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  formNote.textContent = "Your email app should open with the message prepared.";
  window.location.href = `mailto:${portfolioEmail}?subject=${emailSubject}&body=${emailBody}`;
});

// ==========================================
// 6. Active navigation link and footer year
// ==========================================
document.querySelector("#currentYear").textContent = new Date().getFullYear();

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
}
