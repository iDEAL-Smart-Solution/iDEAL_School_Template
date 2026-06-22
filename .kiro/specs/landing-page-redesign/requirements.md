# Requirements Document

## Introduction

This feature refactors the existing school landing page into a premium modern design pattern. The layout, typography hierarchy, spacing, image compositions, color usage strategy, and visual polish are all upgraded while every piece of visible content — school name, tagline, colors, images, statistics, programmes, features, and contact details — remains 100% dynamic from the Landing Page API. No school-specific content is hardcoded. The codebase stack remains React + Vite + Tailwind CSS, and the existing component structure (`Navbar`, `Hero`, `About`, `Features`, `Programs`, `SchoolStats`, `CallToAction`, `Contact`, `Footer`) is preserved.

---

## Glossary

- **Landing_Page**: The root `SchoolLandingPage` page component and the collection of section components it composes.
- **API**: The public Landing Page REST endpoint consumed by `landingPageService.js` and `useSchoolData.js`.
- **LandingPageData**: The normalized data shape returned by the API service, as defined in `landingPageService.js`.
- **Theme_Color**: The `theme_color` field from `LandingPageData`; used for buttons, links, badges, active nav states, and icons.
- **Secondary_Color**: The `secondary_color` field from `LandingPageData`; used for dark section backgrounds, overlays, and footer background.
- **Accent_Color**: The `accent_color` field from `LandingPageData`; used for hover states, secondary CTAs, and border highlights.
- **Background_Color**: The `background_color` field from `LandingPageData`; used as the page background.
- **Text_Color**: The `text_color` field from `LandingPageData`; used for body text.
- **Navbar**: The `Navbar.jsx` component rendered at the top of the page.
- **Hero**: The `Hero.jsx` full-width section rendered directly below the Navbar.
- **About**: The `About.jsx` section presenting school introduction, mission, vision, and core values.
- **SchoolStats**: The `SchoolStats.jsx` component displaying the statistics array from the API.
- **Features**: The `Features.jsx` component displaying the features array from the API.
- **Programs**: The `Programs.jsx` component displaying the programs array from the API.
- **CallToAction**: The `CallToAction.jsx` section with a prominent portal CTA.
- **Contact**: The `Contact.jsx` section with contact details and a contact form.
- **Footer**: The `Footer.jsx` component at the bottom of the page.
- **LandingPageLoader**: The `LandingPageLoader.jsx` skeleton shown while data is loading.
- **Portal_Link**: The `portal_link` field from `LandingPageData`; the URL for the school's student portal.
- **resolveColor**: The utility from `landingPageTheme.js` that safely resolves a color value with a fallback.
- **normalizeMediaUrl**: The utility from `landingPageTheme.js` that normalizes image URLs.
- **DEFAULT_LANDING_PAGE**: The fallback data object in `landingPageService.js` used when API fields are absent, null, or empty.

---

## Requirements

### Requirement 1: Dynamic Color System

**User Story:** As a school administrator, I want all colors on the landing page to come exclusively from the API, so that the visual branding is always consistent with the school's configured identity.

#### Acceptance Criteria

1. THE Landing_Page SHALL apply `background_color` as the page background via the CSS custom property `--lp-bg` set on the root page wrapper element.
2. THE Landing_Page SHALL apply `text_color` as the default body text color via the CSS custom property `--lp-text` set on the root page wrapper element.
3. THE Landing_Page SHALL apply `theme_color` to buttons, icon accents, active nav states, badge backgrounds, and section label highlights, exposed via the CSS custom property `--lp-theme`.
4. THE Landing_Page SHALL apply `secondary_color` to the footer background, CTA section background, and dark overlay layers, exposed via the CSS custom property `--lp-secondary`.
5. THE Landing_Page SHALL apply `accent_color` to hover states, secondary CTA buttons, and left-border accents on mission/vision cards, exposed via the CSS custom property `--lp-accent`.
6. IF a color field from the API is null, an empty string, or absent, THEN THE Landing_Page SHALL fall back to the corresponding default value defined in `DEFAULT_LANDING_PAGE` in `landingPageService.js`, resolved via the `resolveColor` utility.
7. IF a color field from the API is a non-empty string but is not a valid CSS color value, THEN THE Landing_Page SHALL treat it as absent and apply the fallback per criterion 6.
8. THE Landing_Page SHALL NOT render `theme_color` or `secondary_color` as the fill of a full-viewport-width element with a height of 20 vh or more, except in the Footer background, CTA section background, and Hero overlay; in all other cases they SHALL be used only as accent strokes, tints, or specific small component backgrounds.

---

### Requirement 2: Transparent-to-Solid Navbar

**User Story:** As a visitor, I want the navigation bar to feel integrated with the hero image at the top and become clearly readable as I scroll, so that the design feels polished and modern.

#### Acceptance Criteria

1. WHEN the page first renders with a scroll position of 0 px, THE Navbar SHALL display with a background of `rgba(0, 0, 0, 0)` (fully transparent) or a background with an alpha channel value of 0.15 or less, floating over the Hero section without occupying document flow above it.
2. WHEN the user scrolls more than 60 pixels from the top, THE Navbar SHALL transition its background to a fully opaque solid color using `secondary_color` from the API, completing the transition within 300 milliseconds.
3. WHEN the user scrolls back to 60 pixels or fewer from the top, THE Navbar SHALL transition back to the transparent background style described in criterion 1 within 300 milliseconds.
4. THE Navbar SHALL be positioned `fixed` or `absolute` at the top of the viewport so that it overlaps the Hero section at all scroll positions.
5. THE Navbar SHALL display the school logo (from the `logo` API field) on the left side at all scroll positions; IF the logo fails to load, THE Navbar SHALL display the school initials derived from the `name` field.
6. THE Navbar SHALL display navigation links (About, Features, Programs, Contact) and portal action buttons (Login, Register) on the right side on viewports of 768 px wide or greater.
7. WHEN a navigation link is hovered, THE Navbar SHALL change its text color to `theme_color` within 200 milliseconds.
8. THE Navbar SHALL display a hamburger icon button on viewports narrower than 768 px; WHEN the hamburger is tapped, THE Navbar SHALL expand a dropdown containing all navigation links and portal buttons; WHEN tapped again, THE Navbar SHALL collapse the dropdown.
9. THE Navbar SHALL render the school name from the `name` API field; THE Navbar SHALL NOT contain any hardcoded school name or logo path in the component source.
10. THE Navbar SHALL link the Login button to `portal_link`; THE Navbar SHALL derive the Register URL from `portal_link` by replacing `/login` with `/register`, or `login` with `register`, or defaulting to `/register` if neither substring is present.

---

### Requirement 3: Full-Width Hero Section with Background Image

**User Story:** As a visitor, I want the hero section to make a strong first impression using the school's own imagery and branding, so that the school's identity is immediately communicated.

#### Acceptance Criteria

1. THE Hero SHALL render as a section with a minimum height equal to 100% of the current viewport height (equivalent to `min-h-screen`) with the `hero_image` URL from the API applied as a CSS `background-image`, sized to `cover`, and positioned at `center`.
2. THE Hero SHALL display a full-width overlay `div` above the background image with background set to `secondary_color` at an opacity between 0.55 and 0.75, so that white text placed above it achieves a WCAG AA contrast ratio (≥ 4.5:1) for normal text.
3. THE Hero SHALL vertically and horizontally center all text content and the CTA button within the section using flexbox or grid centering.
4. THE Hero SHALL display the school's `name` from the API as an uppercase label in `text-sm` font size or smaller, rendered above the main `h1` heading.
5. THE Hero SHALL display `tagline` from the API as a subtitle line rendered below the school name label and above the main heading.
6. THE Hero SHALL render `hero_title` from the API inside an `h1` element with `font-bold` weight and a minimum font size of `text-4xl` (2.25 rem) on viewports narrower than 640 px and `text-6xl` (3.75 rem) or larger on viewports of 640 px and wider.
7. THE Hero SHALL display `hero_description` from the API as a paragraph element beneath the `h1`.
8. THE Hero SHALL display a primary CTA button with its `href` set to `portal_link` from the API; the button background SHALL be set to `theme_color`; the button label SHALL be a generic action term (e.g., "Visit Portal" or "Student Portal") and SHALL NOT be a hardcoded school-specific string.
9. IF `hero_image` is null, empty, or absent from the API, THEN THE Hero SHALL render a CSS gradient background using `secondary_color` instead of a background image.
10. IF the browser fires an image load error for `hero_image`, THE Hero SHALL fall back to the gradient background described in criterion 9.
11. THE Hero SHALL NOT contain any hardcoded school name, tagline, image path, or description text in the component source.

---

### Requirement 4: About Section with Layered Image Composition

**User Story:** As a visitor, I want the About section to feel visually premium with overlapping images, so that the school looks professional and trustworthy.

#### Acceptance Criteria

1. THE About SHALL display the `about_image` URL from the API as the `src` of a primary `img` element with rounded corners (`border-radius` ≥ 12 px) and a visible drop shadow on desktop viewports (≥ 768 px wide), placed on the left side of the section.
2. THE About SHALL display the `secondary_image` URL from the API as a smaller secondary `img` element positioned to visually overlap or offset the primary image (absolute or negative margin positioning), creating a layered composition visible on desktop viewports (≥ 768 px wide).
3. THE About SHALL display the `about`, `mission`, `vision`, and `core_values` fields on the right side of a two-column layout on desktop viewports (≥ 768 px wide) and stacked below the images in a single column on viewports narrower than 768 px.
4. THE About SHALL display `mission` and `vision` in separate card elements, each with a left border of 4 px solid using `theme_color` or `accent_color`.
5. THE About SHALL display each entry in `core_values` as a badge/chip element with `theme_color` applied at an opacity of 0.10–0.20 as the background color.
6. IF both `about_image` and `secondary_image` are null, empty, or absent, THEN THE About SHALL render in a single-column layout at full width, omitting the image column entirely.
7. IF only one image field is present, THE About SHALL render only that image without the layered composition.
8. THE About SHALL include the school `name` from the API in the section heading; THE About SHALL NOT contain a hardcoded school name in the component source.
9. THE About SHALL render a small uppercase eyebrow label (e.g., "About Us") above the section heading, with its color set to `theme_color`.

---

### Requirement 5: Statistics Section

**User Story:** As a visitor, I want to see key school metrics displayed clearly and attractively, so that I get an immediate sense of the school's scale and achievements.

#### Acceptance Criteria

1. THE SchoolStats SHALL render exactly one card element per entry in the `statistics` array from the API.
2. EACH statistics card SHALL display the `value` field in a font size of at least `text-3xl` (1.875 rem) with `font-bold` weight.
3. EACH statistics card SHALL display the `label` field beneath the value in a font size of `text-sm` (0.875 rem) or `text-base` (1 rem) with a muted color (e.g., `text-gray-600` or equivalent).
4. THE SchoolStats SHALL apply a CSS gradient combining `secondary_color` and `accent_color` as the background of an icon/accent element (square or circle shape) on each card.
5. WHEN a statistics card is hovered, THE SchoolStats SHALL apply a vertical translate of `-4 px` (equivalent to `-translate-y-1`) and a box-shadow that is visibly elevated above the card's resting shadow state, both transitions completing within 300 milliseconds.
6. IF a statistics entry has an empty or absent `value` field, THEN THE SchoolStats SHALL omit that entry's card from the rendered output.
7. IF the `statistics` array is empty, null, or absent, THEN THE SchoolStats SHALL render nothing (return null / render no DOM output).
8. THE SchoolStats SHALL NOT contain any hardcoded statistic value or label in the component source.

---

### Requirement 6: Features Section

**User Story:** As a visitor, I want to see the school's key features displayed in a clean card grid so that I can quickly understand what makes the school distinctive.

#### Acceptance Criteria

1. THE Features SHALL render exactly one card element per entry in the `features` array from the API.
2. EACH features card SHALL display the feature `icon`, `title`, and `description` fields from the API; IF the `icon` field is absent for an entry, THE Features SHALL render the card without an icon element rather than a broken placeholder.
3. THE Features SHALL apply a 4 px solid top border to each card using `accent_color` (the left-accent pattern for mission/vision uses `theme_color`; the card top border uses `accent_color` to differentiate card types).
4. WHEN a features card is hovered, THE Features SHALL apply a scale transform that makes the card visibly larger (equivalent to `scale(1.05)`) and increase the box-shadow to a visibly deeper elevation, both completing within 300 milliseconds.
5. THE Features SHALL display cards in a responsive grid of 1 column on viewports narrower than 768 px, 2 columns on viewports between 768 px and 1023 px, and 3 columns on viewports of 1024 px and wider.
6. THE Features SHALL render a small uppercase eyebrow label (e.g., "Why Choose Us") above the section heading with its color set to `theme_color`; this label SHALL NOT contain any hardcoded school name.
7. THE Features SHALL render the section heading using the school `name` from the API (e.g., "Why Families Choose {name}"); THE Features SHALL NOT contain a hardcoded school-specific name in any rendered text.
8. IF the `features` array is empty, null, or absent, THEN THE Features SHALL render a built-in default list of at least 3 entries, each with a non-empty title and description.

---

### Requirement 7: Programmes Section

**User Story:** As a prospective student or parent, I want to browse the school's academic programmes in a visual card layout so that I can understand the available study paths.

#### Acceptance Criteria

1. THE Programs SHALL render exactly one card element per entry in the `programs` array from the API.
2. EACH programme card SHALL display: the `icon` field (if present); the `name` field if non-empty, otherwise the `title` field; and the `description` field; IF both `name` and `title` are absent, THE Programs SHALL render a placeholder text such as "Programme".
3. WHEN a programme card is hovered, THE Programs SHALL apply a vertical translate of `-8 px` (upward lift) with a CSS transition duration of 300 milliseconds.
4. THE Programs SHALL display cards in a responsive grid of 1 column on viewports narrower than 768 px, 2 columns on viewports between 768 px and 1023 px, and 3 columns on viewports of 1024 px and wider.
5. THE Programs SHALL render a section label, heading, and sub-description that contain no hardcoded institution name, location, or proprietary branding term; all section copy SHALL be generic or derived from the API.
6. THE Programs SHALL apply `theme_color` as the background color of the "Explore" button on every card, with no alternation between `theme_color` and `accent_color` across cards.
7. IF the `programs` array is empty, null, or absent, THEN THE Programs SHALL render a built-in default list of at least 6 entries, each with a non-empty icon, name, and description.

---

### Requirement 8: Call to Action Section

**User Story:** As a visitor, I want a clear and compelling CTA section to encourage me to access the school portal, so that I know exactly what my next step is.

#### Acceptance Criteria

1. THE CallToAction SHALL use `secondary_color` from the API as the background color of the section container element.
2. THE CallToAction SHALL display `cta.title` from the API as the primary heading and `cta.description` as the supporting paragraph.
3. THE CallToAction SHALL display a primary CTA button with `href` set to `portal_link`; the button's background color SHALL be `theme_color` from the API.
4. THE CallToAction SHALL display a secondary button linking to `#about` with a transparent background and a visible border (e.g., `1 px solid rgba(255,255,255,0.3)` or equivalent).
5. IF `cta.title` is null, empty, or absent, THEN THE CallToAction SHALL render the `DEFAULT_LANDING_PAGE.cta.title` value from `landingPageService.js`.
6. IF `cta.description` is null, empty, or absent, THEN THE CallToAction SHALL render the `DEFAULT_LANDING_PAGE.cta.description` value from `landingPageService.js`.
7. IF `portal_link` is null, empty, or absent, THEN THE CTA primary button `href` SHALL fall back to `contact.portal_url`, and if that is also absent, SHALL default to `/login`.
8. THE CallToAction SHALL NOT contain any hardcoded school name, description text, or portal URL in the component source.

---

### Requirement 9: Contact Section

**User Story:** As a prospective student or parent, I want to find contact information and be able to send a message, so that I can reach the school directly.

#### Acceptance Criteria

1. THE Contact SHALL display the `contact.description` field from the API; IF `contact.description` is null, empty, or absent, THE Contact SHALL display the `DEFAULT_LANDING_PAGE.contact.description` value from `landingPageService.js`.
2. THE Contact SHALL display a portal link button with `href` set to `contact.portal_url` if present and non-empty, otherwise `portal_link`; the button's background color SHALL be `accent_color`; the button label SHALL be a generic action term (e.g., "Visit Portal").
3. THE Contact SHALL render a contact form containing three fields: Name (text input, required), Email (email input, required, validated for email format before submission), and Message (textarea, required).
4. WHEN the contact form is submitted with all fields valid, THE Contact SHALL display a visible success message and clear the form fields; the success message SHALL remain visible for at least 3 seconds.
5. WHEN the contact form is submitted with one or more fields invalid or empty, THE Contact SHALL prevent submission and display a validation error message adjacent to each invalid field.
6. IF `contact.email` is present and non-empty in the API data, THE Contact SHALL render it as a visible email address in the contact information area.
7. IF `contact.phone` is present and non-empty in the API data, THE Contact SHALL render it as a visible phone number in the contact information area.
8. IF `contact.address` is present and non-empty in the API data, THE Contact SHALL render it as a visible address in the contact information area.
9. THE Contact SHALL NOT contain any hardcoded school-specific contact details, explanatory developer notes, or placeholder copy in the component source.

---

### Requirement 10: Footer

**User Story:** As a visitor who has reached the bottom of the page, I want to see professional footer content with the school's identity and quick navigation links, so that I can trust the school's online presence.

#### Acceptance Criteria

1. THE Footer SHALL use `secondary_color` from the API as its background color.
2. THE Footer SHALL display the school logo (`logo` field), school `name`, and the `footer.copyright` field from the API.
3. THE Footer SHALL display navigation quick links: About, Features, Programs, Contact, Login, Register — each linking to the corresponding section anchor or portal URL.
4. THE Footer SHALL link the Login button to `portal_link`; THE Footer SHALL derive the Register URL from `portal_link` using the same algorithm as the Navbar (replace `/login` with `/register`, or `login` with `register`, or default to `/register`); IF `portal_link` is absent, both links SHALL default to `/login` and `/register` respectively.
5. THE Footer SHALL read the school description/tagline from the API (`tagline` or `about`) for the footer brand column description; THE Footer SHALL NOT contain a hardcoded institution-specific description string in the component source.
6. THE Footer SHALL display `footer.company_name` from the API in the copyright row; THE Footer SHALL NOT contain a hardcoded company name.
7. IF `footer.copyright` is null, empty, or absent, THEN THE Footer SHALL generate a copyright string in the exact format: `© {currentYear} {name}. All rights reserved.` using the current calendar year and the `name` field from the API.
8. THE Footer SHALL NOT render any static hardcoded description text, placeholder notes, or any text that references a specific school by name or location in the component source.

---

### Requirement 11: Consistent Section Spacing and Typography Hierarchy

**User Story:** As a visitor, I want every section to feel consistently spaced and visually organized, so that the page is easy to scan and read.

#### Acceptance Criteria

1. EACH content section (Hero excluded) SHALL apply vertical padding of at least 64 px (equivalent to `py-16`) on both the top and bottom; responsive increases (e.g., `sm:py-20`, `lg:py-24`) are permitted.
2. EACH section's eyebrow label element — the small badge rendered above a section heading — SHALL have a font size of 0.875 rem or smaller (`text-sm`), `text-transform: uppercase`, and `letter-spacing` of at least 0.05 em (`tracking-wide`), with its color set to `theme_color`.
3. EACH section heading SHALL be rendered at a minimum font size of `text-3xl` (1.875 rem) on viewports narrower than 640 px.
4. EACH section heading SHALL be rendered at a minimum font size of `text-4xl` (2.25 rem) on viewports of 640 px and wider.
5. EACH section heading SHALL have `font-weight: bold` (700 or greater).
6. EACH section's content area SHALL be constrained to a maximum width of `max-w-6xl` (72 rem) and centered horizontally within the viewport using auto horizontal margins, with responsive horizontal padding of `px-4` at mobile, `sm:px-6` at ≥ 640 px, and `lg:px-8` at ≥ 1024 px.
7. THE Landing_Page SHALL NOT override the `font-family` set by `index.css` (`Manrope, Segoe UI, sans-serif`) in any individual section component.
8. ALL paragraph and body-copy `<p>` elements SHALL have a `line-height` of 1.625 or greater (equivalent to `leading-relaxed`).

---

### Requirement 12: Mobile-First Responsiveness

**User Story:** As a visitor on a mobile device, I want the landing page to be fully usable and visually coherent, so that the school's online presence works on any device.

#### Acceptance Criteria

1. IF the viewport is narrower than 768 px, THEN all two-column side-by-side layouts in the About and Contact sections SHALL stack into a single column.
2. IF the viewport is narrower than 768 px, THEN THE Navbar SHALL hide all navigation links and portal buttons and display a hamburger icon button; WHEN the hamburger is activated, THE Navbar SHALL reveal a dropdown containing all navigation links with a minimum tap-target height of 44 px per link.
3. THE Hero section SHALL occupy at minimum the full height of the current viewport (100 vh equivalent) on all viewport widths.
4. IF the viewport is narrower than 768 px, THE Features and Programs card grids SHALL each display exactly 1 card per row.
5. IF the viewport is between 768 px and 1023 px, THE Features and Programs card grids SHALL each display exactly 2 cards per row.
6. IF the viewport is 1024 px or wider, THE Features and Programs card grids SHALL each display 3 cards per row.
7. ALL `img` elements throughout the Landing_Page SHALL have a `max-width` of 100% applied so that no image overflows its container on narrow viewports.
8. THE outermost page wrapper element SHALL have `overflow-x: hidden` applied to prevent horizontal scrolling caused by decorative or absolutely positioned elements.

---

### Requirement 13: Animations and Transitions

**User Story:** As a visitor, I want subtle animations on the page that feel modern and purposeful, so that the experience feels polished without being distracting.

#### Acceptance Criteria

1. WHEN the Landing_Page first renders (on mount), section content SHALL fade in with an opacity transition from 0 to 1 over approximately 500 milliseconds.
2. WHEN section content enters the viewport during scroll, THE Landing_Page SHALL apply a fade-in animation (opacity 0 → 1) to section containers, completing within 500 milliseconds.
3. WHEN a button, card, or nav link is hovered, THE Landing_Page SHALL apply a CSS transition on the targeted property (background-color, transform, box-shadow, color) completing within 200–300 milliseconds.
4. THE Navbar background transition (transparent to solid on scroll) SHALL complete within 300 milliseconds as specified in Requirement 2.
5. THE Landing_Page SHALL NOT use animations that cause layout shift; all animated elements SHALL have stable, reserved dimensions before animation begins, maintaining a Cumulative Layout Shift (CLS) score below 0.1.
6. WHILE the API data is loading, THE Landing_Page SHALL display the `LandingPageLoader` skeleton component and SHALL NOT render any section components.
7. WHEN the API data has successfully loaded, THE Landing_Page SHALL replace the skeleton with the full page content.
8. WHEN the API call fails, THE Landing_Page SHALL render the full page using `DEFAULT_LANDING_PAGE` fallback data, not the skeleton or an error screen.
9. WHERE the user has `prefers-reduced-motion: reduce` set in their OS accessibility settings, THE Landing_Page SHALL suppress all fade-in and slide animations while preserving functional hover-state color and shadow transitions.

---

### Requirement 14: No Hardcoded School Content

**User Story:** As a product developer, I want the landing page template to be completely school-agnostic, so that it can serve any school that configures its API data without requiring code changes.

#### Acceptance Criteria

1. THE Landing_Page SHALL NOT render any visible text string in the browser that identifies a specific school, institution, location, or proprietary brand identity from a hardcoded literal in the component source.
2. THE Features component SHALL NOT contain a hardcoded school name in any section heading or descriptive copy; the section heading SHALL be constructed dynamically using the `name` field from the API (e.g., `Why Families Choose ${name}`).
3. THE Footer component's brand description column SHALL render content driven by `schoolData.tagline` or `schoolData.about` from the API; THE Footer component source SHALL NOT contain a hardcoded description string referencing any specific school.
4. THE Contact component SHALL NOT contain the "School Note" card or any explanatory developer-note paragraph that references the preview or testing context; all contact section copy SHALL be derived from the API or from `DEFAULT_LANDING_PAGE`.
5. WHEN any text field is absent (null, empty string, or missing key) from the API response, THE Landing_Page SHALL render the corresponding value from `DEFAULT_LANDING_PAGE` in `landingPageService.js`; inline fallback strings in component JSX SHALL match the `DEFAULT_LANDING_PAGE` values exactly rather than being independently authored.
