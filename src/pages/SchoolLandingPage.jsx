import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Programs from '../components/Programs';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import useSchoolData from '../hooks/useSchoolData';

const SchoolLandingPage = ({ schoolId, isSlug = false }) => {
  const { data: schoolData, loading, error, refetch } = useSchoolData(
    schoolId,
    isSlug
  );

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="spinner mb-4 w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading school portal...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center max-w-md">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={refetch}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No Data State
  if (!schoolData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <p className="text-gray-600 font-medium">No school data available</p>
        </div>
      </div>
    );
  }

  // Success State - Render Landing Page
  return (
    <div className="w-full bg-white scroll-smooth">
      {/* Navbar */}
      <Navbar schoolData={schoolData} />

      {/* Hero Section */}
      <Hero schoolData={schoolData} />

      {/* About Section */}
      <About schoolData={schoolData} />

      {/* Features Section */}
      <Features schoolData={schoolData} />

      {/* Programs Section */}
      <Programs schoolData={schoolData} />

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
