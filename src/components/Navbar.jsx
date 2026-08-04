import React, { useState, useEffect } from 'react';
import { resolveColor } from '../utils/landingPageTheme';
import { DEFAULT_LANDING_PAGE } from '../services/landingPageService';

// Pure function exported for testability (Property 3)
export const computeNavStyle = (scrollY, secondaryColor) => {
  return scrollY > 60
    ? { backgroundColor: resolveColor(secondaryColor, DEFAULT_LANDING_PAGE.secondary_color) }
    : { backgroundColor: 'rgba(0, 0, 0, 0)' };
};

// Pure function exported for testability
export const deriveRegisterLink = (portalLink) => {
  if (!portalLink) return '/register';
  if (portalLink.includes('/login')) return portalLink.replace('/login', '/register');
  if (portalLink.includes('login')) return portalLink.replace('login', 'register');
  return '/register';
};

const Navbar = ({ schoolData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    // Call once on mount to handle pre-scrolled state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!schoolData) return null;

  const {
    name,
    logo,
    portal_link,
    theme_color,
    secondary_color,
    accent_color,
    text_color,
  } = schoolData;

  const loginLink = portal_link || '/login';
  const registerLink = deriveRegisterLink(loginLink);
  const navAccent = theme_color || '#F4C430';
  const buttonAccent = accent_color || '#D4AF37';
  const textTone = text_color || '#222222';
  const initials = name
    ? name
        .split(' ')
        .map((s) => s[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'S';

  const navStyle = scrolled
    ? { backgroundColor: resolveColor(secondary_color, DEFAULT_LANDING_PAGE.secondary_color) }
    : { backgroundColor: 'rgba(0, 0, 0, 0)' };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 shadow-md transition-all duration-300"
      style={navStyle}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 min-w-0">
            {logo ? (
              <img
                src={logo}
                alt={name}
                className="h-11 w-11 shrink-0 rounded-xl bg-white object-contain ring-1 ring-white/10 shadow-sm"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="h-11 w-11 shrink-0 rounded-xl bg-white/10 text-white flex items-center justify-center text-sm font-bold">
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <span className="block truncate text-lg sm:text-xl font-bold leading-tight text-white">
                {name}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="font-medium transition-colors text-white/80 hover:text-[var(--lp-theme)]"
            >
              About
            </a>
            <a
              href="#features"
              className="font-medium transition-colors text-white/80 hover:text-[var(--lp-theme)]"
            >
              Features
            </a>
            <a
              href="#programs"
              className="font-medium transition-colors text-white/80 hover:text-[var(--lp-theme)]"
            >
              Programs
            </a>
            <a
              href="#contact"
              className="font-medium transition-colors text-white/80 hover:text-[var(--lp-theme)]"
            >
              Contact
            </a>
            <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-sm">
              <a
                href={loginLink}
                className="font-semibold tracking-wide transition-colors text-white/80 hover:text-[var(--lp-theme)]"
              >
                Login
              </a>
              <span
                className="select-none text-white/30 text-lg leading-none"
                aria-hidden="true"
              >
                |
              </span>
              <a
                href={registerLink}
                className="inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${navAccent}, ${buttonAccent})`,
                  color: textTone,
                }}
              >
                Register
              </a>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg transition-colors hover:bg-white/10"
            aria-label="Toggle menu"
          >
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
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 animate-fadeIn">
            <a
              href="#about"
              className="block py-2 font-medium text-white/80 hover:text-[var(--lp-theme)]"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#features"
              className="block py-2 font-medium text-white/80 hover:text-[var(--lp-theme)]"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a
              href="#programs"
              className="block py-2 font-medium text-white/80 hover:text-[var(--lp-theme)]"
              onClick={() => setIsOpen(false)}
            >
              Programs
            </a>
            <a
              href="#contact"
              className="block py-2 font-medium text-white/80 hover:text-[var(--lp-theme)]"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href={loginLink}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-center font-semibold text-white/90 shadow-sm transition-all duration-300 hover:bg-white/10 sm:min-w-28"
                onClick={() => setIsOpen(false)}
              >
                Login
              </a>
              <span
                className="hidden select-none items-center justify-center px-1 text-white/30 text-xl leading-none sm:flex"
                aria-hidden="true"
              >
                |
              </span>
              <a
                href={registerLink}
                className="rounded-2xl px-5 py-3 text-center font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:min-w-28"
                style={{
                  background: `linear-gradient(135deg, ${navAccent}, ${buttonAccent})`,
                  color: textTone,
                }}
                onClick={() => setIsOpen(false)}
              >
                Register
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
