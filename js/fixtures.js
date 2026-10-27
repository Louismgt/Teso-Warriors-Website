/*
 * =========================================================
 * TESO WARRIORS FC
 * OFFICIAL MATCH CENTRE — FIXTURES
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", async () => {
  const supabase = window.twfSupabase;

  const nextMatchCard = document.getElementById("next-match-card");

  const fixturesList = document.getElementById("fixtures-list");

  /*
   * =========================================================
   * BASIC CHECKS
   * =========================================================
   */

  if (!nextMatchCard || !fixturesList) {
    console.error("Fixtures page containers could not be found.");
    return;
  }

  if (!supabase) {
    console.error("Teso Warriors Supabase connection is unavailable.");

    showConnectionError();
    return;
  }

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

  function parseDate(dateString) {
    if (!dateString) {
      return null;
    }

    return new Date(`${dateString}T12:00:00`);
  }

  function formatFullDate(dateString) {
    const date = parseDate(dateString);

    if (!date) {
      return "Date TBC";
    }

    return new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }

  function formatShortDate(dateString) {
    const date = parseDate(dateString);

    if (!date) {
      return "Date TBC";
    }

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  }

  function formatTime(timeString) {
    if (!timeString) {
      return "Time TBC";
    }

    const [hours, minutes] = timeString.split(":");

    const time = new Date();

    time.setHours(Number(hours));
    time.setMinutes(Number(minutes));
    time.setSeconds(0);

    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
      .format(time)
      .toUpperCase();
  }

  function normalizeHomeAway(value) {
    const normalized = String(value ?? "")
      .trim()
      .toLowerCase();

    return normalized === "away" ? "Away" : "Home";
  }

  function opponentInitials(name) {
    if (!name) {
      return "TBC";
    }

    return name
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();
  }

  function getTeams(fixture) {
    const homeAway = normalizeHomeAway(fixture.home_away);

    if (homeAway === "Away") {
      return {
        homeName: fixture.opponent,
        awayName: "Teso Warriors FC",
        homeIsTeso: false,
        awayIsTeso: true,
      };
    }

    return {
      homeName: "Teso Warriors FC",
      awayName: fixture.opponent,
      homeIsTeso: true,
      awayIsTeso: false,
    };
  }

  function teamBadge(teamName, isTeso) {
    if (isTeso) {
      return `
        <img
          src="images/teso-warriors-crest.png"
          alt="Teso Warriors FC crest"
        />
      `;
    }

    return `
      <span class="opponent-initials">
        ${escapeHTML(opponentInitials(teamName))}
      </span>
    `;
  }

  /*
   * =========================================================
   * NEXT MATCH
   * =========================================================
   */

  function renderNextMatch(fixture) {
    const teams = getTeams(fixture);

    nextMatchCard.innerHTML = `
      <div class="next-match-meta">

        <div class="next-match-meta-item">
          <span>Match Date</span>

          <strong>
            ${escapeHTML(formatFullDate(fixture.match_date))}
          </strong>
        </div>

        <div class="next-match-meta-item">
          <span>Competition</span>

          <strong>
            ${escapeHTML(fixture.competition || "Competition TBC")}
          </strong>
        </div>

        <div class="next-match-meta-item">
          <span>Kick-Off</span>

          <strong>
            ${escapeHTML(formatTime(fixture.kickoff_time))}
          </strong>
        </div>

      </div>

      <div class="next-match-versus">

        <div class="match-team">

          <div class="match-team-badge">
            ${teamBadge(teams.homeName, teams.homeIsTeso)}
          </div>

          <h3>
            ${escapeHTML(teams.homeName)}
          </h3>

          <span class="team-location">
            Home
          </span>

        </div>

        <div class="match-vs">

          <strong>VS</strong>

          <span>Next Battle</span>

        </div>

        <div class="match-team">

          <div class="match-team-badge">
            ${teamBadge(teams.awayName, teams.awayIsTeso)}
          </div>

          <h3>
            ${escapeHTML(teams.awayName)}
          </h3>

          <span class="team-location">
            Away
          </span>

        </div>

      </div>

      <div class="next-match-bottom">

        <div>
          <span>Venue</span>

          <strong>
            ${escapeHTML(fixture.venue || "Venue To Be Confirmed")}
          </strong>
        </div>

        <div>
          <span>Status</span>

          <strong>
            ${escapeHTML(fixture.status || "Upcoming")}
          </strong>
        </div>

      </div>
    `;
  }

  /*
   * =========================================================
   * FIXTURE LIST
   * =========================================================
   */

  function renderFixtureList(fixtures) {
    if (!fixtures.length) {
      fixturesList.innerHTML = `
        <div class="fixture-empty">

          <h3>
            No Upcoming Fixtures
          </h3>

          <p>
            New official fixtures will appear here
            once confirmed by the club.
          </p>

        </div>
      `;

      return;
    }

    fixturesList.innerHTML = fixtures
      .map((fixture, index) => {
        const teams = getTeams(fixture);

        return `
          <article class="fixture-item">

            <div class="fixture-number">
              ${String(index + 1).padStart(2, "0")}
            </div>

            <div class="fixture-date">

              <strong>
                ${escapeHTML(formatShortDate(fixture.match_date))}
              </strong>

              <span>
                ${escapeHTML(formatTime(fixture.kickoff_time))}
              </span>

            </div>

            <div class="fixture-info">

              <p class="competition">
                ${escapeHTML(fixture.competition || "Competition TBC")}
              </p>

              <h3>
                ${escapeHTML(teams.homeName)}
                vs
                ${escapeHTML(teams.awayName)}
              </h3>

              <p class="venue">
                ${escapeHTML(fixture.venue || "Venue To Be Confirmed")}
              </p>

            </div>

            <div class="fixture-side">
              ${escapeHTML(normalizeHomeAway(fixture.home_away))}
            </div>

          </article>
        `;
      })
      .join("");
  }

  /*
   * =========================================================
   * ERROR STATE
   * =========================================================
   */

  function showConnectionError() {
    nextMatchCard.innerHTML = `
      <div class="next-match-loading">

        <span>Match Centre</span>

        <h3>
          Fixture Information Unavailable
        </h3>

        <p>
          The Match Centre could not connect to
          the fixture database.
        </p>

      </div>
    `;

    fixturesList.innerHTML = `
      <div class="fixture-empty">

        <h3>
          Unable to Load Fixtures
        </h3>

        <p>
          Please refresh the page and try again.
        </p>

      </div>
    `;
  }

  /*
   * =========================================================
   * LOAD DATA
   * =========================================================
   */

  try {
    const today = new Date();

    const todayString = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    console.log("Teso Warriors Match Centre:", todayString);

    const { data, error } = await supabase
      .from("fixtures")
      .select(
        `
          id,
          competition,
          opponent,
          match_date,
          kickoff_time,
          venue,
          home_away,
          status,
          notes
        `,
      )
      .gte("match_date", todayString)
      .order("match_date", {
        ascending: true,
      })
      .order("kickoff_time", {
        ascending: true,
        nullsFirst: false,
      });

    if (error) {
      throw error;
    }

    const fixtures = data ?? [];

    console.log("Fixtures loaded:", fixtures);

    if (!fixtures.length) {
      nextMatchCard.innerHTML = `
        <div class="next-match-loading">

          <span>Next Match</span>

          <h3>
            No Match Currently Scheduled
          </h3>

          <p>
            The next official fixture will appear
            here once confirmed.
          </p>

        </div>
      `;

      renderFixtureList([]);
      return;
    }

    renderNextMatch(fixtures[0]);
    renderFixtureList(fixtures);
  } catch (error) {
    console.error("Match Centre Error:", error);

    showConnectionError();
  }
});
