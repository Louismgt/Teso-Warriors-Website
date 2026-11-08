/* =========================================================
   TESO WARRIORS FC
   HOMEPAGE LATEST NEWS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const container =
    document.getElementById("homepage-news-grid");

  if (!container) {
    return;
  }

  const stories = Array.isArray(window.TWF_NEWS)
    ? [...window.TWF_NEWS]
    : [];

  stories.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const latest = stories.slice(0, 3);

  function escapeHTML(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  if (!latest.length) {
    container.innerHTML =
      "<p>No news has been published yet.</p>";

    return;
  }

  container.innerHTML = latest
    .map(
      (story) => `

        <article class="news-card">

          <div
            class="news-image ${
              story.imageType === "logo"
                ? "news-image-logo"
                : "news-image-photo"
            }"
          >

            <img
              src="${escapeHTML(story.image)}"
              alt="${escapeHTML(story.imageAlt)}"
              loading="lazy"
            />

            <span>
              ${escapeHTML(story.type)}
            </span>

          </div>

          <div class="news-content">

            <p class="news-category">
              ${escapeHTML(story.category)}
            </p>

            <h3>
              ${escapeHTML(story.title)}
            </h3>

            <p>
              ${escapeHTML(story.summary)}
            </p>

            <a href="news.html#${story.id}">
              Read More →
            </a>

          </div>

        </article>

      `
    )
    .join("");

});
