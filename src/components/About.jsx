import React from 'react';
import { normalizeMediaUrl, resolveColor } from '../utils/landingPageTheme';
import { DEFAULT_LANDING_PAGE } from '../services/landingPageService';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

const About = ({ schoolData }) => {
  const [sectionRef, isVisible] = useRevealOnScroll();

  if (!schoolData || !schoolData.about) return null;

  const {
    name,
    about,
    about_image,
    secondary_image,
    mission,
    vision,
    core_values,
    theme_color,
    secondary_color,
    accent_color,
  } = schoolData;

  const themeColor = resolveColor(theme_color, DEFAULT_LANDING_PAGE.theme_color);
  const secondaryClr = resolveColor(secondary_color, DEFAULT_LANDING_PAGE.secondary_color);
  const accentClr = resolveColor(accent_color, DEFAULT_LANDING_PAGE.accent_color);

  const primaryImg = normalizeMediaUrl(about_image, '');
  const secondaryImg = normalizeMediaUrl(secondary_image, '');
  const hasBoth = Boolean(primaryImg && secondaryImg);
  const hasImage = Boolean(primaryImg);

  return (
    <section id="about" ref={sectionRef} data-reveal className={`py-16 sm:py-20 lg:py-24 bg-white transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-12 items-center ${hasImage ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>

          {/* Left side - Image column (only rendered when primaryImg exists) */}
          {hasImage && (
            <div className="relative hidden md:block">
              <img
                src={primaryImg}
                alt={name}
                className="h-[420px] w-full rounded-2xl object-cover shadow-2xl"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
              {hasBoth && (
                <img
                  src={secondaryImg}
                  alt=""
                  aria-hidden="true"
                  className="absolute -bottom-6 -right-6 h-40 w-40 rounded-2xl object-cover shadow-xl ring-4 ring-white"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              )}
              {/* Accent blob behind secondary image */}
              <div
                className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full blur-2xl opacity-20 -z-10"
                style={{ backgroundColor: accentClr }}
                aria-hidden="true"
              />
            </div>
          )}

          {/* Right side - Text */}
          <div className="animate-fadeIn">
            {/* Eyebrow label */}
            <div
              className="inline-block mb-4 px-3 py-1 rounded-full text-sm font-semibold"
              style={{ backgroundColor: `${themeColor}1a`, color: themeColor }}
            >
              About Us
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-6 leading-tight"
              style={{ color: secondaryClr }}
            >
              Welcome to {name}
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {about}
            </p>

            {/* Mission / Vision cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div
                className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                style={{ borderLeft: `4px solid ${themeColor}` }}
              >
                <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: secondaryClr }}>
                  Mission
                </p>
                <p className="mt-2 text-gray-700 leading-relaxed">{mission}</p>
              </div>
              <div
                className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                style={{ borderLeft: `4px solid ${themeColor}` }}
              >
                <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: secondaryClr }}>
                  Vision
                </p>
                <p className="mt-2 text-gray-700 leading-relaxed">{vision}</p>
              </div>
            </div>

            {/* Core Values */}
            <div className="mt-6">
              <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: secondaryClr }}>
                Core Values
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {(core_values || []).map((value) => (
                  <span
                    key={value}
                    className="rounded-full px-4 py-2 text-sm font-semibold"
                    style={{
                      backgroundColor: `${themeColor}1a`,
                      color: secondaryClr,
                    }}
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
