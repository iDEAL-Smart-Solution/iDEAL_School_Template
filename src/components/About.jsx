import React from 'react';

const About = ({ schoolData }) => {
  if (!schoolData || !schoolData.about) return null;

  const { name, about, logo } = schoolData;

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image/Logo */}
          <div className="flex justify-center">
            <div className="relative">
              {logo && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
                  <img
                    src={logo}
                    alt={name}
                    className="h-64 w-64 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              {/* Decorative element */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-blue-200 rounded-full blur-2xl opacity-40"></div>
            </div>
          </div>

          {/* Right side - Text */}
          <div className="animate-fadeIn">
            <div className="inline-block mb-4 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
              About Us
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Welcome to {name}
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {about}
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {[
                'Innovative Learning Solutions',
                'Digital Excellence',
                'Student-Focused Education',
                'Technology-Driven Approach',
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
