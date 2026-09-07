document.addEventListener("DOMContentLoaded", () => {
  /*
   * =========================================================
   * TESO WARRIORS FC
   * MAIN JAVASCRIPT
   * =========================================================
   */

  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */

  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".main-nav");

  if (header && nav) {
    const menuButton = document.createElement("button");

    menuButton.className = "mobile-menu-button";
    menuButton.type = "button";
    menuButton.setAttribute("aria-label", "Open navigation");
    menuButton.setAttribute("aria-expanded", "false");

    menuButton.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;

    header.querySelector(".container").appendChild(menuButton);

    menuButton.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation",
      );
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("nav-open");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  /* =========================================================
     ACTIVE NAVIGATION LINK
     ========================================================= */

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".main-nav a").forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  /* =========================================================
     CONTACT FORM
     ========================================================= */

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const submitButton = contactForm.querySelector('button[type="submit"]');

      if (!submitButton) {
        return;
      }

      const originalText = submitButton.textContent;

      submitButton.textContent = "ENQUIRY READY";
      submitButton.disabled = true;

      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 2500);
    });
  }
});
