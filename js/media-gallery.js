document.addEventListener("DOMContentLoaded", () => {

  const photos =
    document.querySelectorAll(".twf-gallery-photo");

  const lightbox =
    document.getElementById("twf-gallery-lightbox");

  const lightboxImage =
    document.getElementById("twf-gallery-lightbox-image");

  const caption =
    document.getElementById("twf-gallery-lightbox-caption");

  const close =
    document.getElementById("twf-gallery-lightbox-close");

  if (
    !photos.length ||
    !lightbox ||
    !lightboxImage ||
    !close
  ) {
    return;
  }

  function openPhoto(link) {

    lightboxImage.src =
      link.getAttribute("href");

    lightboxImage.alt =
      link.dataset.caption || "";

    caption.textContent =
      link.dataset.caption || "";

    lightbox.classList.add("is-open");

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";
  }

  function closePhoto() {

    lightbox.classList.remove("is-open");

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    lightboxImage.src = "";

    document.body.style.overflow =
      "";
  }

  photos.forEach(photo => {

    photo.addEventListener(
      "click",
      event => {

        event.preventDefault();
        openPhoto(photo);

      }
    );

  });

  close.addEventListener(
    "click",
    closePhoto
  );

  lightbox.addEventListener(
    "click",
    event => {

      if (event.target === lightbox) {
        closePhoto();
      }

    }
  );

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {
        closePhoto();
      }

    }
  );

});
