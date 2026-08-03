import React from 'react';
import { resolveColor } from '../utils/landingPageTheme';
import { DEFAULT_LANDING_PAGE as DEFAULT } from '../services/landingPageService';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

const CallToAction = ({ schoolData }) => {
  const [sectionRef, isVisible] = useRevealOnScroll();

  if (!schoolData) return null;

  const theme_color = schoolData.theme_color;
  const secondary = schoolData.secondary_color || '#1A1A2E';
  const portalLink = schoolData.portal_link || schoolData.contact?.portal_url || '/login';
  const aboutLink = '#about';
  const title = schoolData.cta?.title || 'Begin Your Academic Journey Today';
  const description = schoolData.cta?.description || 'Join a community dedicated to excellence, discipline, and future success.';

  return (
    <section ref={sectionRef} data-reveal className={`py-16 sm:py-20 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-12 text-white shadow-2xl"
          style={{ background: `linear-gradient(135deg, ${secondary}, #111827)` }}
        >
          <div className="grid gap-8 lg:grid-cols-[1.4fr_auto] lg:items-center">
            <div>
              <div className="inline-flex rounded-full px-4 py-1 text-sm font-semibold"
                style={{ backgroundColor: `rgba(244, 196, 48, 0.14)`, color: resolveColor(theme_color, DEFAULT.theme_color) }}
              >
                Admissions & Portal Access
              </div>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h2>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/80">{description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a
                href={portalLink}
                className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition-transform duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: resolveColor(theme_color, DEFAULT.theme_color) }}
              >
                Visit Portal
              </a>
              <a
                href={aboutLink}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-white/10"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;