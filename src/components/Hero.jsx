import React from 'react';
import { normalizeMediaUrl } from '../utils/landingPageTheme';

const Hero = ({ schoolData }) => {
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

  const normalizeUrl = (url) => {
  if (!url) return null;

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  return `https://${url}`;
};

const portalUrl = normalizeUrl(portal_link); 

const registerUrl = `${portalUrl}/admission/apply`;


  const primary = theme_color || '#F4C430';
  const secondary = secondary_color || '#1A1A2E';
  const accent = accent_color || '#D4AF37';
  const foreground = text_color || '#222222';

  const bgUrl = normalizeMediaUrl(hero_image, '');
  const hasImage = Boolean(bgUrl);

  return (
    <section
      className="relative isolate min-h-screen min-h-[100svh] overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${secondary} 0%, #111827 68%, ${secondary} 100%)` }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {hasImage && (
          <>
            <div
              aria-hidden="true"
              className="bg-cover bg-center [background-attachment:fixed] scale-110 blur-2xl opacity-40 absolute inset-0"
              style={{ backgroundImage: `url(${bgUrl})` }}
            />
            <div
              aria-hidden="true"
              className="bg-contain bg-center bg-no-repeat [background-attachment:fixed] absolute inset-0"
              style={{ backgroundImage: `url(${bgUrl})` }}
            />
          </>
        )}

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

        {hasImage && (
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ backgroundColor: secondary, opacity: 0.35 }}
          />
        )}

        <div className="relative z-10 flex min-h-screen min-h-[100svh] flex-col items-start justify-center overflow-y-auto pt-[72px]">
          <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="animate-fadeIn max-w-2xl text-left">
            {/* Tagline badge */}
            <div className="mx-auto mb-5 inline-flex max-w-full break-words rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase leading-relaxed tracking-[0.12em] text-white/80 sm:text-sm sm:tracking-[0.18em]">
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
                href={registerUrl}
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
      </div>
    </section>
  );
};

export default Hero;
