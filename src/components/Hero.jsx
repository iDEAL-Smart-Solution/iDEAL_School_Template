import React from 'react';

const Hero = ({ schoolData }) => {
  if (!schoolData) return null;

  const { name, tagline, portal_link, theme_color } = schoolData;
  const registerLink = portal_link
    ? portal_link.includes('/login')
      ? portal_link.replace('/login', '/register')
      : portal_link.includes('login')
      ? portal_link.replace('login', 'register')
      : '/register'
    : '/register';

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 py-20 sm:py-28 lg:py-32">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-8 left-0 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fadeIn">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {name}
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl text-blue-100 mb-10 font-light max-w-2xl mx-auto">
            {tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={portal_link}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
            >
              Login
            </a>
            <a
              href={registerLink}
              className="px-8 py-3 bg-gradient-to-r from-white/10 to-white/20 text-white rounded-lg font-semibold hover:opacity-95 transition-all duration-300 border border-white/20"
            >
              Register
            </a>
            <a
              href="#about"
              className="px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white hover:border-blue-100"
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
