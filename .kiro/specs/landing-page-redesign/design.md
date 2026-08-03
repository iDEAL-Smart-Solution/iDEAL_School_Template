# Design Document — Landing Page Redesign

## Overview

This document describes the technical design for the premium redesign of the school landing page. The goal is to upgrade visual quality to a modern, polished standard while keeping every piece of visible content 100% dynamic from the Landing Page REST API. No school-specific text, image URL, color value, or branding string may be hardcoded inside any component.

### Scope Summary

The redesign touches every existing section component but does not rename, move, or remove any file. The component tree, data-flow pipeline (`useSchoolData` → `fetchPublicLandingPage` → REST API), and CSS custom-property strategy are all preserved and extended. Specific bugs identified in the current implementation are fixed as part of this work:

| # | Component | Bug |
|---|-----------|-----|
| 1 | Navbar | Sticky/solid always — needs transparent-to-solid scroll behavior |
| 2 | Hero | No background image — needs `hero_image` as CSS `background-image` with overlay |
| 3 | About | Uses `logo` instead of `about_image`/`secondary_image` — needs layered composition |
| 4 | Features | Hardcoded school name in heading |
| 5 | Programs | "Explore" button alternates between theme and accent color |
| 6 | Contact | Hardcoded "School Note" developer card |
| 7 | Footer | Hardcoded description string in brand column |
| 8 | SchoolStats | Hover `box-shadow` elevation missing |

---

## Architecture

### Component Tree

```
App
└── SchoolLandingPage          (pages/SchoolLandingPage.jsx)
    ├── LandingPageLoader      (skeleton, shown while loading)
    └── [loaded]
        ├── Navbar             fixed, z-50, transparent-to-solid
        ├── Hero               min-h-screen, bg-image + overlay
        ├── SchoolStats        statistics cards grid
        ├── About              layered image + text columns
        ├── Features           feature card grid
        ├── Programs           program card grid
        ├── CallToAction       full-bleed CTA band
        ├── Contact            contact info + form
        ├── Footer             multi-column footer
        └── ScrollToTopButton  fixed, visible after 300px scroll
```

### Data Flow

```
Browser hostname
        │
        ▼
useSchoolData()                         (hooks/useSchoolData.js)
        │  GET /api/LandingPage/public?domainName=<host>
        ▼
fetchPublicLandingPage()               (services/landingPageService.js)
        │  normalizeLandingPageData()
        │  fallback: DEFAULT_LANDING_PAGE
        ▼
schoolData: LandingPageData            (fully typed, never null)
        │
        ├─ CSS custom props → root wrapper (SchoolLandingPage)
        └─ schoolData prop → every section component
```

`schoolData` is guaranteed to be a non-null `LandingPageData` object before any section component renders, because:
1. `loading === true` renders `LandingPageLoader` instead.
2. API failure returns `DEFAULT_LANDING_PAGE` fallback rather than `null`.

---

## Components and Interfaces

### SchoolLandingPage (`pages/SchoolLandingPage.jsx`)

**Responsibilities**
- Orchestrates data loading and delegates to `LandingPageLoader` while `loading` is true.
- Sets CSS custom properties on the root `<div>` wrapper once data arrives.
- Passes `schoolData` to all section components.
- Manages browser chrome (title, favicon, theme-color meta) via a `useEffect`.

**CSS Custom Property Strategy**

The root wrapper's `style` prop is the single source of truth for all theme tokens:

```jsx
style={{
  '--lp-theme':     resolveColor(schoolData.theme_color,     DEFAULT.theme_color),
  '--lp-secondary': resolveColor(schoolData.secondary_color, DEFAULT.secondary_color),
  '--lp-accent':    resolveColor(schoolData.accent_color,    DEFAULT.accent_color),
  '--lp-bg':        resolveColor(schoolData.background_color,DEFAULT.background_color),
  '--lp-text':      resolveColor(schoolData.text_color,      DEFAULT.text_color),
  backgroundColor:  'var(--lp-bg)',
  color:            'var(--lp-text)',
}}
```

Section components reference `var(--lp-theme)` etc. for decorative accents; for layout-critical colors (button backgrounds, overlay fills) they read from `schoolData` directly and pass through `resolveColor` locally so the value is known at paint time and not deferred through CSS inheritance.

**Constraint: Color-flood rule (Req 1.8)**
`theme_color` and `secondary_color` must NOT fill a full-viewport-width element taller than 20vh except in:
- Footer background
- CTA section background
- Hero overlay div

All other usages are tints (≤ 20% opacity), borders, or small icon backgrounds.

---

### Navbar (`components/Navbar.jsx`)

**Fix applied:** transparent-to-solid scroll behavior; `position: fixed` overlapping Hero.

**Scroll-Detection Pattern**

```jsx
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handler = () => setScrolled(window.scrollY > 60);
  window.addEventListener('scroll', handler, { passive: true });
  handler(); // run once on mount to handle pre-scrolled state
  return () => window.removeEventListener('scroll', handler);
}, []);
```

The `handler` is registered as `passive` to avoid blocking the main thread. `handler()` is called once on mount so SSR/hydration edge cases resolve correctly.

**Style computation** (pure function, easily testable):

```js
// Derived from scrolled state — no imperative DOM mutation
const navStyle = scrolled
  ? { backgroundColor: resolveColor(secondary_color, DEFAULT.secondary_color) }
  : { backgroundColor: 'rgba(0, 0, 0, 0)' };
```

**Transition**: `transition-all duration-300` on the `<nav>` element provides the 300 ms CSS transition for both background-color and backdrop-blur changes.

**Positioning change** (from `sticky` to `fixed`):
```jsx
<nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ...">
```

The Hero section receives `pt-[72px]` (or equivalent Navbar height) via its own container to prevent content from starting behind the fixed nav at scroll position 0.

**Navigation link hover**: Links gain `hover:text-[var(--lp-theme)]` or `style={{ '--hover-color': theme_color }}` with a CSS transition of `transition-colors duration-200`.

**No hardcoded content**: school `name` and `logo` come exclusively from `schoolData`. The `deriveRegisterLink` helper (already in source) handles Register URL derivation.

---

### Hero (`components/Hero.jsx`)

**Fix applied:** Replace gradient-only background with `hero_image` CSS background-image + overlay div.

**Background-Image + Overlay Pattern**

```jsx
// 1. Determine background source
const bgUrl = normalizeMediaUrl(hero_image, '');
const hasImage = Boolean(bgUrl);

// 2. Root section style
const sectionStyle = hasImage
  ? {
      backgroundImage: `url(${bgUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }
  : {
      background: `linear-gradient(135deg, ${secondary} 0%, #111827 68%, ${secondary} 100%)`,
    };

// 3. Overlay div (always rendered when image is present)
const overlayStyle = {
  backgroundColor: secondary,
  opacity: 0.65,  // within the 0.55–0.75 WCAG AA range
};
```

**Structure**:
```jsx
<section className="relative min-h-screen overflow-hidden" style={sectionStyle}>
  {hasImage && (
    <div className="absolute inset-0" style={overlayStyle} aria-hidden="true" />
  )}
  {/* Image error fallback */}
  {hasImage && (
    <img
      src={bgUrl}
      alt=""
      className="sr-only"
      onError={() => setImgError(true)}
    />
  )}
  {/* Content — relative z-10 so it sits above overlay */}
  <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
    {/* eyebrow: school name */}
    <span className="mb-3 inline-block rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80">
      {name}
    </span>
    {/* tagline */}
    <p className="mb-2 text-sm font-medium text-white/70 tracking-wide">{tagline}</p>
    {/* h1 */}
    <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-6xl">
      {hero_title}
    </h1>
    {/* description */}
    <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/80">
      {hero_description}
    </p>
    {/* CTA buttons */}
    ...
  </div>
</section>
```

**Image error fallback**: A hidden `<img>` element with `onError` sets a `imgError` state flag; when true, `sectionStyle` switches to the gradient. This handles the case where the URL is non-empty but the image fails to load (Req 3.10).

**Layout note**: `min-h-screen` uses the CSS `min-height: 100vh` equivalent. Content is centered using `flex flex-col items-center justify-center`.

---

### About (`components/About.jsx`)

**Fix applied:** Replace `logo` usage with `about_image` (primary) and `secondary_image` (layered secondary). Use left-border cards for Mission/Vision.

**Layered Image Composition Pattern**

```jsx
const primaryImg  = normalizeMediaUrl(about_image,    '');
const secondaryImg = normalizeMediaUrl(secondary_image, '');
const hasAnyImage  = Boolean(primaryImg || secondaryImg);
const hasBoth      = Boolean(primaryImg && secondaryImg);
```

Structure of the image column (desktop):
```jsx
<div className="relative hidden md:block">
  {/* Primary image — fills the column, rounded, shadowed */}
  {primaryImg && (
    <img
      src={primaryImg}
      alt={name}
      className="h-[420px] w-full rounded-2xl object-cover shadow-2xl"
    />
  )}
  {/* Secondary image — absolute, overlapping bottom-right corner */}
  {hasBoth && (
    <img
      src={secondaryImg}
      alt=""
      className="absolute -bottom-6 -right-6 h-40 w-40 rounded-2xl object-cover shadow-xl
                 ring-4 ring-white"
      aria-hidden="true"
    />
  )}
  {/* Accent blob behind secondary image */}
  <div
    className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full blur-2xl opacity-20 -z-10"
    style={{ backgroundColor: accent }}
    aria-hidden="true"
  />
</div>
```

**Layout rules**:
- Both images present → `grid-cols-1 md:grid-cols-2` layout with image on left.
- Only one image → same two-column layout, single image without overlap.
- Neither image → `grid-cols-1` full-width text layout (Req 4.6).

**Mission / Vision cards** — left-border accent using `theme_color` (Req 4.4):
```jsx
<div
  className="rounded-2xl bg-slate-50 p-5"
  style={{ borderLeft: `4px solid ${resolveColor(theme_color, DEFAULT.theme_color)}` }}
>
```

**Core values** badges (Req 4.5):
```jsx
<span
  className="rounded-full px-4 py-2 text-sm font-semibold"
  style={{
    backgroundColor: `${resolveColor(theme_color, DEFAULT.theme_color)}1a`, // ~10% opacity hex
    color: secondary,
  }}
>
```

**Eyebrow label** color = `theme_color` (Req 4.9).

---

### SchoolStats (`components/SchoolStats.jsx`)

**Fix applied:** Add `box-shadow` elevation to the hover state.

**Hover state** (Req 5.5):
```jsx
<div
  className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300
             hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
  style={{ borderColor: 'rgba(26,26,46,0.12)' }}
>
```

The `hover:shadow-[...]` Tailwind arbitrary value adds the elevated `box-shadow` on hover. Both `-translate-y-1` and the shadow change are covered by `transition-all duration-300`.

**Card icon accent**: gradient using `secondary_color` → `accent_color` (Req 5.4):
```jsx
<div
  className="mb-3 h-12 w-12 rounded-2xl flex items-center justify-center text-lg font-bold text-white"
  style={{ background: `linear-gradient(135deg, ${secondary}, ${accent})` }}
>
```

**Empty-value filtering** (Req 5.6): Cards where `item.value` is empty are skipped in the `.map()` via a `.filter(item => Boolean(item.value))` before rendering.

**Null/absent array guard** (Req 5.7): Component returns `null` if `!schoolData?.statistics?.length`.

---

### Features (`components/Features.jsx`)

**Fix applied:** Replace hardcoded school name in heading with `{schoolData.name}`.

**Section heading** (Req 6.7):
```jsx
<h2 className="mb-4 text-3xl font-bold sm:text-4xl" style={{ color: secondary }}>
  Why Families Choose {name}
</h2>
```

`name` is read from `schoolData.name` — no inline fallback string other than `DEFAULT_LANDING_PAGE.name`.

**Eyebrow label** (Req 6.6): generic copy "Why Choose Us", color = `theme_color`. No school name in the badge.

**Card top-border**: 4px solid `accent_color` (Req 6.3):
```jsx
style={{ borderTop: `4px solid ${resolveColor(accent_color, DEFAULT.accent_color)}` }}
```

**Hover** (Req 6.4): `hover:scale-105 hover:shadow-xl transition-all duration-300`.

**Responsive grid** (Req 6.5): `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.

**Default list fallback** (Req 6.8): existing `defaultFeatures` array (6 items) is used when `schoolData.features` is empty.

---

### Programs (`components/Programs.jsx`)

**Fix applied:** Remove `idx % 2 === 0` alternation; always use `theme_color` for the Explore button.

**Button color** (Req 7.6):
```jsx
// BEFORE (bug):
style={{ backgroundColor: idx % 2 === 0 ? primary : accent, color: secondary }}

// AFTER (fixed):
style={{ backgroundColor: resolveColor(theme_color, DEFAULT.theme_color), color: secondary }}
```

**Card hover** (Req 7.3): `hover:-translate-y-2 transition-transform duration-300` (8px upward lift).

**Card name resolution** (Req 7.2):
```jsx
const displayName = program.name || program.title || 'Programme';
```

**Section copy** (Req 7.5): all text generic — no school name, no location.

**Responsive grid** (Req 7.4): `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.

**Default list fallback** (Req 7.7): existing `defaultPrograms` array (8 items) retained.

---

### CallToAction (`components/CallToAction.jsx`)

**Section background** (Req 8.1): `secondary_color` from API — already correct in current implementation.

**Primary CTA button** (Req 8.3): background = `theme_color` (currently uses `accent`; fix needed):
```jsx
// BEFORE:
style={{ backgroundColor: accent }}

// AFTER:
style={{ backgroundColor: resolveColor(theme_color, DEFAULT.theme_color) }}
```

**Secondary button** (Req 8.4): transparent with `border border-white/30` — already correct.

**Portal link fallback** (Req 8.7):
```jsx
const portalHref =
  portal_link ||
  schoolData.contact?.portal_url ||
  '/login';
```

**No hardcoded content** (Req 8.8): `cta.title` and `cta.description` read from `schoolData.cta`; fallback to `DEFAULT_LANDING_PAGE.cta.*`.

---

### Contact (`components/Contact.jsx`)

**Fix applied:** Remove the hardcoded "School Note" developer card; add per-field client-side validation with error display.

**Removal of "School Note" card** (Req 9.9 / 14.4):
The second `<div>` block with the dashed border and "School Note" paragraph is deleted entirely. The contact info column will instead display `contact.email`, `contact.phone`, and `contact.address` from the API when present (Req 9.6, 9.7, 9.8), each behind a conditional render guard.

**Portal button** (Req 9.2): background = `accent_color`, label = "Visit Portal" (generic).

**Form Validation Approach** (Req 9.3, 9.4, 9.5):

State shape:
```js
const [formData, setFormData]   = useState({ name: '', email: '', message: '' });
const [errors, setErrors]       = useState({ name: '', email: '', message: '' });
const [submitted, setSubmitted] = useState(false);
```

Validation function (pure, testable):
```js
// src/utils/formValidation.js  (new utility)
export const validateEmail = (value) => {
  if (!value) return 'Email is required.';
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value.trim()) ? '' : 'Please enter a valid email address.';
};

export const validateRequired = (value, label) => {
  return value.trim() ? '' : `${label} is required.`;
};

export const validateContactForm = ({ name, email, message }) => ({
  name:    validateRequired(name, 'Name'),
  email:   validateEmail(email),
  message: validateRequired(message, 'Message'),
});

export const isFormValid = (errors) =>
  Object.values(errors).every((msg) => msg === '');
```

`handleSubmit` flow:
```js
const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = validateContactForm(formData);
  setErrors(newErrors);
  if (!isFormValid(newErrors)) return;  // block submission
  // Success path
  setSubmitted(true);
  setFormData({ name: '', email: '', message: '' });
  setErrors({ name: '', email: '', message: '' });
  setTimeout(() => setSubmitted(false), 3000);
};
```

Error display (adjacent to each field, Req 9.5):
```jsx
{errors.email && (
  <p role="alert" className="mt-1 text-sm text-red-600">{errors.email}</p>
)}
```

---

### Footer (`components/Footer.jsx`)

**Fix applied:** Replace hardcoded brand description with `schoolData.tagline || schoolData.about`.

**Brand description** (Req 10.5 / 14.3):
```jsx
// BEFORE:
<p className="text-gray-400 mb-4">
  Excellence through discipline, academic rigor, leadership training, and holistic student development.
</p>

// AFTER:
const brandDescription =
  getReadableText(schoolData.tagline, '') ||
  getReadableText(schoolData.about, DEFAULT_LANDING_PAGE.tagline);

<p className="text-gray-400 mb-4">{brandDescription}</p>
```

`getReadableText` is already exported from `landingPageTheme.js`.

**Copyright fallback** (Req 10.7):
```jsx
const copyrightText =
  footer?.copyright ||
  `© ${new Date().getFullYear()} ${name}. All rights reserved.`;
```

This already exists and is correct; no change needed.

**Register URL derivation** (Req 10.4): `deriveRegisterLink` helper (same algorithm as Navbar) is applied.

**Background** (Req 10.1): `secondary_color` from API — already correct.

---

### LandingPageLoader (`components/LandingPageLoader.jsx`)

No functional changes required. The existing skeleton layout correctly prevents any section component from rendering during data load (Req 13.6). Visual improvements (e.g., shimmer gradient) are cosmetic and may be applied without altering behavior.

---

## Data Models

### `LandingPageData` (normalized output of `normalizeLandingPageData`)

```ts
interface LandingPageData {
  // Identity
  name:             string;   // school name, never empty (DEFAULT fallback)
  logo:             string;   // image URL or "/logo.png"
  tagline:          string;
  founded_year:     string;   // may be empty

  // Theme tokens
  theme_color:      string;   // CSS color string
  secondary_color:  string;
  accent_color:     string;
  background_color: string;
  text_color:       string;

  // Hero
  hero_title:       string;
  hero_description: string;
  hero_image:       string;   // image URL; may be "/logo.png" if absent in API

  // About
  about:            string;
  about_image:      string;
  secondary_image:  string;
  mission:          string;
  vision:           string;
  core_values:      string[];

  // Sections
  statistics:       Array<{ value: string; label: string }>;
  features:         Array<{ icon: string; name: string; title: string;
                            description: string; details: string }>;
  programs:         Array<{ icon: string; name: string; title: string;
                            description: string; details: string }>;

  // Linking
  portal_link:      string;
  contact: {
    email:       string;
    phone:       string;
    address:     string;
    description: string;
    portal_url:  string;
  };
  footer: {
    copyright:    string;
    company_name: string;
  };
  cta: {
    title:       string;
    description: string;
  };
}
```

All fields are guaranteed to be non-null strings (or typed arrays/objects) because `normalizeLandingPageData` applies `getString` / `getArray` with `DEFAULT_LANDING_PAGE` fallbacks throughout.

### New Utility: `src/utils/formValidation.js`

```ts
validateEmail(value: string): string          // '' = valid, non-empty = error message
validateRequired(value: string, label: string): string
validateContactForm(fields: { name, email, message }): { name, email, message }
isFormValid(errors: { name, email, message }): boolean
```

This is a pure utility module with no React dependencies, making it straightforward to unit-test and property-test.

---

## Intersection Observer Pattern for Scroll-Triggered Animations

Section containers use a shared `useIntersectionObserver` pattern for fade-in-on-scroll animations (Req 13.2).

### `useRevealOnScroll` Hook (new, in `src/hooks/useRevealOnScroll.js`)

```js
import { useEffect, useRef, useState } from 'react';

/**
 * Returns [ref, isVisible]. Attach `ref` to the element to observe.
 * Once the element enters the viewport, isVisible becomes true and
 * stays true (no re-hide on scroll-out).
 */
export const useRevealOnScroll = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // fire once
        }
      },
      { threshold: 0.12, ...options },
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};
```

Usage in a section component:
```jsx
const [sectionRef, isVisible] = useRevealOnScroll();

<section
  ref={sectionRef}
  className={`transition-all duration-500 ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
  }`}
>
```

### `prefers-reduced-motion` Handling (Req 13.9)

The CSS transitions must be suppressed for users who opt out of motion via OS/browser settings. Two layers of defense:

**Layer 1 — CSS (index.css)**:
```css
@media (prefers-reduced-motion: reduce) {
  .animate-fadeIn,
  .animate-slideInLeft,
  .animate-slideInRight,
  .animate-slideUp,
  .animate-reveal,
  .animate-reveal-delayed {
    animation: none !important;
  }

  /* Suppress opacity/translate transitions on section reveal */
  [data-reveal] {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

**Layer 2 — Hook awareness**:
```js
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// In useRevealOnScroll — start visible immediately if reduced motion
const [isVisible, setIsVisible] = useState(prefersReduced);
```

When `prefersReduced` is true, the element starts in the visible state, so no opacity/translate transition ever fires. Hover-state color and shadow transitions (controlled by `transition-colors`, `transition-shadow`) are not suppressed, as these are functional feedback rather than decorative animation.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: CSS Custom Property Mapping

*For any* `LandingPageData` object with non-empty color fields, the style object produced for the root wrapper SHALL have `--lp-theme`, `--lp-secondary`, `--lp-accent`, `--lp-bg`, and `--lp-text` equal to the corresponding input color field values respectively.

**Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5**

---

### Property 2: Color Fallback Invariant

*For any* color field in `LandingPageData` that is `null`, `undefined`, an empty string, or whitespace-only, the `resolveColor(value, fallback)` utility SHALL return the fallback value unchanged; it SHALL never return the invalid input itself.

**Validates: Requirements 1.6, 14.5**

---

### Property 3: Navbar Scroll Threshold

*For any* scroll position value `y`, the Navbar background state is determined solely by whether `y > 60`: for all `y ≤ 60` the returned style SHALL have an alpha channel of 0 or less than 0.15; for all `y > 60` the returned style SHALL be a fully opaque solid color equal to `secondary_color`.

**Validates: Requirements 2.1, 2.2, 2.3**

---

### Property 4: Register URL Derivation

*For any* `portal_link` string, `deriveRegisterLink(portal_link)` SHALL:
- Replace the first occurrence of `/login` with `/register` if `/login` is present, OR
- Replace the first occurrence of `login` with `register` if `login` (without leading `/`) is present and `/login` is not, OR
- Return `/register` if neither substring is found;
and the result SHALL never equal the input `portal_link` when `/login` or `login` appears in it.

**Validates: Requirements 2.10, 10.4**

---

### Property 5: Hero Background Fallback

*For any* `hero_image` value that is `null`, `undefined`, an empty string, or whitespace-only, the Hero background style object SHALL contain a `background` gradient property and SHALL NOT contain a `backgroundImage` property referencing a `url(...)`.

**Validates: Requirements 3.9, 3.10**

---

### Property 6: About Image Column Presence

*For any* `schoolData` where both `about_image` and `secondary_image` are null, empty, or absent, the About component SHALL render zero `<img>` elements in its image column area.

**Validates: Requirements 4.6, 4.7**

---

### Property 7: Statistics Card Count

*For any* `statistics` array of length N where K entries have non-empty `value` fields (0 ≤ K ≤ N), the SchoolStats component SHALL render exactly K card elements.

**Validates: Requirements 5.1, 5.6, 5.7**

---

### Property 8: Programs Explore Button Color

*For any* `programs` array and any `theme_color` value, every "Explore" button rendered by the Programs component SHALL have its `backgroundColor` style equal to `resolveColor(theme_color, DEFAULT.theme_color)`, regardless of the card's index position in the array.

**Validates: Requirements 7.6**

---

### Property 9: Email Validation

*For any* string `s`, `validateEmail(s)` SHALL return an empty string (valid) if and only if `s` matches the pattern `[^\s@]+@[^\s@]+\.[^\s@]+`; it SHALL return a non-empty error message string for all other inputs including empty strings, strings with no `@`, strings with multiple `@` symbols adjacent to delimiters, and whitespace-only strings.

**Validates: Requirements 9.3, 9.5**

---

### Property 10: Form Submission Blocked on Invalid Input

*For any* contact form state where at least one field fails validation (empty name, invalid email, or empty message), `isFormValid(validateContactForm(fields))` SHALL return `false`, meaning submission SHALL be prevented.

**Validates: Requirements 9.5**

---

### Property 11: Copyright String Format

*For any* school `name` string and any absent or empty `footer.copyright` field, the generated copyright string SHALL match exactly the format `© {currentYear} {name}. All rights reserved.` where `{currentYear}` is the current four-digit calendar year.

**Validates: Requirements 10.7**

---

### Property 12: Dynamic Section Heading (Features)

*For any* `schoolData.name` string, the Features section heading rendered text SHALL contain that `name` string as a substring; the heading SHALL NOT be a static literal that does not vary with `name`.

**Validates: Requirements 6.7, 14.2**

---

#### Property Reflection

After reviewing all 12 properties for redundancy:

- **Properties 9 and 10** are related but not redundant: Property 9 tests the low-level `validateEmail` pure function across all email-format inputs; Property 10 tests the higher-level `isFormValid` integration across all form states. Both provide unique value.
- **Property 7** (statistics card count) subsumes the edge case of an empty array (K=0, N=0 → 0 cards), making a separate "empty array → null" property redundant.
- **Property 2** (color fallback invariant) subsumes the separate "invalid CSS color" edge case from Req 1.7, since both reduce to "non-valid-color input → fallback returned".
- **Properties 3** (navbar scroll threshold) subsumes Reqs 2.1, 2.2, and 2.3 as a single universal threshold invariant.
- No further consolidation is appropriate; all remaining properties test distinct behaviors.

---

## Error Handling

### API Failure

`fetchPublicLandingPage` catches all network and HTTP errors and returns `DEFAULT_LANDING_PAGE` normalized data with `isFallback: true`. `useSchoolData` propagates `isFallback` but `SchoolLandingPage` renders normally — no error screen, no skeleton (Req 13.8). The page is always visually complete.

### Image Load Failure

Two patterns are used:

1. **Logo / secondary images**: `onError={(e) => e.currentTarget.style.display = 'none'}` hides the broken element. The initials fallback in Navbar is already implemented.
2. **Hero background image**: A hidden `<img>` probe triggers `onError` to flip `imgError` state, switching from `background-image: url(...)` to the gradient fallback. This avoids a broken-image icon appearing in the section background.
3. **About images**: Each `<img>` has `onError` to hide itself; if the primary image fails, the secondary becomes the only visible image; if both fail, the column collapses gracefully.

### Color Resolution Failure

`resolveColor` in `landingPageTheme.js` returns the fallback for any falsy or whitespace-only value. Components never receive `null` or `undefined` color values. The `normalizeLandingPageData` pipeline applies `getString` with `DEFAULT_LANDING_PAGE` defaults before handing data to the hook, providing a second layer of defense.

### Form Errors

Client-side validation (described in Contact section above) prevents form submission when any field is invalid. Per-field error messages appear immediately adjacent to the offending input using `role="alert"` for screen reader accessibility. No server-side error handling is within scope of this redesign.

---

## Testing Strategy

### Property-Based Testing Assessment

This feature involves:
- Pure utility functions with clear input/output contracts (`resolveColor`, `normalizeMediaUrl`, `deriveRegisterLink`, `validateEmail`, `validateContactForm`)
- Style-building logic with well-defined inputs and outputs (navbar scroll state → background style, hero image presence → background style)
- Cardinality rules (statistics/features/programs array length → card count)
- String construction rules (copyright format, heading construction)

PBT **is** appropriate for these areas because behavior varies meaningfully across a large input space and 100+ iterations expose edge cases (null vs. undefined vs. empty string, partial email formats, border values at y = 60 vs. 61 for the scroll threshold, empty statistics values interleaved with valid ones, etc.).

PBT **is not** applied to:
- CSS transitions and animations (visual behavior, not pure logic)
- Intersection Observer in-viewport detection (browser API, not unit-testable)
- API integration (covered by integration tests with example inputs)
- UI rendering of colors on specific DOM elements (covered by example-based tests)

**Library choice**: [fast-check](https://fast-check.dev/) for JavaScript/React property-based testing. It integrates with Vitest and provides rich arbitraries for strings, numbers, arrays, and objects.

### Test File Layout

```
src/
├── utils/
│   ├── landingPageTheme.js
│   ├── formValidation.js
│   └── __tests__/
│       ├── landingPageTheme.test.js   ← property tests: resolveColor, normalizeMediaUrl, getInitials
│       └── formValidation.test.js     ← property tests: validateEmail, validateContactForm, isFormValid
├── components/
│   └── __tests__/
│       ├── Navbar.test.jsx            ← property test: scroll threshold, register URL derivation
│       ├── Hero.test.jsx              ← property test: hero background fallback
│       ├── About.test.jsx             ← property test: image column presence
│       ├── SchoolStats.test.jsx       ← property test: card count invariant
│       ├── Programs.test.jsx          ← property test: Explore button color
│       ├── Features.test.jsx          ← property test: dynamic heading, card count
│       └── Footer.test.jsx            ← property test: copyright format, deriveRegisterLink
└── services/
    └── __tests__/
        └── landingPageService.test.js ← example tests: normalization, DEFAULT fallback
```

### Dual Testing Approach

**Unit tests** cover:
- Specific boundary examples: `scrollY = 59`, `scrollY = 60`, `scrollY = 61`
- Specific email format examples: `user@domain.com` (valid), `notanemail` (invalid)
- Specific `portal_link` examples: `/login`, `https://school.com/login`, no-login-substring
- Integration points between components and their data props

**Property tests** cover (minimum 100 iterations per property):
- `resolveColor` — arbitrary valid/invalid/null/empty color strings → fallback invariant
- `validateEmail` — arbitrary strings (generated via `fc.string()` and email-shaped arbitraries)
- `deriveRegisterLink` — arbitrary URL strings
- Navbar scroll state — arbitrary integer `y` values around the 60px threshold
- Statistics card count — arbitrary arrays with mixed empty/non-empty `value` fields
- Hero background — arbitrary falsy/null/empty `hero_image` values
- Programs button color — arbitrary arrays of arbitrary length with arbitrary `theme_color`

### Property Test Tag Format

Each property test includes a comment identifying the design property it validates:

```js
// Feature: landing-page-redesign, Property 2: Color Fallback Invariant
it.prop([fc.option(fc.string())])('resolveColor returns fallback for null/empty', (value) => {
  const falsy = value ?? null;
  expect(resolveColor(falsy, '#default')).toBe('#default');
});
```

### Example Tests for Non-Property Scenarios

- **Contact "School Note" absence**: render `<Contact schoolData={mockData} />` and assert no element with text "School Note" is present in the DOM.
- **Features default fallback**: render `<Features schoolData={{ ...mockData, features: [] }} />` and assert at least 3 cards are rendered.
- **CTA button href**: render `<CallToAction schoolData={mockData} />` and assert primary button `href` equals `portal_link`.
- **Hero structure**: given a non-empty `hero_image`, assert the section's `style` contains `backgroundImage` with `url(...)`.

### Integration Tests (example-based, 1–3 executions)

- **`fetchPublicLandingPage` with network mock**: assert that a valid API response produces a fully typed `LandingPageData` object.
- **`fetchPublicLandingPage` on network failure**: assert that `isFallback: true` is returned and `data.name` equals `DEFAULT_LANDING_PAGE.name`.
- **`useSchoolData` hook**: assert `loading` transitions from `true` to `false` after the fetch resolves.

---
