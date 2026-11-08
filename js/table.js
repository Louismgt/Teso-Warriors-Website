
// TWF OFFICIAL STANDINGS START
const officialStandings = [
  {
    position: 1,
    club: "Kumi United FC",
    team: "Kumi United FC",
    matches_played: 2,
    mp: 2,
    played: 2,
    p: 2,
    wins: 2,
    w: 2,
    draws: 0,
    d: 0,
    losses: 0,
    l: 0,
    goals_for: 6,
    gf: 6,
    goals_against: 0,
    ga: 0,
    goal_difference: 6,
    gd: 6,
    points: 6,
    pts: 6
  },
  {
    position: 2,
    club: "Teso Warriors FC",
    team: "Teso Warriors FC",
    matches_played: 2,
    mp: 2,
    played: 2,
    p: 2,
    wins: 2,
    w: 2,
    draws: 0,
    d: 0,
    losses: 0,
    l: 0,
    goals_for: 5,
    gf: 5,
    goals_against: 1,
    ga: 1,
    goal_difference: 4,
    gd: 4,
    points: 6,
    pts: 6
  },
  {
    position: 3,
    club: "Tapoh FC",
    team: "Tapoh FC",
    matches_played: 1,
    mp: 1,
    played: 1,
    p: 1,
    wins: 1,
    w: 1,
    draws: 0,
    d: 0,
    losses: 0,
    l: 0,
    goals_for: 2,
    gf: 2,
    goals_against: 1,
    ga: 1,
    goal_difference: 1,
    gd: 1,
    points: 3,
    pts: 3
  },
  {
    position: 4,
    club: "MYDA FC",
    team: "MYDA FC",
    matches_played: 2,
    mp: 2,
    played: 2,
    p: 2,
    wins: 1,
    w: 1,
    draws: 0,
    d: 0,
    losses: 1,
    l: 1,
    goals_for: 8,
    gf: 8,
    goals_against: 2,
    ga: 2,
    goal_difference: 6,
    gd: 6,
    points: 3,
    pts: 3
  },
  {
    position: 5,
    club: "Obule Earth Quake FC",
    team: "Obule Earth Quake FC",
    matches_played: 2,
    mp: 2,
    played: 2,
    p: 2,
    wins: 0,
    w: 0,
    draws: 2,
    d: 2,
    losses: 0,
    l: 0,
    goals_for: 1,
    gf: 1,
    goals_against: 1,
    ga: 1,
    goal_difference: 0,
    gd: 0,
    points: 2,
    pts: 2
  },
  {
    position: 6,
    club: "Tita SC",
    team: "Tita SC",
    matches_played: 1,
    mp: 1,
    played: 1,
    p: 1,
    wins: 0,
    w: 0,
    draws: 1,
    d: 1,
    losses: 0,
    l: 0,
    goals_for: 0,
    gf: 0,
    goals_against: 0,
    ga: 0,
    goal_difference: 0,
    gd: 0,
    points: 1,
    pts: 1
  },
  {
    position: 7,
    club: "Rupa United FC",
    team: "Rupa United FC",
    matches_played: 2,
    mp: 2,
    played: 2,
    p: 2,
    wins: 0,
    w: 0,
    draws: 1,
    d: 1,
    losses: 1,
    l: 1,
    goals_for: 2,
    gf: 2,
    goals_against: 5,
    ga: 5,
    goal_difference: -3,
    gd: -3,
    points: 1,
    pts: 1
  },
  {
    position: 8,
    club: "Kapchorwa Vikings Academy FC",
    team: "Kapchorwa Vikings Academy FC",
    matches_played: 0,
    mp: 0,
    played: 0,
    p: 0,
    wins: 0,
    w: 0,
    draws: 0,
    d: 0,
    losses: 0,
    l: 0,
    goals_for: 0,
    gf: 0,
    goals_against: 0,
    ga: 0,
    goal_difference: 0,
    gd: 0,
    points: 0,
    pts: 0
  },
  {
    position: 9,
    club: "Ateker FC",
    team: "Ateker FC",
    matches_played: 1,
    mp: 1,
    played: 1,
    p: 1,
    wins: 0,
    w: 0,
    draws: 0,
    d: 0,
    losses: 1,
    l: 1,
    goals_for: 0,
    gf: 0,
    goals_against: 1,
    ga: 1,
    goal_difference: -1,
    gd: -1,
    points: 0,
    pts: 0
  },
  {
    position: 10,
    club: "Kadam United FC",
    team: "Kadam United FC",
    matches_played: 1,
    mp: 1,
    played: 1,
    p: 1,
    wins: 0,
    w: 0,
    draws: 0,
    d: 0,
    losses: 1,
    l: 1,
    goals_for: 0,
    gf: 0,
    goals_against: 2,
    ga: 2,
    goal_difference: -2,
    gd: -2,
    points: 0,
    pts: 0
  },
  {
    position: 11,
    club: "Kamet United FC",
    team: "Kamet United FC",
    matches_played: 2,
    mp: 2,
    played: 2,
    p: 2,
    wins: 0,
    w: 0,
    draws: 0,
    d: 0,
    losses: 2,
    l: 2,
    goals_for: 0,
    gf: 0,
    goals_against: 11,
    ga: 11,
    goal_difference: -11,
    gd: -11,
    points: 0,
    pts: 0
  }
];
// TWF OFFICIAL STANDINGS END


/*
 * =========================================================
 * TESO WARRIORS FC
 * OFFICIAL LEAGUE TABLE
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", async () => {
  const supabase = window.twfSupabase;
  const tableBody = document.querySelector("#league-table-body");

  if (!supabase || !tableBody) {
    console.error("League table could not initialise.");
    return;
  }

  const snapshotPosition =
    document.querySelector("#snapshot-position");

  const snapshotMatches =
    document.querySelector("#snapshot-matches");

  const snapshotPoints =
    document.querySelector("#snapshot-points");

  const snapshotGD =
    document.querySelector("#snapshot-gd");

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

    return words
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }

  function getRowClass(team) {
    const name = String(team.team_name || "")
      .trim()
      .toLowerCase();

    if (name === "teso warriors fc") {
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

  function updateWarriorsSnapshot(standings) {
    const warriors = standings.find(
      (team) =>
        String(team.team_name || "")
          .trim()
          .toLowerCase() === "teso warriors fc",
    );

    if (!warriors) {
      return;
    }

    if (snapshotPosition) {
      snapshotPosition.textContent =
        `${warriors.position}${getOrdinal(warriors.position)}`;
    }

    if (snapshotMatches) {
      snapshotMatches.textContent =
        warriors.matches_played ?? 0;
    }

    if (snapshotPoints) {
      snapshotPoints.textContent =
        warriors.points ?? 0;
    }

    if (snapshotGD) {
      snapshotGD.textContent =
        formatGoalDifference(warriors.goal_difference);
    }
  }

  function getOrdinal(position) {
    const number = Number(position);

    if (number >= 11 && number <= 13) {
      return "th";
    }

    switch (number % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

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

    updateWarriorsSnapshot(standings);

    tableBody.innerHTML = standings
      .map((team) => {
        const isWarriors =
          String(team.team_name || "")
            .trim()
            .toLowerCase() === "teso warriors fc";

        return `
          <tr class="${getRowClass(team)}">

            <td class="position-column">
              <strong>${escapeHTML(team.position)}</strong>
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
                      ? "<span>THE WARRIORS</span>"
                      : ""
                  }
                </div>

              </div>
            </td>

            <td>${escapeHTML(team.matches_played)}</td>
            <td>${escapeHTML(team.wins)}</td>
            <td>${escapeHTML(team.draws)}</td>
            <td>${escapeHTML(team.losses)}</td>
            <td>${escapeHTML(team.goals_for)}</td>
            <td>${escapeHTML(team.goals_against)}</td>

            <td class="${goalDifferenceClass(
              team.goal_difference,
            )}">
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

  
  /* TWF-OFFICIAL-STANDINGS-2026-11-07-START */

  const OFFICIAL_STANDINGS_2026_11_07 = [

    {
      position: 1,
      pos: 1,
      club: "Kumi United FC",
      club_name: "Kumi United FC",
      team: "Kumi United FC",
      team_name: "Kumi United FC",

      matches_played: 2,
      mp: 2,
      played: 2,
      p: 2,

      won: 2,
      wins: 2,
      w: 2,

      drawn: 0,
      draws: 0,
      d: 0,

      lost: 0,
      losses: 0,
      l: 0,

      goals_for: 6,
      gf: 6,

      goals_against: 0,
      ga: 0,

      goal_difference: 6,
      gd: 6,

      points: 6,
      pts: 6
    },

    {
      position: 2,
      pos: 2,
      club: "Teso Warriors FC",
      club_name: "Teso Warriors FC",
      team: "Teso Warriors FC",
      team_name: "Teso Warriors FC",

      matches_played: 2,
      mp: 2,
      played: 2,
      p: 2,

      won: 2,
      wins: 2,
      w: 2,

      drawn: 0,
      draws: 0,
      d: 0,

      lost: 0,
      losses: 0,
      l: 0,

      goals_for: 5,
      gf: 5,

      goals_against: 1,
      ga: 1,

      goal_difference: 4,
      gd: 4,

      points: 6,
      pts: 6
    },

    {
      position: 3,
      pos: 3,
      club: "Tapoh FC",
      club_name: "Tapoh FC",
      team: "Tapoh FC",
      team_name: "Tapoh FC",

      matches_played: 1,
      mp: 1,
      played: 1,
      p: 1,

      won: 1,
      wins: 1,
      w: 1,

      drawn: 0,
      draws: 0,
      d: 0,

      lost: 0,
      losses: 0,
      l: 0,

      goals_for: 2,
      gf: 2,

      goals_against: 1,
      ga: 1,

      goal_difference: 1,
      gd: 1,

      points: 3,
      pts: 3
    },

    {
      position: 4,
      pos: 4,
      club: "MYDA FC",
      club_name: "MYDA FC",
      team: "MYDA FC",
      team_name: "MYDA FC",

      matches_played: 2,
      mp: 2,
      played: 2,
      p: 2,

      won: 1,
      wins: 1,
      w: 1,

      drawn: 0,
      draws: 0,
      d: 0,

      lost: 1,
      losses: 1,
      l: 1,

      goals_for: 8,
      gf: 8,

      goals_against: 2,
      ga: 2,

      goal_difference: 6,
      gd: 6,

      points: 3,
      pts: 3
    },

    {
      position: 5,
      pos: 5,
      club: "Obule Earth Quake FC",
      club_name: "Obule Earth Quake FC",
      team: "Obule Earth Quake FC",
      team_name: "Obule Earth Quake FC",

      matches_played: 1,
      mp: 1,
      played: 1,
      p: 1,

      won: 0,
      wins: 0,
      w: 0,

      drawn: 1,
      draws: 1,
      d: 1,

      lost: 0,
      losses: 0,
      l: 0,

      goals_for: 0,
      gf: 0,

      goals_against: 0,
      ga: 0,

      goal_difference: 0,
      gd: 0,

      points: 1,
      pts: 1
    },

    {
      position: 6,
      pos: 6,
      club: "Tita SC",
      club_name: "Tita SC",
      team: "Tita SC",
      team_name: "Tita SC",

      matches_played: 1,
      mp: 1,
      played: 1,
      p: 1,

      won: 0,
      wins: 0,
      w: 0,

      drawn: 1,
      draws: 1,
      d: 1,

      lost: 0,
      losses: 0,
      l: 0,

      goals_for: 0,
      gf: 0,

      goals_against: 0,
      ga: 0,

      goal_difference: 0,
      gd: 0,

      points: 1,
      pts: 1
    },

    {
      position: 7,
      pos: 7,
      club: "Kapchorwa Vikings Academy FC",
      club_name: "Kapchorwa Vikings Academy FC",
      team: "Kapchorwa Vikings Academy FC",
      team_name: "Kapchorwa Vikings Academy FC",

      matches_played: 0,
      mp: 0,
      played: 0,
      p: 0,

      won: 0,
      wins: 0,
      w: 0,

      drawn: 0,
      draws: 0,
      d: 0,

      lost: 0,
      losses: 0,
      l: 0,

      goals_for: 0,
      gf: 0,

      goals_against: 0,
      ga: 0,

      goal_difference: 0,
      gd: 0,

      points: 0,
      pts: 0
    },

    {
      position: 8,
      pos: 8,
      club: "Ateker FC",
      club_name: "Ateker FC",
      team: "Ateker FC",
      team_name: "Ateker FC",

      matches_played: 1,
      mp: 1,
      played: 1,
      p: 1,

      won: 0,
      wins: 0,
      w: 0,

      drawn: 0,
      draws: 0,
      d: 0,

      lost: 1,
      losses: 1,
      l: 1,

      goals_for: 0,
      gf: 0,

      goals_against: 1,
      ga: 1,

      goal_difference: -1,
      gd: -1,

      points: 0,
      pts: 0
    },

    {
      position: 9,
      pos: 9,
      club: "Kadam United FC",
      club_name: "Kadam United FC",
      team: "Kadam United FC",
      team_name: "Kadam United FC",

      matches_played: 1,
      mp: 1,
      played: 1,
      p: 1,

      won: 0,
      wins: 0,
      w: 0,

      drawn: 0,
      draws: 0,
      d: 0,

      lost: 1,
      losses: 1,
      l: 1,

      goals_for: 0,
      gf: 0,

      goals_against: 2,
      ga: 2,

      goal_difference: -2,
      gd: -2,

      points: 0,
      pts: 0
    },

    {
      position: 10,
      pos: 10,
      club: "Rupa United FC",
      club_name: "Rupa United FC",
      team: "Rupa United FC",
      team_name: "Rupa United FC",

      matches_played: 1,
      mp: 1,
      played: 1,
      p: 1,

      won: 0,
      wins: 0,
      w: 0,

      drawn: 0,
      draws: 0,
      d: 0,

      lost: 1,
      losses: 1,
      l: 1,

      goals_for: 1,
      gf: 1,

      goals_against: 4,
      ga: 4,

      goal_difference: -3,
      gd: -3,

      points: 0,
      pts: 0
    },

    {
      position: 11,
      pos: 11,
      club: "Kamet United FC",
      club_name: "Kamet United FC",
      team: "Kamet United FC",
      team_name: "Kamet United FC",

      matches_played: 2,
      mp: 2,
      played: 2,
      p: 2,

      won: 0,
      wins: 0,
      w: 0,

      drawn: 0,
      draws: 0,
      d: 0,

      lost: 2,
      losses: 2,
      l: 2,

      goals_for: 0,
      gf: 0,

      goals_against: 11,
      ga: 11,

      goal_difference: -11,
      gd: -11,

      points: 0,
      pts: 0
    }

  ];

  /* TWF-OFFICIAL-STANDINGS-2026-11-07-END */

async function loadStandings() {
    console.log(
      "Loading official North East Regional League standings — 7 November 2026"
    );

    const standings = OFFICIAL_STANDINGS_2026_11_07;

    renderStandings(standings);

    return standings;
  }

  await loadStandings();
});
