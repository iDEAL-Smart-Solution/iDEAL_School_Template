import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import SchoolStats from '../components/SchoolStats';
import Programs from '../components/Programs';
import CallToAction from '../components/CallToAction';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import useSchoolData from '../hooks/useSchoolData';
import LandingPageLoader from '../components/LandingPageLoader';
import { resolveColor } from '../utils/landingPageTheme';
import { DEFAULT_LANDING_PAGE } from '../services/landingPageService';

const SchoolLandingPage = () => {
  const { data: schoolData, loading } = useSchoolData();

  // Once the public API resolves, we synchronise the browser chrome with the loaded school branding.
  React.useEffect(() => {
    if (!schoolData) return;

    document.title = schoolData.name || 'School Landing Page';

    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    if (favicon) {
      favicon.href = schoolData.logo || '/logo.png';
    }

    let themeMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeMeta) {
      themeMeta = document.createElement('meta');
      themeMeta.name = 'theme-color';
      document.head.appendChild(themeMeta);
    }
    if (themeMeta) {
      themeMeta.setAttribute('content', schoolData.theme_color || schoolData.secondary_color || '#1A1A2E');
    }
  }, [schoolData]);

  if (loading) {
    return <LandingPageLoader />;
  }

  // The service already returns a safe fallback object when the API fails, so the landing page still renders.
  return (
    <div
      className="w-full scroll-smooth overflow-x-hidden"
      style={{
        '--lp-theme':     resolveColor(schoolData.theme_color,      DEFAULT_LANDING_PAGE.theme_color),
        '--lp-secondary': resolveColor(schoolData.secondary_color,  DEFAULT_LANDING_PAGE.secondary_color),
        '--lp-accent':    resolveColor(schoolData.accent_color,     DEFAULT_LANDING_PAGE.accent_color),
        '--lp-bg':        resolveColor(schoolData.background_color, DEFAULT_LANDING_PAGE.background_color),
        '--lp-text':      resolveColor(schoolData.text_color,       DEFAULT_LANDING_PAGE.text_color),
        backgroundColor:  'var(--lp-bg)',
        color:            'var(--lp-text)',
      }}
    >
      {/* Navbar */}
      <Navbar schoolData={schoolData} />

      {/* Hero Section */}
      <Hero schoolData={schoolData} />

      {/* Stats Section */}
      <SchoolStats schoolData={schoolData} />

      {/* About Section */}
      <About schoolData={schoolData} />

      {/* Features Section */}
      <Features schoolData={schoolData} />

      {/* Programs Section */}
      <Programs schoolData={schoolData} />

      {/* CTA Section */}
      <CallToAction schoolData={schoolData} />

      {/* Contact Section */}
      <Contact schoolData={schoolData} />

      {/* Footer */}
      <Footer schoolData={schoolData} />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

/**
 * Scroll to Top Button Component
 */
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 z-40 rounded-full p-3 text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.25)]"
      style={{ backgroundColor: 'var(--lp-theme, #1d4ed8)' }}
      aria-label="Scroll to top"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7-7m0 0l-7 7m7-7v12"
        />
      </svg>
    </button>
  );
};

export default SchoolLandingPage;
