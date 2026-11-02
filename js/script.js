const menuItems = [
  {name: "Breakfast", type: "Breakfast", price: "Check current menu"},
  {name: "Something Healthy", type: "Healthy", price: "Check current menu"},
  {name: "Sandwiches", type: "Sandwiches", price: "Check current menu"},
  {name: "Burgers", type: "Burgers", price: "Check current menu"},
  {name: "Subs", type: "Subs", price: "Check current menu"},
  {name: "Dogs & Batties", type: "Dogs & Batties", price: "Check current menu"},
  {name: "Ribs", type: "Ribs", price: "Check current menu"},
  {name: "Salad", type: "Salad", price: "Check current menu"},
  {name: "Pregos", type: "Pregos", price: "Check current menu"},
  {name: "Bowls", type: "Bowls", price: "Check current menu"},
  {name: "Chicken", type: "Chicken", price: "Check current menu"},
  {name: "Sides", type: "Sides", price: "Check current menu"},
  {name: "Extras", type: "Extras", price: "Check current menu"},
  {name: "Cold Drinks", type: "Cold Drinks", price: "Check current menu"}
];

function showProducts(search = "") {
  const list = document.getElementById("productList");
  if (!list) return;

  const text = search.toLowerCase().trim();
  const matches = menuItems.filter(item =>
    item.name.toLowerCase().includes(text) || item.type.toLowerCase().includes(text)
  );

  const sort = document.getElementById("productSort")?.value;
  if (sort === "asc" || sort === "desc") {
    matches.sort((a, b) => a.name.localeCompare(b.name) * (sort === "desc" ? -1 : 1));
  }
  document.getElementById("productCount").textContent = `${matches.length} menu categories found.`;
  list.innerHTML = matches.map(item => `
    <article class="product-card">
      <h2>${item.name}</h2>
      <p>Varsity Bakery menu category.</p>
      <p class="price">${item.price}</p>
    </article>
  `).join("");

  const noProducts = document.getElementById("noProducts");
  if (noProducts) noProducts.hidden = matches.length !== 0;
}

const productSearch = document.getElementById("productSearch");
if (productSearch) {
  showProducts();
  productSearch.addEventListener("input", () => showProducts(productSearch.value));
  document.getElementById("productSort")?.addEventListener("change", () => showProducts(productSearch.value));
}

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

let lightboxTrigger;
const closeButton = document.querySelector(".close-lightbox");
document.querySelectorAll(".gallery-item").forEach(item => {
  const open = () => {
    if (!lightbox) return;
    lightboxTrigger = item;
    lightboxImage.src = item.dataset.lightbox;
    lightboxImage.alt = item.querySelector("img").alt;
    lightboxCaption.textContent = item.dataset.caption;
    lightbox.hidden = false;
    lightbox.classList.add("open");
    document.body.classList.add("modal-open");
    document.querySelector(".site-header").inert = true;
    document.querySelector(".site-footer").inert = true;
    document.querySelectorAll("main > :not(.lightbox)").forEach(el => el.inert = true);
    closeButton.focus();
  };
  item.addEventListener("click", open);
  item.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); }
  });
});
closeButton?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => {
  if (!lightbox || lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "Tab") { event.preventDefault(); closeButton.focus(); }
});
function closeLightbox() {
  if (!lightbox || lightbox.hidden) return;
  lightbox.classList.remove("open");
  lightbox.hidden = true;
  document.body.classList.remove("modal-open");
  document.querySelectorAll("[inert]").forEach(el => el.inert = false);
  lightboxTrigger?.focus();
}

// POST URL-encoded fields to Netlify Forms and confirm HTTP success.
async function submitForm(form, result, success) {
  if (form.getAttribute("aria-busy") === "true") return;
  const button = form.querySelector('[type="submit"]');
  const label = button.textContent;
  const payload = new URLSearchParams(new FormData(form)).toString();
  form.setAttribute("aria-busy", "true");
  button.disabled = true;
  form.inert = true;
  button.textContent = "Sending…";
  result.hidden = false;
  result.classList.remove("submission-error");
  result.textContent = "Sending your message…";
  try {
    const response = await fetch(form.action, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload,
      signal: AbortSignal.timeout(20000)
    });
    if (!response.ok) throw new Error("Submission failed");
    success();
    result.focus();
  } catch {
    result.classList.add("submission-error");
    result.textContent = "Your message could not be confirmed. Your entries are still here. Please retry or contact the bakery directly.";
    result.focus();
  } finally {
    form.removeAttribute("aria-busy");
    form.inert = false;
    button.disabled = false;
    button.textContent = label;
  }
}
// Enable custom messages only when JavaScript is available.
document.querySelectorAll("form[data-netlify]").forEach(form => {
  form.noValidate = true;
  form.addEventListener("input", () => {
    const result = document.getElementById(form.id.replace("Form", "Result"));
    if (result && form.getAttribute("aria-busy") !== "true") result.hidden = true;
    const copy = document.getElementById("contactEmailCopy");
    if (copy) copy.hidden = true;
  });
});

// Small helper for form errors
function setError(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message;
  document.getElementById(id.replace(/Error$/, ""))?.setAttribute("aria-invalid", String(Boolean(message)));
}

// Enquiry form validation and response
const enquiryForm = document.getElementById("enquiryForm");
if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let valid = true;

    ["enquiryNameError", "enquiryEmailError", "enquiryProductError", "enquiryMethodError", "enquiryMessageError"]
      .forEach(id => setError(id, ""));

    const name = document.getElementById("enquiryName");
    const email = document.getElementById("enquiryEmail");
    const product = document.getElementById("enquiryProduct");
    const method = document.getElementById("enquiryMethod");
    const message = document.getElementById("enquiryMessage");

    if (name.value.trim().length < 2) { setError("enquiryNameError", "Please enter your name."); valid = false; }
    if (!email.validity.valid) { setError("enquiryEmailError", "Please enter a valid email address."); valid = false; }
    if (!product.value) { setError("enquiryProductError", "Please choose a menu item."); valid = false; }
    if (!method.value) { setError("enquiryMethodError", "Please choose delivery or pickup."); valid = false; }
    if (message.value.trim().length < 10) { setError("enquiryMessageError", "Please enter at least 10 characters."); valid = false; }

    const result = document.getElementById("enquiryResult");
    if (!valid) {
      result.hidden = true;
      event.target.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const deliveryText = method.value === "delivery"
      ? "Delivery is available to selected areas from 10:00–18:00. Nearby delivery starts from R15."
      : "Pickup is available from the Menlopark store at 309 Lynwood Rd.";

    const confirmation = `Thanks ${name.value.trim()}. Your ${product.value} enquiry was submitted. ${deliveryText} Please confirm the current item price with the bakery before ordering.`;
    submitForm(enquiryForm, result, () => {
      result.textContent = confirmation;
      enquiryForm.reset();
    });
  });
}

// Contact form validation and mailto preparation
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let valid = true;

    ["contactNameError", "contactEmailError", "contactPhoneError", "messageTypeError", "contactMessageError"]
      .forEach(id => setError(id, ""));

    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const phone = document.getElementById("contactPhone");
    const type = document.getElementById("messageType");
    const message = document.getElementById("contactMessage");

    if (name.value.trim().length < 2) { setError("contactNameError", "Please enter your name."); valid = false; }
    if (!email.validity.valid) { setError("contactEmailError", "Please enter a valid email address."); valid = false; }
    if (!phone.validity.valid || phone.value.replace(/\D/g, "").length < 7) { setError("contactPhoneError", "Please enter a valid phone number."); valid = false; }
    if (!type.value) { setError("messageTypeError", "Please choose a message type."); valid = false; }
    if (message.value.trim().length < 10) { setError("contactMessageError", "Please enter at least 10 characters."); valid = false; }

    const result = document.getElementById("contactResult");
    if (!valid) {
      result.hidden = true;
      event.target.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const subject = encodeURIComponent(`Varsity Bakery - ${type.value}`);
    const body = encodeURIComponent(
      `Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\nPhone: ${phone.value.trim()}\n\nMessage:\n${message.value.trim()}`
    );
    const emailUrl = `mailto:admin@varsitybakery.co.za?subject=${subject}&body=${body}`;
    document.getElementById("contactEmailCopy").hidden = true;
    submitForm(contactForm, result, () => {
      result.textContent = "Your message was submitted. You can also open a prepared email copy to admin@varsitybakery.co.za using the link above. Sending that copy is optional.";
      const copy = document.getElementById("contactEmailCopy");
      copy.href = emailUrl;
      copy.hidden = false;
      contactForm.reset();
    });
  });
}

// Leaflet map on the contact page
if (document.getElementById("map") && typeof L !== "undefined") {
  const map = L.map("map").setView([-25.7563, 28.2789], 14);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  L.marker([-25.7563, 28.2789]).addTo(map)
    .bindPopup("<strong>Varsity Bakery</strong><br>309 Lynwood Rd, Menlopark")
    .openPopup();

  // The second marker represents the nearby delivery service area, not a second branch.
  L.circle([-25.7563, 28.2789], {
    radius: 1800
  }).addTo(map).bindPopup("Approximate nearby delivery service area");
}

// Reveal existing page content progressively; reduced motion keeps it static.
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.08 });
  document.querySelectorAll(".hero, .card, .location-card, details").forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}
