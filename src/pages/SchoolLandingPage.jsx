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
      className="w-full scroll-smooth"
      style={{
        backgroundColor: schoolData.background_color || '#ffffff',
        color: schoolData.text_color || '#222222',
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
      className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 z-40"
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
