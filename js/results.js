/*
 * =========================================================
 * TESO WARRIORS FC
 * DYNAMIC RESULTS
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", async () => {
  const supabase = window.twfSupabase;

  const emptyCard =
    document.querySelector(".result-card-empty");

  if (!supabase || !emptyCard) {
    console.error(
      "Results page could not initialize.",
    );
    return;
  }

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
    .result-card-live {
      display: grid !important;
      grid-template-columns:
        120px
        220px
        minmax(520px, 1fr)
        220px !important;

      align-items: center !important;

      gap: 28px !important;

      min-height: 175px;

      padding: 28px 36px !important;

      margin-bottom: 22px;
    }

    .result-live-matchup {
      display: grid;

      grid-template-columns:
        minmax(0, 1fr)
        105px
        minmax(0, 1fr);

      align-items: center;

      gap: 16px;
    }

    .result-live-club {
      display: flex;
      align-items: center;
      gap: 13px;

      min-width: 0;
    }

    .result-live-club.away {
      justify-content: flex-end;
      text-align: right;
    }

    .result-live-club strong {
      font-size: 1rem;
      line-height: 1.3;
    }

    .result-live-crest {
      width: 58px;
      height: 58px;

      flex: 0 0 58px;

      display: flex;
      align-items: center;
      justify-content: center;

      overflow: hidden;

      border-radius: 50%;

      background: #ffffff;

      border:
        1px solid
        rgba(14, 16, 18, 0.14);
    }

    .result-live-crest img {
      display: block;

      width: 92%;
      height: 92%;

      object-fit: contain;
    }

    .result-live-crest img.teso {
      width: 100%;
      height: 100%;

      transform: scale(1.18);
    }

    .result-live-score {
      text-align: center;
    }

    .result-live-score strong {
      display: block;

      color: #101214;

      font-size: 1.8rem;
      line-height: 1;
    }

    .result-live-score span {
      display: block;

      margin-top: 8px;

      color: #747c85;

      font-size: 0.58rem;
      font-weight: 900;
      letter-spacing: 0.12em;

      text-transform: uppercase;
    }

    .result-live-venue {
      text-align: right;
    }

    .result-live-venue span {
      display: block;

      margin-bottom: 8px;

      color: #777f88;

      font-size: 0.62rem;
      font-weight: 900;
      letter-spacing: 0.12em;

      text-transform: uppercase;
    }

    .result-live-venue strong {
      font-size: 0.9rem;
      line-height: 1.4;
    }

    @media (max-width: 1100px) {
      .result-card-live {
        grid-template-columns:
          110px
          1fr !important;
      }

      .result-live-matchup,
      .result-live-venue {
        grid-column: 1 / -1;
      }

      .result-live-venue {
        text-align: left;
      }
    }

    @media (max-width: 680px) {
      .result-card-live {
        display: block !important;

        padding:
          28px 22px !important;
      }

      .result-card-live > * + * {
        margin-top: 24px;
      }

      .result-live-matchup {
        grid-template-columns: 1fr;

        gap: 18px;
      }

      .result-live-club,
      .result-live-club.away {
        justify-content: center;

        text-align: center;
      }

      .result-live-score {
        padding: 5px 0;
      }

      .result-live-venue,
      .result-card-live
      .result-date,
      .result-card-live
      .result-competition {
        text-align: center;
      }
    }
  `;

  document.head.appendChild(style);

  /*
   * =========================================================
   * HELPERS
   * =========================================================
   */

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalize(value) {
    return String(value ?? "")
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();
  }

  function formatDate(dateString) {
    if (!dateString) {
      return {
        main: "DATE",
        year: "",
      };
    }

    const date =
      new Date(
        `${dateString}T12:00:00`,
      );

    return {
      main:
        new Intl.DateTimeFormat(
          "en-GB",
          {
            day: "2-digit",
            month: "short",
          },
        )
          .format(date)
          .toUpperCase(),

      year:
        String(
          date.getFullYear(),
        ),
    };
  }

  function crest(teamName) {
    const key =
      normalize(teamName);

    const logo =
      teamLogos[key];

    if (!logo) {
      return "";
    }

    const tesoClass =
      key === "teso warriors fc"
        ? "teso"
        : "";

    return `
      <span class="result-live-crest">
        <img
          src="${escapeHTML(logo)}"
          alt="${escapeHTML(teamName)} crest"
          class="${tesoClass}"
        />
      </span>
    `;
  }

  function getMatch(result) {
    const isAway =
      normalize(result.home_away) ===
      "away";

    if (isAway) {
      return {
        homeName:
          result.opponent,

        awayName:
          "Teso Warriors FC",

        homeScore:
          result.opponent_score,

        awayScore:
          result.teso_warriors_score,
      };
    }

    return {
      homeName:
        "Teso Warriors FC",

      awayName:
        result.opponent,

      homeScore:
        result.teso_warriors_score,

      awayScore:
        result.opponent_score,
    };
  }

  /*
   * =========================================================
   * RENDER RESULT
   * =========================================================
   */

  function renderResult(result) {
    const date =
      formatDate(
        result.match_date,
      );

    const match =
      getMatch(result);

    return `
      <article
        class="result-card result-card-live"
      >
        <div class="result-date">
          <span>
            ${escapeHTML(date.main)}
          </span>

          <small>
            ${escapeHTML(date.year)}
          </small>
        </div>

        <div class="result-competition">
          <p>
            ${escapeHTML(
              result.competition ||
              "NERFA REGIONAL LEAGUE",
            )}
          </p>

          <span>
            2026/27 SEASON
          </span>
        </div>

        <div class="result-live-matchup">

          <div class="result-live-club">
            ${crest(match.homeName)}

            <strong>
              ${escapeHTML(
                match.homeName,
              )}
            </strong>
          </div>

          <div class="result-live-score">
            <strong>
              ${escapeHTML(
                match.homeScore,
              )}
              -
              ${escapeHTML(
                match.awayScore,
              )}
            </strong>

            <span>
              Full Time
            </span>
          </div>

          <div
            class="
              result-live-club
              away
            "
          >
            <strong>
              ${escapeHTML(
                match.awayName,
              )}
            </strong>

            ${crest(match.awayName)}
          </div>

        </div>

        <div class="result-live-venue">
          <span>
            Venue
          </span>

          <strong>
            ${escapeHTML(
              result.venue ||
              "Venue TBC",
            )}
          </strong>
        </div>
      </article>
    `;
  }

  /*
   * =========================================================
   * LOAD COMPLETED RESULTS
   * =========================================================
   */

  try {
    const {
      data,
      error,
    } = await supabase
      .from("results")
      .select(`
        id,
        fixture_id,
        competition,
        opponent,
        match_date,
        venue,
        home_away,
        teso_warriors_score,
        opponent_score,
        notes,
        created_at
      `)
      .not(
        "teso_warriors_score",
        "is",
        null,
      )
      .not(
        "opponent_score",
        "is",
        null,
      )
      .order(
        "match_date",
        {
          ascending: false,
        },
      );

    if (error) {
      throw error;
    }

    if (!data?.length) {
      /*
       * No completed match yet.
       * Keep our existing
       * "NO RESULTS YET" card.
       */
      return;
    }

    const html =
      data
        .map(renderResult)
        .join("");

    emptyCard.insertAdjacentHTML(
      "beforebegin",
      html,
    );

    /*
     * Real results now exist,
     * so remove the placeholder.
     */

    emptyCard.remove();

  } catch (error) {
    console.error(
      "Results loading error:",
      error,
    );
  }
});
