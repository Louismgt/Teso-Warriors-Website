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
    const existingButton = document.querySelector(".mobile-menu-button");

    if (!existingButton) {
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

      const container = header.querySelector(".container");

      if (container) {
        container.appendChild(menuButton);
      }

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
  }

  /* =========================================================
     ACTIVE NAVIGATION LINK
     ========================================================= */

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".main-nav a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  /* =========================================================
     MATCHDAY FOOTBALL ANIMATION
     ========================================================= */

  const hero = document.querySelector("main > section:first-of-type");

  if (hero && !hero.querySelector(".twf-matchday-motion")) {
    hero.classList.add("twf-motion-host");

    const motion = document.createElement("div");

    motion.className = "twf-matchday-motion";

    motion.setAttribute("aria-hidden", "true");

    motion.innerHTML = `
      <svg
        class="twf-matchday-svg"
        viewBox="0 0 850 500"
        role="presentation"
      >

        <!-- FOOTBALL PITCH -->

        <path
          class="twf-field-line"
          d="
            M 80 405
            L 770 405
            L 650 95
            L 200 95
            Z
          "
        />

        <path
          class="twf-field-soft"
          d="
            M 425 405
            L 425 95
          "
        />

        <ellipse
          class="twf-field-soft"
          cx="425"
          cy="255"
          rx="92"
          ry="45"
        />

        <!-- GOAL -->

        <path
          class="twf-goal"
          d="
            M 638 170
            L 770 170
            L 790 260
            L 655 260
            Z
          "
        />

        <path
          class="twf-net"
          d="
            M 655 185
            L 778 185

            M 658 205
            L 782 205

            M 662 225
            L 786 225

            M 666 245
            L 789 245

            M 680 170
            L 690 260

            M 715 170
            L 725 260

            M 750 170
            L 760 260
          "
        />

        <!-- BALL FLIGHT -->

        <path
          id="twf-shot-path"
          class="twf-ball-path"
          d="
            M 245 340
            C 370 260,
              510 150,
              710 215
          "
        />

        <!-- ATTACKER -->

        <g class="twf-attacker">

          <circle
            class="
              twf-player-head
              twf-player-red-head
            "
            cx="230"
            cy="216"
            r="14"
          />

          <path
            class="
              twf-player
              twf-player-red
            "
            d="
              M 230 235
              L 245 285

              M 240 250
              L 200 270

              M 243 252
              L 280 236

              M 245 285
              L 214 330

              M 245 285
              L 287 315
            "
          />

          <!-- TURF PARTICLES -->

          <circle
            class="twf-turf"
            cx="211"
            cy="334"
            r="3"
          />

          <circle
            class="twf-turf"
            cx="199"
            cy="340"
            r="2"
            style="animation-delay:.2s"
          />

          <circle
            class="twf-turf"
            cx="220"
            cy="345"
            r="2"
            style="animation-delay:.4s"
          />

        </g>

        <!-- SUPPORTING RUNNER -->

        <g class="twf-runner">

          <circle
            class="twf-player-head"
            cx="460"
            cy="185"
            r="11"
          />

          <path
            class="twf-player"
            d="
              M 460 200
              L 473 240

              M 467 214
              L 440 232

              M 469 214
              L 495 200

              M 473 240
              L 448 272

              M 473 240
              L 507 266
            "
          />

        </g>

        <!-- DEFENDER -->

        <g opacity=".56">

          <circle
            class="twf-player-head"
            cx="570"
            cy="270"
            r="10"
          />

          <path
            class="twf-player"
            d="
              M 570 284
              L 570 325

              M 570 297
              L 543 315

              M 570 297
              L 594 315

              M 570 325
              L 548 355

              M 570 325
              L 596 355
            "
          />

        </g>

        <!-- MOVING FOOTBALL -->

        <g>
          <circle
            class="twf-ball"
            cx="0"
            cy="0"
            r="9"
          >

            <animateMotion
              dur="4.6s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath
                href="#twf-shot-path"
              />
            </animateMotion>

          </circle>
        </g>

      </svg>
    `;

    hero.prepend(motion);
  }

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
