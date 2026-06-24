# Implementation Plan: Landing Page Redesign

## Overview

Upgrade the school landing page to a premium, fully-dynamic design. Every visible piece of content is driven from the Landing Page API — no school-specific text, image URL, color value, or branding string may be hardcoded in any component. All eight identified bugs are fixed, a new `formValidation.js` utility and `useRevealOnScroll` hook are introduced, and `prefers-reduced-motion` support is added to `index.css`. Property-based tests are written for each of the 12 correctness properties defined in the design document using [fast-check](https://fast-check.dev/) with Vitest.

---

## Tasks

- [x] 1. Install testing dependencies and configure Vitest
  - Add `vitest`, `@vitest/ui`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, and `fast-check` as dev dependencies in `package.json`
  - Create or update `vite.config.js` to include a `test` block pointing at `jsdom` environment
  - Add a `"test"` script (`vitest --run`) and a `"test:watch"` script (`vitest`) in `package.json`
  - Create `src/setupTests.js` that imports `@testing-library/jest-dom`
  - _Requirements: 9.3, 9.4, 9.5 (prerequisite for all test tasks)_

- [x] 2. Set up CSS custom property system in SchoolLandingPage and add `prefers-reduced-motion` to index.css
  - [x] 2.1 Update `SchoolLandingPage.jsx` to emit all five CSS custom properties (`--lp-theme`, `--lp-secondary`, `--lp-accent`, `--lp-bg`, `--lp-text`) on the root wrapper's `style` prop using `resolveColor` for every field; verify `backgroundColor` and `color` are also set inline
    - Use the exact property names from the design: `--lp-theme`, `--lp-secondary`, `--lp-accent`, `--lp-bg`, `--lp-text`
    - Note: the root wrapper already sets some of these; audit and ensure **all five** are present and all use `resolveColor` with correct `DEFAULT_LANDING_PAGE` fallbacks
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

  - [x] 2.2 Add `prefers-reduced-motion` media query block to `src/index.css` that sets `animation: none !important` on `.animate-fadeIn`, `.animate-slideInLeft`, `.animate-slideInRight`, `.animate-slideUp`, `.animate-reveal`, `.animate-reveal-delayed`, and applies `opacity: 1 !important; transform: none !important; transition: none !important` on `[data-reveal]` elements
    - _Requirements: 13.9_

  - [ ]* 2.3 Write property test for CSS custom property mapping (Property 1)
    - **Property 1: CSS Custom Property Mapping**
    - Generate arbitrary `LandingPageData`-shaped objects with non-empty color fields and assert that the five `--lp-*` properties on the root wrapper's computed style object equal the input color values respectively
    - **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5**

  - [ ]* 2.4 Write property test for color fallback invariant (Property 2)
    - **Property 2: Color Fallback Invariant**
    - Using `fc.oneof(fc.constant(null), fc.constant(undefined), fc.constant(''), fc.string().filter(s => !s.trim()))`, assert that `resolveColor(value, '#fallback')` always returns `'#fallback'` and never returns the invalid input
    - Test file: `src/utils/__tests__/landingPageTheme.test.js`
    - **Validates: Requirements 1.6, 14.5**

- [x] 3. Fix Navbar: transparent-to-solid scroll behavior
  - [x] 3.1 Rewrite `Navbar.jsx` scroll detection: replace `sticky` positioning with `fixed top-0 left-0 right-0 z-50`; add `scrolled` state driven by a passive `window.scroll` listener that fires `setScrolled(window.scrollY > 60)`; call the handler once on mount; derive `navStyle` as a pure expression (`scrolled ? { backgroundColor: resolveColor(secondary_color, DEFAULT.secondary_color) } : { backgroundColor: 'rgba(0, 0, 0, 0)' }`) and apply it to the `<nav>` element; add `transition-all duration-300` on the `<nav>`; update nav link hover classes to `hover:text-[var(--lp-theme)]`
    - Remove `backdrop-blur-md` from the always-on class list (only apply when scrolled)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.7_

  - [ ]* 3.2 Write property test for Navbar scroll threshold (Property 3)
    - **Property 3: Navbar Scroll Threshold**
    - Use `fc.integer({ min: 0, max: 10000 })` to generate arbitrary `y` values; call `computeNavStyle(y, secondaryColor)` (extract the pure style-derivation logic from the component) and assert: `y ≤ 60 → alpha ≤ 0.15`, `y > 60 → backgroundColor equals resolved secondary color`
    - Test file: `src/components/__tests__/Navbar.test.jsx`
    - **Validates: Requirements 2.1, 2.2, 2.3**

  - [ ]* 3.3 Write property test for Register URL derivation (Property 4)
    - **Property 4: Register URL Derivation**
    - Export `deriveRegisterLink` from `Navbar.jsx`; use `fc.oneof(fc.webUrl(), fc.string())` to generate arbitrary URL strings; assert the three-branch logic: `/login` → replaced, `login` (no leading `/`) → replaced, neither → `/register`; assert result never equals input when `login` or `/login` is present
    - Test file: `src/components/__tests__/Navbar.test.jsx`
    - **Validates: Requirements 2.10, 10.4**

- [x] 4. Fix Hero: background image with overlay and image error fallback
  - [x] 4.1 Rewrite `Hero.jsx` background logic: add `imgError` state (default `false`); compute `bgUrl = normalizeMediaUrl(hero_image, '')` and `hasImage = Boolean(bgUrl) && !imgError`; apply `sectionStyle` as `hasImage ? { backgroundImage: \`url(\${bgUrl})\`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' } : { background: \`linear-gradient(135deg, \${secondary} 0%, #111827 68%, \${secondary} 100%)\` }`; render an `aria-hidden` overlay `<div className="absolute inset-0">` with `style={{ backgroundColor: secondary, opacity: 0.65 }}` only when `hasImage`; render a hidden `<img src={bgUrl} className="sr-only" onError={() => setImgError(true)} />` probe when `hasImage`; wrap all content in `<div className="relative z-10 flex min-h-screen flex-col items-center justify-center ...">` ; change section to `min-h-screen`; add `pt-[72px]` to the content wrapper to clear the fixed Navbar
    - Import `normalizeMediaUrl` from `../utils/landingPageTheme`
    - _Requirements: 3.1, 3.2, 3.3, 3.8, 3.9, 3.10, 3.11_

  - [ ]* 4.2 Write property test for Hero background fallback (Property 5)
    - **Property 5: Hero Background Fallback**
    - Use `fc.oneof(fc.constant(null), fc.constant(undefined), fc.constant(''), fc.string().filter(s => !s.trim()))` to generate absent/empty `hero_image` values; assert `computeHeroSectionStyle(hero_image)` returns an object with a `background` gradient key and no `backgroundImage` key containing `url(`
    - Extract `computeHeroSectionStyle` as a testable pure function from `Hero.jsx`
    - Test file: `src/components/__tests__/Hero.test.jsx`
    - **Validates: Requirements 3.9, 3.10**

- [x] 5. Fix About: layered image composition using `about_image` and `secondary_image`
  - [x] 5.1 Rewrite `About.jsx` image column: replace `logo` usage with `about_image` and `secondary_image`; compute `primaryImg = normalizeMediaUrl(about_image, '')` and `secondaryImg = normalizeMediaUrl(secondary_image, '')`; if `primaryImg` exists render a full-height `<img className="h-[420px] w-full rounded-2xl object-cover shadow-2xl" />`; if both exist render the secondary as `<img className="absolute -bottom-6 -right-6 h-40 w-40 rounded-2xl object-cover shadow-xl ring-4 ring-white" aria-hidden="true" />`; add an accent blob `<div>` behind the secondary image; if neither image exists, switch the outer grid to `grid-cols-1` and omit the image column entirely; add `onError` handlers to each `<img>` to hide on failure; fix the eyebrow label color to `resolveColor(theme_color, DEFAULT.theme_color)`; fix mission/vision cards to use `borderLeft: \`4px solid \${resolveColor(theme_color, ...)}\``; fix core_values badge background to use `theme_color` at ~10% opacity
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9_

  - [ ]* 5.2 Write property test for About image column presence (Property 6)
    - **Property 6: About Image Column Presence**
    - Render `<About>` with arbitrary `schoolData` where both `about_image` and `secondary_image` are empty/null (generated by `fc.record({ about_image: fc.constant(''), secondary_image: fc.constant(''), ... })`); assert zero `<img>` elements are present in the rendered output
    - Test file: `src/components/__tests__/About.test.jsx`
    - **Validates: Requirements 4.6, 4.7**

- [x] 6. Fix SchoolStats: hover shadow elevation
  - [x] 6.1 Update `SchoolStats.jsx` card `className` to include `hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]` alongside the existing `hover:-translate-y-1` and `transition-all duration-300`; add a `.filter(item => Boolean(item.value))` before `.map()` to enforce the empty-value filter requirement
    - Remove the inline `boxShadow` resting style and replace with `shadow-sm` Tailwind class for consistent baseline
    - _Requirements: 5.4, 5.5, 5.6, 5.7_

  - [ ]* 6.2 Write property test for statistics card count (Property 7)
    - **Property 7: Statistics Card Count**
    - Use `fc.array(fc.record({ value: fc.oneof(fc.constant(''), fc.string({ minLength: 1 })), label: fc.string() }))` to generate statistics arrays; render `<SchoolStats>` and assert rendered card count equals the number of entries with non-empty `value` fields
    - Test file: `src/components/__tests__/SchoolStats.test.jsx`
    - **Validates: Requirements 5.1, 5.6, 5.7**

- [x] 7. Fix Features: replace hardcoded school name with dynamic `{name}`
  - [x] 7.1 Update `Features.jsx` section heading from the hardcoded literal `"Why Families Trust Command Day Secondary School, Ojo"` to `` `Why Families Choose ${name}` `` where `name` is read from `schoolData.name`; fix the eyebrow badge background from the hardcoded `rgba(244, 196, 48, 0.16)` to use `theme_color` at 16% opacity via `resolveColor`; verify `accent_color` is used on card `borderTop` (already correct — confirm no regression)
    - _Requirements: 6.6, 6.7, 14.2_

  - [ ]* 7.2 Write property test for dynamic Features heading (Property 12)
    - **Property 12: Dynamic Section Heading (Features)**
    - Use `fc.string({ minLength: 1 })` to generate arbitrary `name` values; render `<Features schoolData={{ ...mockBase, name }} />` and assert the rendered heading text contains `name` as a substring; assert it is not equal to any static literal
    - Test file: `src/components/__tests__/Features.test.jsx`
    - **Validates: Requirements 6.7, 14.2**

- [x] 8. Fix Programs: consistent Explore button color
  - [x] 8.1 Update `Programs.jsx` Explore button to always use `resolveColor(theme_color, DEFAULT.theme_color)` as `backgroundColor`, removing the `idx % 2 === 0 ? primary : accent` alternation; import `resolveColor` from `../utils/landingPageTheme`; also update the `hover:-translate-y-2` card hover class (currently `hover:scale-105` — change to `hover:-translate-y-2` as specified in the design)
    - _Requirements: 7.3, 7.6_

  - [ ]* 8.2 Write property test for Programs Explore button color (Property 8)
    - **Property 8: Programs Explore Button Color**
    - Use `fc.array(fc.record({ icon: fc.string(), name: fc.string(), description: fc.string() }), { minLength: 1, maxLength: 12 })` combined with `fc.string()` for `theme_color`; render `<Programs>` and assert every button with text "Explore" has `backgroundColor` equal to `resolveColor(theme_color, DEFAULT.theme_color)`
    - Test file: `src/components/__tests__/Programs.test.jsx`
    - **Validates: Requirements 7.6**

- [x] 9. Fix CallToAction: primary button color
  - [x] 9.1 Update `CallToAction.jsx` primary "Visit Portal" button `style` from `{ backgroundColor: accent }` to `{ backgroundColor: resolveColor(theme_color, DEFAULT.theme_color) }`; import `resolveColor` from `../utils/landingPageTheme`; verify portal link fallback chain: `portal_link || contact?.portal_url || '/login'`
    - _Requirements: 8.3, 8.7, 8.8_

- [x] 10. Create `src/utils/formValidation.js` utility
  - [x] 10.1 Create `src/utils/formValidation.js` exporting four pure functions: `validateEmail(value)`, `validateRequired(value, label)`, `validateContactForm({ name, email, message })`, and `isFormValid(errors)`; implement the email regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` with `.trim()` applied before testing; `validateRequired` trims before checking emptiness; `validateContactForm` returns an object of per-field error strings; `isFormValid` returns `true` only when every value in the errors object is an empty string
    - _Requirements: 9.3, 9.4, 9.5_

  - [ ]* 10.2 Write property test for email validation (Property 9)
    - **Property 9: Email Validation**
    - Use `fc.emailAddress()` to generate valid addresses and assert `validateEmail` returns `''`; use `fc.oneof(fc.constant(''), fc.string().filter(s => !s.includes('@')), fc.string().filter(s => s.trim() === ''))` to generate invalid inputs and assert a non-empty error string is returned
    - Test file: `src/utils/__tests__/formValidation.test.js`
    - **Validates: Requirements 9.3, 9.5**

  - [ ]* 10.3 Write property test for form submission blocked on invalid input (Property 10)
    - **Property 10: Form Submission Blocked on Invalid Input**
    - Use `fc.record({ name: fc.oneof(fc.constant(''), fc.string()), email: fc.oneof(fc.constant(''), fc.string()), message: fc.oneof(fc.constant(''), fc.string()) })` to generate form states; for each state where at least one field would fail validation, assert `isFormValid(validateContactForm(fields))` returns `false`
    - Test file: `src/utils/__tests__/formValidation.test.js`
    - **Validates: Requirements 9.5**

- [x] 11. Fix Contact: remove "School Note" card and integrate form validation
  - [x] 11.1 Remove the hardcoded "School Note" `<div>` block (the second card with dashed border in the contact info column) from `Contact.jsx`; add conditional rendering for `contact.email`, `contact.phone`, and `contact.address` in the contact info column (only render each if non-empty); import and use `validateContactForm` and `isFormValid` from `../utils/formValidation`; add `errors` state `{ name: '', email: '', message: '' }`; update `handleSubmit` to call `validateContactForm`, `setErrors`, and block submission via `if (!isFormValid(newErrors)) return`; add `{errors.name && <p role="alert" className="mt-1 text-sm text-red-600">{errors.name}</p>}` adjacent to each field; clear `errors` on successful submission
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 14.4_

- [x] 12. Fix Footer: replace hardcoded brand description
  - [x] 12.1 Update `Footer.jsx` brand description `<p>` from the hardcoded string `"Excellence through discipline, academic rigor..."` to a dynamic value: `const brandDescription = getReadableText(schoolData.tagline, '') || getReadableText(schoolData.about, DEFAULT_LANDING_PAGE.tagline)`; import `getReadableText` from `../utils/landingPageTheme`; import `DEFAULT_LANDING_PAGE` or its tagline value from `../services/landingPageService`
    - _Requirements: 10.5, 14.3_

  - [ ]* 12.2 Write property test for copyright string format (Property 11)
    - **Property 11: Copyright String Format**
    - Use `fc.string({ minLength: 1 })` to generate `name` values; call the copyright generator with an empty/absent `footer.copyright` and assert the output matches `© ${new Date().getFullYear()} ${name}. All rights reserved.` exactly
    - Test file: `src/components/__tests__/Footer.test.jsx`
    - **Validates: Requirements 10.7**

- [x] 13. Checkpoint — ensure core fixes compile and render
  - Ensure all tests pass, ask the user if questions arise.
  - Verify the app builds with `npm run build` without errors before proceeding to animation work.

- [x] 14. Create `useRevealOnScroll` hook
  - [x] 14.1 Create `src/hooks/useRevealOnScroll.js` exporting `useRevealOnScroll(options = {})`: initialize `const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches`; initialize `isVisible` state to `prefersReduced`; attach an `IntersectionObserver` with `{ threshold: 0.12, ...options }` that sets `isVisible = true` and calls `observer.disconnect()` on first intersection; attach to `ref.current` inside `useEffect`; return `[ref, isVisible]`; add a `data-reveal` attribute to the observed element in the usage pattern
    - _Requirements: 13.2, 13.9_

- [ ] 15. Apply `useRevealOnScroll` to section components
  - [-] 15.1 Import and apply `useRevealOnScroll` in `About.jsx`, `Features.jsx`, `Programs.jsx`, `SchoolStats.jsx`, `CallToAction.jsx`, `Contact.jsx`, and `Footer.jsx`: attach `ref={sectionRef}` to the outer `<section>` (or equivalent root element); add `data-reveal` attribute on the same element; replace or supplement existing `animate-fadeIn` classes with conditional classes `isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'` combined with `transition-all duration-500`
    - Preserve existing `animate-fadeIn` staggered delays on individual child cards within each section — these are inner element animations, not the section reveal itself
    - _Requirements: 13.1, 13.2, 13.5, 13.9_

- [ ] 16. LandingPageLoader shimmer visual improvement
  - [ ] 16.1 Update `LandingPageLoader.jsx` to replace the flat `bg-white/10` shimmer color with a CSS gradient shimmer: add a `shimmer` keyframe in a `<style>` tag or via a Tailwind plugin; update `shimmerClass` from `animate-pulse rounded-2xl bg-white/10` to use a gradient shimmer that moves from `bg-white/5` through `bg-white/15` and back; ensure the loading skeleton maintains the same structural layout (no DOM shape changes)
    - This is a cosmetic improvement; the skeleton's structural shape and component count are unchanged
    - _Requirements: 13.6_

- [~] 17. Final checkpoint — full test suite and build verification
  - Ensure all tests pass (`npm run test`), ask the user if questions arise.
  - Ensure `npm run build` completes without errors or warnings.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP delivery
- All property-based tests use [fast-check](https://fast-check.dev/) with Vitest — install both in Task 1 before running any tests
- The design uses React/JavaScript throughout; no language change is needed
- Pure functions extracted for testability (`computeNavStyle`, `computeHeroSectionStyle`, `deriveRegisterLink`, `validateEmail`, etc.) should be exported from their respective modules alongside the default component export
- Checkpoints in Tasks 13 and 17 are integration gates — do not proceed if the build is broken
- Each task references specific requirements and design properties for traceability
- The `DEFAULT_LANDING_PAGE` fallback values from `landingPageService.js` are the canonical fallbacks; inline JSX fallback strings must match them exactly (Req 14.5)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1", "2.2", "3.1", "10.1"] },
    { "id": 2, "tasks": ["2.3", "2.4", "3.2", "3.3", "4.1", "5.1", "6.1", "7.1", "8.1", "9.1", "12.1"] },
    { "id": 3, "tasks": ["4.2", "5.2", "6.2", "7.2", "8.2", "10.2", "10.3", "11.1", "12.2"] },
    { "id": 4, "tasks": ["14.1"] },
    { "id": 5, "tasks": ["15.1", "16.1"] }
  ]
}
```
