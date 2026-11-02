# Varsity Bakery Website

## Project
Varsity Bakery website for the WEDE5020 Web Development (Introduction) POE.

## Student Information
Student name: Nhlangano
Student number: ST10526531

## Project Overview
This website is a simple website for Varsity Bakery in Menlopark, Pretoria. It gives visitors information about the bakery, menu categories, gallery images, enquiries and contact details.

## Website Goals and Objectives
- Make bakery information easy to find.
- Show the main menu categories.
- Make customer enquiries easier.
- Give customers contact and delivery information.
- Make the website easy to use on desktop, tablet and mobile.

## Pages
1. Home - index.html
2. About Us - about.html
3. Products/Menu - products.html
4. Gallery - gallery.html
5. Enquiry - enquiry.html
6. Contact - contact.html

## Main Features
### Part 2
- External CSS stylesheet.
- Consistent colours, fonts and spacing.
- Flexbox and CSS Grid layouts.
- Hover and focus states.
- Desktop, tablet and mobile breakpoints.
- Responsive images using picture, srcset and sizes.
- Simple layout that is easy to read.

### Part 3
- JavaScript product search/filter.
- Gallery lightbox.
- FAQ accordion using HTML details/summary.
- Leaflet map with the bakery store and an approximate delivery service area.
- Enquiry form validation and response.
- Contact form validation and mailto email preparation.
- SEO title tags and meta descriptions.
- Descriptive image alt text.
- robots.txt and sitemap.xml.
- Internal links between pages.


## Part 2 Responsive Testing
The CSS uses:
- Desktop layout above 900px.
- Tablet layout at 900px and below.
- Mobile layout at 600px and below.
- rem, em, %, vw and clamp() where suitable.
- Responsive image srcset/sizes.

Browser evidence is included in `screenshots/` showing:
- Desktop view
- Tablet view
- Mobile view

The screenshots were captured from the local site in Chromium at 1440px, 768px and 390px widths.

## Part 3 Notes
The enquiry form gives a response after successful validation. It does not show fixed menu prices because prices can change.

Both forms validate input and submit asynchronously to Netlify Forms. Submission failures retain entries and offer a retry. A successful contact submission also provides an optional prepared email addressed to:
admin@varsitybakery.co.za

The map uses Leaflet and OpenStreetMap. The second map item is an approximate nearby delivery service area, not a second bakery branch.

## Deployment
Published website: https://varsity-bakery.netlify.app/

Netlify detects the two HTML forms on deployment. Submissions are available in the site’s Forms dashboard. The optional email-copy link requires a configured email application. The sitemap, robots.txt and canonical URLs use the published domain.

## References
Varsity Bakery. (2026). Varsity Bakery. https://varsitybakery.co.za/

Varsity Bakery. (2026). Terms and Conditions. https://varsitybakery.co.za/terms-conditions/

Leaflet. (2026). Leaflet JavaScript library. https://leafletjs.com/

OpenStreetMap. (2026). OpenStreetMap. https://www.openstreetmap.org/

Project proposal and research documents from Part 1 are retained in the original Part 1 submission.

## Part 3 compliance update
- Added menu sorting (menu order, A–Z and Z–A), result counts and a no-JavaScript category summary.
- Connected enquiry and contact forms to Netlify Forms with URL-encoded AJAX POST requests, honeypot spam prevention, pending/success/failure states and duplicate-submit prevention.
- Kept the required contact email preparation as an optional link after submission. Enquiry responses include delivery/pickup information; prices require confirmation.
- Added keyboard lightbox activation, modal focus handling, skip links, current-page navigation and accessible form feedback.
- Added CSS transitions, animated dynamic results and JavaScript scroll reveals with reduced-motion support.
- Corrected sitemap/robots URLs, added canonical URLs and Bakery structured data with the supplied business address and contact details.
- Limited Leaflet loading to Contact, added image dimensions and lazy-loaded non-hero images, and added cache/security headers.

## Keyword and local-search rationale
The chosen phrases are “Varsity Bakery”, “Menlopark bakery”, “bakery Pretoria”, “breakfast”, “sandwiches”, “delivery” and “pickup”. They reflect the business name, supplied location, menu categories and customer actions. Relevant phrases appear naturally in page titles, descriptions, headings and content. This is a content-based keyword selection, not a claim of measured search-volume research. Contact includes the consistent business address, phone and Bakery structured data. No unverified opening hours, ratings or prices were added.
