import React from 'react';

const Hero = ({ schoolData }) => {
  if (!schoolData) return null;

  const {
    name,
    tagline,
    hero_title,
    hero_description,
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

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32"
      style={{ background: `linear-gradient(135deg, ${secondary}, #111827 68%, ${secondary})` }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 right-0 h-72 w-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: primary }}></div>
      <div className="absolute -bottom-8 left-0 h-72 w-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: accent }}></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fadeIn">
          {/* Main Heading */}
          <div className="mx-auto mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold tracking-[0.18em] text-white/80 uppercase">
            {tagline}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {hero_title || `Welcome to ${name}`}
          </h1>

          {/* Hero Description */}
          <p className="text-lg sm:text-xl text-white/80 mb-4 max-w-3xl mx-auto">
            {hero_description || 'A school experience built for excellence, discipline, and growth.'}
          </p>
          <p className="text-base sm:text-lg text-white/70 mb-10 font-light max-w-2xl mx-auto">
            {name}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={portalUrl}
              className="px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
              style={{ backgroundColor: primary, color: foreground }}
            >
              Visit Portal
            </a>
            <a
              href={registerUrl}
              className="px-8 py-3 rounded-full font-semibold transition-all duration-300 border"
              style={{ borderColor: 'rgba(244, 196, 48, 0.45)', color: '#fff', background: 'rgba(255,255,255,0.05)' }}
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

          {/* Scroll Indicator */}
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
    </section>
  );
};

export default Hero;
