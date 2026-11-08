/* =========================================================
   TESO WARRIORS FC
   NEWS PAGE RENDERER
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const stories = Array.isArray(window.TWF_NEWS)
    ? [...window.TWF_NEWS]
    : [];

  stories.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const featuredContainer =
    document.getElementById("news-featured");

  const archiveContainer =
    document.getElementById("news-archive");

  if (!featuredContainer || !archiveContainer) {
    console.error(
      "Teso Warriors News: required containers not found."
    );
    return;
  }

  if (!stories.length) {
    featuredContainer.innerHTML =
      "<p>No club news has been published yet.</p>";

    return;
  }

  function escapeHTML(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function requestedStory() {

    const id = window.location.hash
      .replace("#", "")
      .trim();

    if (!id) {
      return stories[0];
    }

    return (
      stories.find((story) => story.id === id) ||
      stories[0]
    );
  }

  function renderFeatured(story) {

    const body = (story.body || [])
      .map(
        (paragraph) =>
          `<p>${escapeHTML(paragraph)}</p>`
      )
      .join("");

    const takeawayHTML =
      story.takeaways && story.takeaways.length
        ? `
          <h3 class="twf-takeaway-heading">
            Key Takeaways
          </h3>

          ${story.takeaways
            .map(
              (item) => `
                <p>
                  <strong>${escapeHTML(item.title)}:</strong>
                  ${escapeHTML(item.text)}
                </p>
              `
            )
            .join("")}
        `
        : "";

    const closing = story.closing
      ? `<p>${escapeHTML(story.closing)}</p>`
      : "";

    const visualClass =
      story.imageType === "logo"
        ? "featured-story-visual twf-news-logo-visual"
        : "featured-story-visual featured-story-photo";

    featuredContainer.innerHTML = `

      <article class="featured-story">

        <div class="featured-story-copy">

          <span class="story-category">
            ${escapeHTML(story.category)}
            /
            ${escapeHTML(story.type)}
          </span>

          <span class="story-date">
            ${escapeHTML(story.displayDate)}
          </span>

          <h2>
            ${escapeHTML(story.title)}
          </h2>

          <p>
            ${escapeHTML(story.summary)}
          </p>

          <div class="fixture-details">

            <div class="fixture-detail">
              <span>Competition</span>
              <strong>
                ${escapeHTML(story.competition)}
              </strong>
            </div>

            <div class="fixture-detail">
              <span>Fixture / Result</span>
              <strong>
                ${escapeHTML(story.result)}
              </strong>
            </div>

            <div class="fixture-detail">
              <span>Date</span>
              <strong>
                ${escapeHTML(story.displayDate)}
              </strong>
            </div>

            <div class="fixture-detail">
              <span>Venue</span>
              <strong>
                ${escapeHTML(story.venue)}
              </strong>
            </div>

          </div>

        </div>

        <div class="${visualClass}">

          <img
            src="${escapeHTML(story.image)}"
            alt="${escapeHTML(story.imageAlt)}"
          />

          <span class="match-label">
            ${escapeHTML(story.type)}
          </span>

        </div>

      </article>

      <div class="article-body">

        ${body}

        ${takeawayHTML}

        ${closing}

        <div class="article-signoff">
          Strength. Pride. Glory.
        </div>

      </div>
    `;
  }

  function renderArchive(activeStory) {

    const archived = stories.filter(
      (story) => story.id !== activeStory.id
    );

    if (!archived.length) {

      archiveContainer.innerHTML = `
        <div class="news-placeholder">

          <h3>More Warriors News Coming</h3>

          <p>
            Match reports, team announcements and club
            updates will be published here throughout
            the season.
          </p>

        </div>
      `;

      return;
    }

    archiveContainer.innerHTML = `
      <div class="twf-news-archive-grid">

        ${archived
          .map(
            (story) => `

            <article class="twf-archive-card">

              <a
                class="twf-archive-image"
                href="news.html#${story.id}"
              >

                <img
                  src="${escapeHTML(story.image)}"
                  alt="${escapeHTML(story.imageAlt)}"
                  loading="lazy"
                />

              </a>

              <div class="twf-archive-copy">

                <span class="story-category">
                  ${escapeHTML(story.category)}
                </span>

                <span class="story-date">
                  ${escapeHTML(story.displayDate)}
                </span>

                <h3>
                  <a href="news.html#${story.id}">
                    ${escapeHTML(story.title)}
                  </a>
                </h3>

                <p>
                  ${escapeHTML(story.summary)}
                </p>

                <a
                  class="twf-news-read-more"
                  href="news.html#${story.id}"
                >
                  Read Story →
                </a>

              </div>

            </article>

          `
          )
          .join("")}

      </div>
    `;
  }

  function render() {

    const story = requestedStory();

    renderFeatured(story);
    renderArchive(story);

    document.title =
      `${story.title} | Teso Warriors FC`;
  }

  render();

  window.addEventListener("hashchange", () => {

    render();

    const featured =
      document.getElementById("news-featured");

    if (featured) {
      featured.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

  });

});
