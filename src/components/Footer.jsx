import React from 'react';
import { getReadableText } from '../utils/landingPageTheme';
import { DEFAULT_LANDING_PAGE } from '../services/landingPageService';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

const Footer = ({ schoolData }) => {
  const [sectionRef, isVisible] = useRevealOnScroll();

  if (!schoolData) return null;

  const { name, logo, footer, portal_link, secondary_color, accent_color } = schoolData;
  const registerLink = portal_link
    ? portal_link.includes('/login')
      ? portal_link.replace('/login', '/register')
      : portal_link.includes('login')
      ? portal_link.replace('login', 'register')
      : '/register'
    : '/register';
  const initials = name
    ? name
        .split(' ')
        .map((s) => s[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'S';
  const currentYear = new Date().getFullYear();
  const copyrightText = footer?.copyright || `© ${currentYear} ${name}. All rights reserved.`;
  const secondary = secondary_color || '#1A1A2E';
  const accent = accent_color || '#D4AF37';
  const brandDescription = getReadableText(schoolData.tagline, '') || getReadableText(schoolData.about, DEFAULT_LANDING_PAGE.tagline);

  return (
    <footer ref={sectionRef} data-reveal className={`py-12 sm:py-16 text-gray-200 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ backgroundColor: secondary }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
          {/* Column 1: School Info */}
          <div className="animate-fadeIn">
            <div className="flex items-center space-x-3 mb-4">
              {logo ? (
                <img
                  src={logo}
                  alt={name}
                  className="h-10 w-10 rounded-md object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="h-10 w-10 rounded-md bg-gray-100 text-slate-700 flex items-center justify-center font-semibold">
                  {initials}
                </div>
              )}
              <span className="text-xl font-bold text-white">{name}</span>
            </div>
            <p className="text-gray-400 mb-4">
              {brandDescription}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#programs"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Programs
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href={portal_link}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href={registerLink}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & CTA */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-white font-semibold text-lg mb-4">Get Started</h3>
            <p className="text-gray-400 mb-6">
              Access the portal and begin your learning journey.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={portal_link}
                className="inline-block px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm"
                style={{ backgroundColor: accent, color: secondary }}
              >
                Login
              </a>
              <a
                href={registerLink}
                className="inline-block px-4 py-2 rounded-lg font-semibold shadow-lg"
                style={{ backgroundColor: 'rgba(255,255,255,0.10)', color: '#fff' }}
              >
                Register
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm">
          <p>{copyrightText}</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
