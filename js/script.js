"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // Update the copyright year automatically.
    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });

    // Add a search feature to pages with searchable cards.
    const searchInput = document.querySelector("#serviceSearch");
    const serviceCards = document.querySelectorAll(".service-card");
    const searchMessage = document.querySelector("#searchMessage");

    if (searchInput && serviceCards.length > 0) {

        searchInput.addEventListener("input", function () {

            const query = searchInput.value.trim().toLowerCase();
            let visibleCards = 0;

            serviceCards.forEach(function (card) {

                const cardText = card.textContent.toLowerCase();
                const matches = cardText.includes(query);

                card.hidden = !matches;

                if (matches) {
                    visibleCards++;
                }
            });

            if (searchMessage) {
                searchMessage.textContent =
                    visibleCards + " accommodation option(s) found.";
            }
        });
    }

    // Accessible expandable FAQ sections.
    const faqButtons = document.querySelectorAll(".faq-question");

    faqButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const answerId = button.getAttribute("aria-controls");
            const answer = document.getElementById(answerId);

            if (!answer) {
                return;
            }

            const isExpanded =
                button.getAttribute("aria-expanded") === "true";

            button.setAttribute("aria-expanded", String(!isExpanded));
            answer.hidden = isExpanded;
        });
    });

    // Client-side enquiry form validation.
    const enquiryForm = document.querySelector("#enquiryForm");
    const formMessage = document.querySelector("#formMessage");

    if (enquiryForm) {

        enquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!enquiryForm.checkValidity()) {

                enquiryForm.reportValidity();

                if (formMessage) {
                    formMessage.textContent =
                        "Please correct the highlighted fields.";
                }

                return;
            }

            if (formMessage) {
                formMessage.textContent =
                    "Your information passed the browser validation checks. " +
                    "The form has not been sent to the business yet.";
            }
        });
    }

});

// GALLERY LIGHTBOX FUNCTIONALITY

document.addEventListener("DOMContentLoaded", function () {

    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");

    if (!lightbox || !lightboxImage || galleryItems.length === 0) {
        return;
    }

    const images = Array.from(galleryItems).map(function (item) {
        return item.querySelector("img");
    });

    let currentImage = 0;

    function showImage(index) {
        currentImage = (index + images.length) % images.length;

        lightboxImage.src = images[currentImage].src;
        lightboxImage.alt = images[currentImage].alt;
    }

    function openLightbox(index) {
        showImage(index);
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    galleryItems.forEach(function (item, index) {
        item.addEventListener("click", function () {
            openLightbox(index);
        });
    });

    lightbox.querySelector(".lightbox-close")
        .addEventListener("click", closeLightbox);

    lightbox.querySelector(".lightbox-prev")
        .addEventListener("click", function () {
            showImage(currentImage - 1);
        });

    lightbox.querySelector(".lightbox-next")
        .addEventListener("click", function () {
            showImage(currentImage + 1);
        });

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowRight") showImage(currentImage + 1);
        if (event.key === "ArrowLeft") showImage(currentImage - 1);
    });

});