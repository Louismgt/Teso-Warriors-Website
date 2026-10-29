/*
 * =========================================================
 * TESO WARRIORS FC
 * OFFICIAL FIXTURE CRESTS
 * =========================================================
 *
 * Uses the EXISTING .match-team-badge circles created by
 * fixtures.js and replaces initials with official club crests.
 *
 * No duplicate badge is created.
 */

document.addEventListener("DOMContentLoaded", () => {
  const teamLogos = {
    "teso warriors fc":
      "images/teso-warriors-crest.png",

    "rupa united fc":
      "images/teams/rupa-united-fc.jpeg",

    "ateker fc":
      "images/teams/ateker-fc.jpeg",

    "myda fc":
      "images/teams/myda-fc.jpeg",

    "kamet united fc":
      "images/teams/kamet-united-fc.jpeg",

    "tapoh fc":
      "images/teams/tapoh-fc.jpeg",

    "kumi united fc":
      "images/teams/kumi-united-fc.jpeg",

    "obule earthquake fc":
      "images/teams/obule-earthquake-fc.jpeg",

    "soroti thunders fc":
      "images/teams/soroti-thunders-fc.jpeg",

    "kadami united fc":
      "images/teams/kadami-united-fc.jpeg",

    "kapchorwa vikings fc":
      "images/teams/kapchorwa-vikings-fc.jpeg",

    "tita sc":
      "images/teams/tita-sc.jpeg",
  };

  /*
   * =========================================================
   * STYLES
   * =========================================================
   */

  const style = document.createElement("style");

  style.textContent = `
    /*
     * Preserve the original circular fixture badge.
     * Only control the image placed inside it.
     */

    .match-team-badge {
      overflow: hidden !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    .match-team-badge .fixture-club-crest {
      display: block;

      width: 88%;
      height: 88%;

      max-width: none;

      object-fit: contain;

      border-radius: 50%;

      background: transparent;
    }

    /*
     * Teso crest has transparent space around the artwork,
     * so allow it to use slightly more of the circle.
     */

    .match-team-badge
    .fixture-club-crest.teso-crest {
      width: 100%;
      height: 100%;
      transform: scale(1.22);
      transform-origin: center;
    }

    /*
     * Opponent JPEGs often contain white backgrounds.
     * Circular clipping keeps them visually clean.
     */

    .match-team-badge
    .fixture-club-crest.opponent-crest {
      width: 92%;
      height: 92%;

      border-radius: 50%;
    }

    @media (max-width: 680px) {
      .match-team-badge
      .fixture-club-crest {
        width: 90%;
        height: 90%;
      }
    }
  `;

  document.head.appendChild(style);

  /*
   * =========================================================
   * HELPERS
   * =========================================================
   */

  function normalize(value) {
    return String(value ?? "")
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();
  }

  const knownTeams =
    Object.keys(teamLogos)
      .sort(
        (a, b) =>
          b.length - a.length,
      );

  function findTeamForBadge(badge) {
    let element = badge.parentElement;

    /*
     * Search the closest few parent containers.
     * The nearest team block should contain only one
     * club name.
     */

    for (
      let depth = 0;
      element && depth < 5;
      depth += 1
    ) {
      const text =
        normalize(element.textContent);

      const matches =
        knownTeams.filter(
          (team) =>
            text.includes(team),
        );

      if (matches.length === 1) {
        return matches[0];
      }

      element =
        element.parentElement;
    }

    return null;
  }

  function createCrest(
    teamName,
    logoPath,
  ) {
    const image =
      document.createElement("img");

    image.src = logoPath;

    image.alt =
      `${teamName} crest`;

    image.className =
      "fixture-club-crest";

    if (
      teamName ===
      "teso warriors fc"
    ) {
      image.classList.add(
        "teso-crest",
      );
    } else {
      image.classList.add(
        "opponent-crest",
      );
    }

    image.loading = "eager";

    return image;
  }

  /*
   * =========================================================
   * REPLACE INITIALS WITH CRESTS
   * =========================================================
   */

  function applyOfficialCrests() {
    const badges =
      document.querySelectorAll(
        ".match-team-badge",
      );

    badges.forEach((badge) => {
      const teamName =
        findTeamForBadge(badge);

      if (!teamName) {
        return;
      }

      const logoPath =
        teamLogos[teamName];

      if (!logoPath) {
        return;
      }

      /*
       * Do nothing if the correct image
       * is already installed.
       */

      if (
        badge.querySelector(
          ".fixture-club-crest",
        )
      ) {
        return;
      }

      const crest =
        createCrest(
          teamName,
          logoPath,
        );

      crest.onerror = () => {
        /*
         * If an image ever fails,
         * leave the original badge logic
         * available after reload.
         */
        crest.remove();
      };

      /*
       * Remove RUF / ATK / etc.
       * Keep the ORIGINAL circular container.
       */

      badge.innerHTML = "";

      badge.appendChild(crest);
    });

    /*
     * Remove anything created by our
     * earlier duplicate-badge experiment.
     */

    document
      .querySelectorAll(
        ".twf-team-crest-frame",
      )
      .forEach(
        (element) =>
          element.remove(),
      );

    document
      .querySelectorAll(
        ".twf-team-with-crest",
      )
      .forEach((element) => {
        element.classList.remove(
          "twf-team-with-crest",
          "twf-team-right",
        );
      });
  }

  /*
   * =========================================================
   * WAIT FOR SUPABASE FIXTURE RENDER
   * =========================================================
   */

  applyOfficialCrests();

  const targets = [
    document.getElementById(
      "next-match-card",
    ),

    document.getElementById(
      "fixtures-list",
    ),
  ].filter(Boolean);

  const observer =
    new MutationObserver(() => {
      window.requestAnimationFrame(
        applyOfficialCrests,
      );
    });

  targets.forEach((target) => {
    observer.observe(
      target,
      {
        childList: true,
        subtree: true,
      },
    );
  });

  setTimeout(
    applyOfficialCrests,
    300,
  );

  setTimeout(
    applyOfficialCrests,
    800,
  );

  setTimeout(
    applyOfficialCrests,
    1500,
  );
});
