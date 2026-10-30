/*
 * =========================================================
 * TESO WARRIORS FC
 * RESULTS PAGE
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", async () => {
  const supabase = window.twfSupabase;

  if (!supabase) {
    console.error("Supabase connection not found.");
    return;
  }

  const matchesPlayedElement = document.querySelector("#matches-played");

  const winsElement = document.querySelector("#wins");

  const drawsElement = document.querySelector("#draws");

  const lossesElement = document.querySelector("#losses");

  const pointsElement = document.querySelector("#points");

  const resultsList = document.querySelector("#results-list");

  /*
   * =========================================================
   * HELPERS
   * =========================================================
   */

  function escapeHTML(value) {
    if (value === null || value === undefined) {
      return "";
    }

    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatMatchDate(dateString) {
    if (!dateString) {
      return {
        dayMonth: "TBC",
        year: "",
      };
    }

    const date = new Date(`${dateString}T00:00:00`);

    return {
      dayMonth: date
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        })
        .toUpperCase(),

      year: date.getFullYear(),
    };
  }

  function getOpponentLogo(opponent) {
    const normalized = String(opponent || "")
      .trim()
      .toLowerCase();

    if (normalized.includes("rupa")) {
      return "images/teams/rupa-united-fc.jpeg";
    }

    return "";
  }

  function buildScorerText(notes) {
    if (!notes) {
      return "";
    }

    const scorerMarker = notes.toLowerCase().indexOf("scorers:");

    if (scorerMarker === -1) {
      return escapeHTML(notes);
    }

    const scorers = notes.slice(scorerMarker + 8).trim();

    return escapeHTML(scorers);
  }

  /*
   * =========================================================
   * LOAD SEASON RECORD
   * =========================================================
   */

  async function loadSeasonRecord() {
    try {
      const { data, error } = await supabase
        .from("season_record")
        .select(
          `
              matches_played,
              wins,
              draws,
              losses,
              points
            `,
        )
        .single();

      if (error) {
        throw error;
      }

      if (matchesPlayedElement) {
        matchesPlayedElement.textContent = data?.matches_played ?? 0;
      }

      if (winsElement) {
        winsElement.textContent = data?.wins ?? 0;
      }

      if (drawsElement) {
        drawsElement.textContent = data?.draws ?? 0;
      }

      if (lossesElement) {
        lossesElement.textContent = data?.losses ?? 0;
      }

      if (pointsElement) {
        pointsElement.textContent = data?.points ?? 0;
      }
    } catch (error) {
      console.error("Unable to load season record:", error);
    }
  }

  /*
   * =========================================================
   * RENDER RESULTS
   * =========================================================
   */

  function renderResults(results) {
    if (!resultsList) {
      return;
    }

    if (!results || results.length === 0) {
      resultsList.innerHTML = `
        <article class="results-empty">
          <span>MATCH CENTRE</span>

          <h3>No Results Recorded Yet.</h3>

          <p>
            Official results will appear here once
            competitive matches have been completed.
          </p>
        </article>
      `;

      return;
    }

    resultsList.innerHTML = results
      .map((result) => {
        const date = formatMatchDate(result.match_date);

        const opponent = escapeHTML(result.opponent);

        const competition = escapeHTML(result.competition || "Regional League");

        const venue = escapeHTML(result.venue || "Venue TBC");

        const tesoScore = Number(result.teso_warriors_score ?? 0);

        const opponentScore = Number(result.opponent_score ?? 0);

        const homeAway = String(result.home_away || "home").toLowerCase();

        const opponentLogo = getOpponentLogo(result.opponent);

        const scorerText = buildScorerText(result.notes);

        let firstTeamName = "Teso Warriors FC";

        let secondTeamName = opponent;

        let firstTeamScore = tesoScore;

        let secondTeamScore = opponentScore;

        let firstTeamLogo = "images/teso-warriors-crest.png";

        let secondTeamLogo = opponentLogo;

        if (homeAway === "away") {
          firstTeamName = opponent;

          secondTeamName = "Teso Warriors FC";

          firstTeamScore = opponentScore;

          secondTeamScore = tesoScore;

          firstTeamLogo = opponentLogo;

          secondTeamLogo = "images/teso-warriors-crest.png";
        }

        const firstLogoHTML = firstTeamLogo
          ? `
                <span class="result-team-crest">
                  <img
                    src="${escapeHTML(firstTeamLogo)}"
                    alt="${escapeHTML(firstTeamName)} crest"
                  />
                </span>
              `
          : "";

        const secondLogoHTML = secondTeamLogo
          ? `
                <span class="result-team-crest">
                  <img
                    src="${escapeHTML(secondTeamLogo)}"
                    alt="${escapeHTML(secondTeamName)} crest"
                  />
                </span>
              `
          : "";

        const scorerHTML = scorerText
          ? `
                <div class="result-scorers">
                  <strong>
                    Teso Warriors Scorers
                  </strong>

                  <br />

                  ${scorerText}
                </div>
              `
          : "";

        return `
            <article class="result-card">
              <div class="result-date">
                <span>
                  ${escapeHTML(date.dayMonth)}
                </span>

                <small>
                  ${escapeHTML(date.year)}
                </small>
              </div>

              <div class="result-competition">
                <p>
                  ${competition}
                </p>

                <span>
                  2026/27 SEASON
                </span>
              </div>

              <div class="result-match-area">
                <div class="result-teams">
                  <div class="result-team">
                    ${firstLogoHTML}

                    <strong>
                      ${escapeHTML(firstTeamName)}
                    </strong>
                  </div>

                  <div class="result-score">
                    <strong>
                      ${firstTeamScore}
                      -
                      ${secondTeamScore}
                    </strong>

                    <span>
                      FULL TIME
                    </span>
                  </div>

                  <div class="result-team">
                    ${secondLogoHTML}

                    <strong>
                      ${escapeHTML(secondTeamName)}
                    </strong>
                  </div>
                </div>

                ${scorerHTML}
              </div>

              <div class="result-venue">
                <span>
                  VENUE
                </span>

                <strong>
                  ${venue}
                </strong>
              </div>
            </article>
          `;
      })
      .join("");
  }

  /*
   * =========================================================
   * LOAD RESULTS
   * =========================================================
   */

  async function loadResults() {
    if (!resultsList) {
      return;
    }

    try {
      const { data, error } = await supabase
        .from("results")
        .select(
          `
              id,
              fixture_id,
              competition,
              opponent,
              match_date,
              venue,
              home_away,
              teso_warriors_score,
              opponent_score,
              notes
            `,
        )
        .order("match_date", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      renderResults(data);
    } catch (error) {
      console.error("Unable to load results:", error);

      resultsList.innerHTML = `
        <article class="results-empty">
          <span>MATCH CENTRE</span>

          <h3>Unable to Load Results.</h3>

          <p>
            Please refresh the page or try again shortly.
          </p>
        </article>
      `;
    }
  }

  /*
   * =========================================================
   * INITIAL LOAD
   * =========================================================
   */

  await Promise.all([loadSeasonRecord(), loadResults()]);
});
