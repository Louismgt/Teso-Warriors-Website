/*
 * =========================================================
 * TESO WARRIORS FC
 * LEAGUE TABLE
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

  function getRowClass(team) {
    const name = String(team.team_name || "").toLowerCase();

    if (name === "teso warriors fc") {
      return "table-row-warriors";
    }

    if (Number(team.position) >= 10) {
      return "table-row-relegation";
    }

    return "";
  }

  function renderTable(standings) {
    if (!standings || standings.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="10" class="league-table-empty">
            League standings have not yet been published.
          </td>
        </tr>
      `;

      return;
    }

    tableBody.innerHTML = standings
      .map((team) => {
        return `
          <tr class="${getRowClass(team)}">
            <td class="position-cell">
              ${escapeHTML(team.position)}
            </td>

            <td class="club-cell">
              <strong>
                ${escapeHTML(team.team_name)}
              </strong>
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

            <td>
              ${formatGoalDifference(team.goal_difference)}
            </td>

            <td class="points-cell">
              ${escapeHTML(team.points)}
            </td>
          </tr>
        `;
      })
      .join("");
  }

  async function loadStandings() {
    tableBody.innerHTML = `
      <tr>
        <td colspan="10" class="league-table-empty">
          Loading official league standings...
        </td>
      </tr>
    `;

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
        .eq("season", "2026/27")
        .eq("competition", "North East Regional League")
        .order("position", {
          ascending: true,
        });

      if (error) {
        throw error;
      }

      renderTable(data);
    } catch (error) {
      console.error("Unable to load league standings:", error);

      tableBody.innerHTML = `
        <tr>
          <td colspan="10" class="league-table-empty">
            Unable to load the league table. Please try again shortly.
          </td>
        </tr>
      `;
    }
  }

  await loadStandings();
});
