/*
 * =========================================================
 * TESO WARRIORS FC
 * TECHNICAL STAFF
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", async () => {
  const supabase = window.twfSupabase;
  const staffGrid = document.getElementById("staff-grid");

  if (!staffGrid) {
    return;
  }

  if (!supabase) {
    showError();
    return;
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getInitials(firstName, lastName) {
    return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
  }

  function showError() {
    staffGrid.innerHTML = `
      <div class="staff-empty">
        <h3>Technical Staff</h3>
        <p>
          Official technical staff information will appear here.
        </p>
      </div>
    `;
  }

  try {
    const { data, error } = await supabase
      .from("staff")
      .select(
        `
        id,
        first_name,
        last_name,
        role,
        photo_url,
        bio,
        status,
        created_at
      `,
      )
      .eq("status", "active")
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    const staff = data ?? [];

    if (!staff.length) {
      staffGrid.innerHTML = `
        <div class="staff-empty">
          <h3>
            Technical Staff Profiles Coming Soon
          </h3>

          <p>
            Official coaching and technical staff profiles
            are currently being prepared.
          </p>
        </div>
      `;

      return;
    }

    staffGrid.innerHTML = staff
      .map((member) => {
        const fullName =
          `${member.first_name ?? ""} ${member.last_name ?? ""}`.trim();

        const photoMarkup = member.photo_url
          ? `
            <img
              src="${escapeHTML(member.photo_url)}"
              alt="${escapeHTML(fullName)}"
            />
          `
          : `
            <div class="staff-placeholder">
              ${escapeHTML(getInitials(member.first_name, member.last_name))}
            </div>
          `;

        return `
          <article class="staff-card">

            <div class="staff-photo">
              ${photoMarkup}
            </div>

            <div class="staff-content">

              <span class="staff-role">
                ${escapeHTML(member.role || "Technical Staff")}
              </span>

              <h3>
                ${escapeHTML(fullName)}
              </h3>

              ${
                member.bio
                  ? `
                    <p>
                      ${escapeHTML(member.bio)}
                    </p>
                  `
                  : ""
              }

            </div>

          </article>
        `;
      })
      .join("");
  } catch (error) {
    console.error("Technical staff load error:", error);

    showError();
  }
});
