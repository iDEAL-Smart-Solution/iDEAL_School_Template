import React, { useState } from 'react';
import { normalizeMediaUrl } from '../utils/landingPageTheme';

/**
 * Computes the background style for the Hero section.
 * Pure function exported for testability.
 *
 * @param {string} heroImage - Raw hero image value from school data
 * @param {string} secondary - Secondary colour (CSS colour string)
 * @param {boolean} [imgError=false] - Whether the image probe has errored
 * @returns {React.CSSProperties}
 */
export const computeHeroSectionStyle = (heroImage, secondary, imgError = false) => {
  const bgUrl = normalizeMediaUrl(heroImage, '');
  const hasImage = Boolean(bgUrl) && !imgError;
  if (hasImage) {
    return {
      backgroundImage: `url(${bgUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
    };
  }
  return {
    background: `linear-gradient(135deg, ${secondary} 0%, #111827 68%, ${secondary} 100%)`,
  };
};

const Hero = ({ schoolData }) => {
  const [imgError, setImgError] = useState(false);

  if (!schoolData) return null;

  const {
    name,
    tagline,
    hero_title,
    hero_description,
    hero_image,
    portal_link,
    theme_color,
    secondary_color,
    accent_color,
    text_color,
  } = schoolData;

  const registerLink = portal_link
    ? portal_link.includes('/login')
      ? portal_link.replace('/login', '/register')
      : portal_link.includes('login')
      ? portal_link.replace('login', 'register')
      : '/register'
    : '/register';

  const primary = theme_color || '#F4C430';
  const secondary = secondary_color || '#1A1A2E';
  const accent = accent_color || '#D4AF37';
  const foreground = text_color || '#222222';

  const bgUrl = normalizeMediaUrl(hero_image, '');
  const hasImage = Boolean(bgUrl) && !imgError;

  const sectionStyle = computeHeroSectionStyle(hero_image, secondary, imgError);

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={sectionStyle}
    >
      {/* Decorative background blobs — shown only when no image */}
      {!hasImage && (
        <>
          <div
            className="absolute top-20 right-0 h-72 w-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ backgroundColor: primary }}
          />
          <div
            className="absolute -bottom-8 left-0 h-72 w-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ backgroundColor: accent }}
          />
        </>
      )}

      {/* Colour overlay when a background image is present */}
      {hasImage && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundColor: secondary, opacity: 0.65 }}
        />
      )}

      {/* Hidden image probe — triggers imgError on load failure */}
      {hasImage && (
        <img
          src={bgUrl}
          className="sr-only"
          alt=""
          onError={() => setImgError(true)}
        />
      )}

      {/* Main content — sits above overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-start justify-center pt-[72px]">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-left animate-fadeIn max-w-2xl">
            {/* Tagline badge */}
            <div className="mx-auto mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold tracking-[0.18em] text-white/80 uppercase">
              {tagline}
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {hero_title || `Welcome to ${name}`}
            </h1>

            {/* Hero description */}
            <p className="text-lg sm:text-xl text-white/80 mb-4 max-w-3xl mx-auto">
              {hero_description || 'A school experience built for excellence, discipline, and growth.'}
            </p>
            <p className="text-base sm:text-lg text-white/70 mb-10 font-light max-w-2xl mx-auto">
              {name}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start items-start sm:items-center">
              <a
                href={portal_link}
                className="px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
                style={{ backgroundColor: primary, color: foreground }}
              >
                Visit Portal
              </a>
              <a
                href={registerLink}
                className="px-8 py-3 rounded-full font-semibold transition-all duration-300 border"
                style={{
                  borderColor: 'rgba(244, 196, 48, 0.45)',
                  color: '#fff',
                  background: 'rgba(255,255,255,0.05)',
                }}
              >
                Register
              </a>
              <a
                href="#about"
                className="px-8 py-3 rounded-full font-semibold transition-colors border-2"
                style={{ borderColor: 'rgba(255,255,255,0.35)', color: '#fff' }}
              >
                Learn More
              </a>
            </div>

            {/* Scroll indicator */}
            <div className="mt-12 flex justify-center">
              <div className="animate-bounce">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
