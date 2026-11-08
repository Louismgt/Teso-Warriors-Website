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

  const matchesPlayedElement =
    document.querySelector("#matches-played");

  const winsElement =
    document.querySelector("#wins");

  const drawsElement =
    document.querySelector("#draws");

  const lossesElement =
    document.querySelector("#losses");

  const pointsElement =
    document.querySelector("#points");

  const resultsList =
    document.querySelector("#results-list");

  /* =========================================================
     HELPERS
     ========================================================= */

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

    if (normalized.includes("ateker")) {
      const possibleAtekerLogos = [
        "images/teams/ateker-fc.png",
        "images/teams/ateker-fc.jpeg",
        "images/teams/ateker-fc.jpg"
      ];

      return possibleAtekerLogos[0];
    }

    return "";
  }

  function buildScorerText(notes) {
    if (!notes) {
      return "";
    }

    const marker =
      notes.toLowerCase().indexOf("scorers:");

    if (marker === -1) {
      return escapeHTML(notes);
    }

    return escapeHTML(
      notes.slice(marker + 8).trim(),
    );
  }

  /* =========================================================
     SEASON RECORD
     ========================================================= */

  async function loadSeasonRecord() {
    try {
      const { data, error } =
        await supabase
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

      const forcedSeasonRecord = {
        matches_played: 2,
        wins: 2,
        draws: 0,
        losses: 0,
        points: 6
      };

      if (matchesPlayedElement) {
        matchesPlayedElement.textContent =
          forcedSeasonRecord.matches_played;
      }

      if (winsElement) {
        winsElement.textContent =
          forcedSeasonRecord.wins;
      }

      if (drawsElement) {
        drawsElement.textContent =
          forcedSeasonRecord.draws;
      }

      if (lossesElement) {
        lossesElement.textContent =
          forcedSeasonRecord.losses;
      }

      if (pointsElement) {
        pointsElement.textContent =
          forcedSeasonRecord.points;
      }
    } catch (error) {
      console.error(
        "Unable to load season record:",
        error,
      );
    }
  }

  /* =========================================================
     RESULTS
     ========================================================= */

  
  /* TWF-FORCED-ATEKER-RESULT-START */

  const officialAtekerResult = {
    id: "forced-ateker-2026-11-07",
    fixture_id: null,
    competition: "North East Regional League",
    opponent: "Ateker FC",
    match_date: "2026-11-07",
    venue: "Moroto Booma Grounds, Moroto",
    home_away: "away",
    teso_warriors_score: 1,
    opponent_score: 0,
    notes: ""
  };

  /* TWF-FORCED-ATEKER-RESULT-END */

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
        const date =
          formatMatchDate(result.match_date);

        const opponent =
          escapeHTML(result.opponent);

        const competition =
          escapeHTML(
            result.competition ||
              "Regional League",
          );

        const venue =
          escapeHTML(
            result.venue ||
              "Venue TBC",
          );

        const tesoScore =
          Number(
            result.teso_warriors_score ?? 0,
          );

        const opponentScore =
          Number(
            result.opponent_score ?? 0,
          );

        const homeAway =
          String(
            result.home_away || "home",
          )
            .trim()
            .toLowerCase();

        const opponentLogo =
          getOpponentLogo(
            result.opponent,
          );

        const scorers =
          buildScorerText(
            result.notes,
          );

        const tesoTeamHTML = `
          <div class="result-team">
            <span class="result-team-crest">
              <img
                src="images/teso-warriors-crest.png"
                alt="Teso Warriors FC crest"
              />
            </span>

            <strong>
              Teso Warriors FC
            </strong>
          </div>
        `;

        const opponentTeamHTML = `
          <div class="result-team">
            ${
              opponentLogo
                ? `
                  <span class="result-team-crest">
                    <img
                      src="${escapeHTML(opponentLogo)}"
                      alt="${opponent} crest"
                    />
                  </span>
                `
                : ""
            }

            <strong>
              ${opponent}
            </strong>
          </div>
        `;

        let leftTeam =
          tesoTeamHTML;

        let rightTeam =
          opponentTeamHTML;

        let leftScore =
          tesoScore;

        let rightScore =
          opponentScore;

        if (homeAway === "away") {
          leftTeam =
            opponentTeamHTML;

          rightTeam =
            tesoTeamHTML;

          leftScore =
            opponentScore;

          rightScore =
            tesoScore;
        }

        const scorersHTML =
          scorers
            ? `
              <div class="result-scorers">
                <strong>
                  Teso Warriors Scorers
                </strong>

                <br />

                ${scorers}
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

                ${leftTeam}

                <div class="result-score">
                  <strong>
                    ${leftScore} - ${rightScore}
                  </strong>

                  <span>
                    FULL TIME
                  </span>
                </div>

                ${rightTeam}

              </div>

              ${scorersHTML}
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

  async function loadResults() {
    if (!resultsList) {
      return;
    }

    try {
      const { data, error } =
        await supabase
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
          .order(
            "match_date",
            {
              ascending: false,
            },
          );

      if (error) {
        throw error;
      }

      const existingResults = Array.isArray(data) ? data : [];

      const alreadyHasAtekerResult = existingResults.some((result) => {
        return (
          String(result.opponent || "").trim().toLowerCase() === "ateker fc" &&
          String(result.match_date || "") === "2026-11-07" &&
          Number(result.teso_warriors_score) === 1 &&
          Number(result.opponent_score) === 0
        );
      });

      const finalResults = alreadyHasAtekerResult
        ? existingResults
        : [officialAtekerResult, ...existingResults];

      finalResults.sort((a, b) => {
        return String(b.match_date || "").localeCompare(
          String(a.match_date || "")
        );
      });

      renderResults(finalResults);
    } catch (error) {
      console.error(
        "Unable to load results:",
        error,
      );

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

  /* =========================================================
     INITIAL LOAD
     ========================================================= */

  await Promise.all([
    loadSeasonRecord(),
    loadResults(),
  ]);
});
