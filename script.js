// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

const projectsGrid = document.getElementById("projects-grid");
const projectsToggle = document.getElementById("projects-toggle");

if (projectsGrid && projectsToggle) {
  projectsToggle.addEventListener("click", () => {
    const isExpanded = projectsGrid.classList.toggle("is-collapsed") === false;
    projectsToggle.setAttribute("aria-expanded", String(isExpanded));
    projectsToggle.textContent = isExpanded ? "View less" : "View more projects";
  });
}

// Reveal sections smoothly as they enter the screen
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Highlight the navigation link for the current section
const sections = document.querySelectorAll("main section[id]");
const sectionLinks = document.querySelectorAll(".nav-links a[href^='#']");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sectionLinks.forEach((link) => {
            const matches = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("active", matches);
          });
        }
      });
    },
    { rootMargin: "-25% 0px -60% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const subject = `Portfolio message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const composeUrl = new URL("https://mail.google.com/mail/");

    composeUrl.search = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: "sahanasgowda.29@gmail.com",
      su: subject,
      body,
    }).toString();

    window.open(composeUrl.toString(), "_blank", "noopener,noreferrer");
  });
}

const customCursor = document.querySelector(".custom-cursor");
const customCursorDot = document.querySelector(".custom-cursor-dot");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (customCursor && customCursorDot && finePointer.matches && !reducedMotion.matches) {
  document.documentElement.classList.add("has-custom-cursor");

  document.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;

    const position = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
    customCursor.style.transform = position;
    customCursorDot.style.transform = position;

    const isInteractive = event.target instanceof Element
      && event.target.closest("a, button, input, textarea, select, [role='button']");
    customCursor.classList.toggle("is-hovering", Boolean(isInteractive));
  });

  document.documentElement.addEventListener("pointerleave", () => {
    customCursor.style.opacity = "0";
    customCursorDot.style.opacity = "0";
  });

  document.documentElement.addEventListener("pointerenter", () => {
    customCursor.style.opacity = "";
    customCursorDot.style.opacity = "";
  });
}
