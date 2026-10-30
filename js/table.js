/*
 * =========================================================
 * TESO WARRIORS FC
 * OFFICIAL LEAGUE TABLE
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", async () => {
  const supabase = window.twfSupabase;
  const tableBody = document.querySelector("#league-table-body");

  if (!supabase) {
    console.error("Supabase connection not found.");
    return;
  }

  if (!tableBody) {
    console.error("League table body not found.");
    return;
  }

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

  function formatGoalDifference(value) {
    const number = Number(value ?? 0);

    if (number > 0) {
      return `+${number}`;
    }

    return String(number);
  }

  function goalDifferenceClass(value) {
    const number = Number(value ?? 0);

    if (number > 0) {
      return "positive-gd";
    }

    if (number < 0) {
      return "negative-gd";
    }

    return "";
  }

  function getInitials(teamName) {
    const words = String(teamName || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (words.length === 0) {
      return "?";
    }

    if (words.length === 1) {
      return words[0]
        .slice(0, 2)
        .toUpperCase();
    }

    return words
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  }

  function getRowClass(team) {
    const teamName = String(team.team_name || "")
      .trim()
      .toLowerCase();

    if (teamName === "teso warriors fc") {
      return "warriors-row";
    }

    if (Number(team.position) >= 10) {
      return "relegation-row";
    }

    return "";
  }

  function getTeamBadge(teamName) {
    const normalized = String(teamName || "")
      .trim()
      .toLowerCase();

    if (normalized === "teso warriors fc") {
      return `
        <div class="standing-club-badge">
          <img
            src="images/teso-warriors-crest.png"
            alt="Teso Warriors FC crest"
          />
        </div>
      `;
    }

    if (normalized === "rupa united fc") {
      return `
        <div class="standing-club-badge">
          <img
            src="images/teams/rupa-united-fc.jpeg"
            alt="Rupa United FC crest"
          />
        </div>
      `;
    }

    return `
      <div class="standing-club-badge">
        ${escapeHTML(getInitials(teamName))}
      </div>
    `;
  }

  /* =========================================================
     RENDER TABLE
     ========================================================= */

  function renderStandings(standings) {
    if (!standings || standings.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="10" class="table-loading">
            Official standings have not yet been published.
          </td>
        </tr>
      `;

      return;
    }

    tableBody.innerHTML = standings
      .map((team) => {
        const isWarriors =
          String(team.team_name || "")
            .trim()
            .toLowerCase() === "teso warriors fc";

        return `
          <tr class="${getRowClass(team)}">

            <td class="position-column">
              <strong>
                ${escapeHTML(team.position)}
              </strong>
            </td>

            <td class="team-column">
              <div class="standing-team">

                ${getTeamBadge(team.team_name)}

                <div class="standing-team-name">
                  <strong>
                    ${escapeHTML(team.team_name)}
                  </strong>

                  ${
                    isWarriors
                      ? `
                        <span>
                          THE WARRIORS
                        </span>
                      `
                      : ""
                  }
                </div>

              </div>
            </td>

            <td>
              ${escapeHTML(team.matches_played)}
            </td>

            <td>
              ${escapeHTML(team.wins)}
            </td>

            <td>
              ${escapeHTML(team.draws)}
            </td>

            <td>
              ${escapeHTML(team.losses)}
            </td>

            <td>
              ${escapeHTML(team.goals_for)}
            </td>

            <td>
              ${escapeHTML(team.goals_against)}
            </td>

            <td class="${goalDifferenceClass(team.goal_difference)}">
              ${formatGoalDifference(team.goal_difference)}
            </td>

            <td class="points">
              ${escapeHTML(team.points)}
            </td>

          </tr>
        `;
      })
      .join("");
  }

  /* =========================================================
     LOAD OFFICIAL STANDINGS
     ========================================================= */

  async function loadStandings() {
    try {
      const { data, error } = await supabase
        .from("league_standings")
        .select(
          `
            position,
            team_name,
            matches_played,
            wins,
            draws,
            losses,
            goals_for,
            goals_against,
            goal_difference,
            points,
            season,
            competition
          `,
        )
        .eq(
          "season",
          "2026/27",
        )
        .eq(
          "competition",
          "North East Regional League",
        )
        .order(
          "position",
          {
            ascending: true,
          },
        );

      if (error) {
        throw error;
      }

      renderStandings(data);
    } catch (error) {
      console.error(
        "Unable to load league standings:",
        error,
      );

      tableBody.innerHTML = `
        <tr>
          <td colspan="10" class="table-loading">
            Unable to load the league table.
            Please refresh the page or try again shortly.
          </td>
        </tr>
      `;
    }
  }

  await loadStandings();
});
