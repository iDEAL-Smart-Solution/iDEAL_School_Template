import React, { useState } from 'react';

const Navbar = ({ schoolData }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!schoolData) return null;

  const { name, logo, portal_link, theme_color } = schoolData;
  const loginLink = portal_link || '/login';
  const registerLink = deriveRegisterLink(loginLink);
  const navAccent = theme_color || '#2563eb';
  const initials = name
    ? name
        .split(' ')
        .map((s) => s[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'S';

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md transition-shadow duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 min-w-0">
            {logo ? (
              <img
                src={logo}
                alt={name}
                className="h-11 w-11 shrink-0 rounded-xl bg-white object-contain ring-1 ring-slate-200 shadow-sm"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="h-11 w-11 shrink-0 rounded-xl bg-gray-100 text-slate-600 flex items-center justify-center text-sm font-bold">
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <span className="block truncate text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {name}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </a>
            <a
              href="#features"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Features
            </a>
            <a
              href="#programs"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Programs
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </a>
            <div className="flex items-center gap-4 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 shadow-sm">
              <a
                href={loginLink}
                className="text-slate-700 font-semibold tracking-wide transition-colors hover:text-slate-950"
              >
                Login
              </a>
              <span
                className="select-none text-slate-300 text-lg leading-none"
                aria-hidden="true"
              >
                |
              </span>
              <a
                href={registerLink}
                className="inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${navAccent}, #1d4ed8)`,
                }}
              >
                Register
              </a>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
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
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 animate-fadeIn">
            <a
              href="#about"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#features"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a
              href="#programs"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Programs
            </a>
            <a
              href="#contact"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href={loginLink}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center font-semibold text-slate-800 shadow-sm transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 sm:min-w-28"
                onClick={() => setIsOpen(false)}
              >
                Login
              </a>
              <span
                className="hidden select-none items-center justify-center px-1 text-slate-300 text-xl leading-none sm:flex"
                aria-hidden="true"
              >
                |
              </span>
              <a
                href={registerLink}
                className="rounded-2xl px-5 py-3 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:min-w-28"
                style={{
                  background: `linear-gradient(135deg, ${navAccent}, #1d4ed8)`,
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

const deriveRegisterLink = (loginLink) => {
  if (!loginLink) return '/register';

  if (loginLink.includes('/login')) {
    return loginLink.replace('/login', '/register');
  }

  if (loginLink.includes('login')) {
    return loginLink.replace('login', 'register');
  }

  return '/register';
};

export default Navbar;
