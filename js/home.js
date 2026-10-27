/*
 * =========================================================
 * TESO WARRIORS FC
 * HOMEPAGE MATCH CENTRE
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", async () => {
  const supabase = window.twfSupabase;

  const matchCards = document.querySelectorAll(".match-centre .match-card");

  if (matchCards.length < 2) {
    console.error("Homepage Match Centre cards were not found.");
    return;
  }

  const latestResultCard = matchCards[0];
  const nextFixtureCard = matchCards[1];

  /*
   * =========================================================
   * LATEST RESULT
   * =========================================================
   *
   * The competitive season has not started yet.
   * Keep this intentional instead of showing a fake opponent.
   */

  latestResultCard.innerHTML = `
    <p class="match-status">LATEST RESULT</p>

    <div class="match-date">
      NO RESULTS YET
    </div>

    <div class="match-teams">
      <span>Teso Warriors FC</span>
      <strong>—</strong>
      <span>2026/27 Season</span>
    </div>

    <a href="results.html" class="match-link">
      View Results →
    </a>
  `;

  /*
   * =========================================================
   * SUPABASE CHECK
   * =========================================================
   */

  if (!supabase) {
    console.error("Homepage could not connect to Supabase.");

    nextFixtureCard.innerHTML = `
      <p class="match-status">NEXT FIXTURE</p>

      <div class="match-date">
        MATCH INFORMATION
      </div>

      <div class="match-teams">
        <span>Teso Warriors FC</span>
        <strong>VS</strong>
        <span>To Be Confirmed</span>
      </div>

      <a href="fixtures.html" class="match-link">
        View Fixtures →
      </a>
    `;

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

  function formatDate(dateString) {
    if (!dateString) {
      return "DATE TBC";
    }

    const date = new Date(`${dateString}T12:00:00`);

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
      .format(date)
      .toUpperCase();
  }

  function formatTime(timeString) {
    if (!timeString) {
      return "TIME TBC";
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
    return String(value ?? "")
      .trim()
      .toLowerCase() === "away"
      ? "Away"
      : "Home";
  }

  /*
   * =========================================================
   * LOAD NEXT FIXTURE
   * =========================================================
   */

  try {
    const today = new Date();

    const todayString = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    const { data, error } = await supabase
      .from("fixtures")
      .select(
        `
          opponent,
          match_date,
          kickoff_time,
          venue,
          home_away,
          competition
        `,
      )
      .gte("match_date", todayString)
      .order("match_date", {
        ascending: true,
      })
      .order("kickoff_time", {
        ascending: true,
        nullsFirst: false,
      })
      .limit(1);

    if (error) {
      throw error;
    }

    const fixture = data?.[0];

    if (!fixture) {
      nextFixtureCard.innerHTML = `
        <p class="match-status">
          NEXT FIXTURE
        </p>

        <div class="match-date">
          NO FIXTURE SCHEDULED
        </div>

        <div class="match-teams">
          <span>Teso Warriors FC</span>
          <strong>VS</strong>
          <span>Opponent TBC</span>
        </div>

        <a
          href="fixtures.html"
          class="match-link"
        >
          View Fixtures →
        </a>
      `;

      return;
    }

    const homeAway = normalizeHomeAway(fixture.home_away);

    const homeTeam =
      homeAway === "Home" ? "Teso Warriors FC" : fixture.opponent;

    const awayTeam =
      homeAway === "Home" ? fixture.opponent : "Teso Warriors FC";

    nextFixtureCard.innerHTML = `
      <p class="match-status">
        NEXT FIXTURE
      </p>

      <div class="match-date">
        ${escapeHTML(formatDate(fixture.match_date))}
        ·
        ${escapeHTML(formatTime(fixture.kickoff_time))}
      </div>

      <div class="match-teams">
        <span>
          ${escapeHTML(homeTeam)}
        </span>

        <strong>VS</strong>

        <span>
          ${escapeHTML(awayTeam)}
        </span>
      </div>

      <a
        href="fixtures.html"
        class="match-link"
      >
        View Fixtures →
      </a>
    `;
  } catch (error) {
    console.error("Homepage Match Centre error:", error);

    nextFixtureCard.innerHTML = `
      <p class="match-status">
        NEXT FIXTURE
      </p>

      <div class="match-date">
        MATCH INFORMATION
      </div>

      <div class="match-teams">
        <span>Teso Warriors FC</span>
        <strong>VS</strong>
        <span>See Fixtures</span>
      </div>

      <a
        href="fixtures.html"
        class="match-link"
      >
        View Fixtures →
      </a>
    `;
  }
});
