import React from 'react';

const About = ({ schoolData }) => {
  if (!schoolData || !schoolData.about) return null;

  const { name, about, logo, mission, vision, core_values, secondary_color, accent_color } = schoolData;
  const secondary = secondary_color || '#1A1A2E';
  const accent = accent_color || '#D4AF37';

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image/Logo */}
          <div className="flex justify-center">
            <div className="relative">
              {logo && (
                <div className="rounded-2xl p-8 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(244,196,48,0.12), rgba(26,26,46,0.06))' }}>
                  <img
                    src={logo}
                    alt={name}
                    className="h-64 w-64 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              {/* Decorative element */}
              <div className="absolute top-4 right-4 h-20 w-20 rounded-full blur-2xl opacity-40" style={{ backgroundColor: accent }}></div>
            </div>
          </div>

          {/* Right side - Text */}
          <div className="animate-fadeIn">
            <div className="inline-block mb-4 px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: 'rgba(244, 196, 48, 0.15)', color: secondary }}>
              About Us
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight" style={{ color: secondary }}>
              Welcome to {name}
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {about}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: secondary }}>Mission</p>
                <p className="mt-2 text-gray-700 leading-relaxed">{mission}</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: secondary }}>Vision</p>
                <p className="mt-2 text-gray-700 leading-relaxed">{vision}</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: secondary }}>Core Values</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {(core_values || []).map((value) => (
                  <span
                    key={value}
                    className="rounded-full px-4 py-2 text-sm font-semibold"
                    style={{ backgroundColor: 'rgba(244, 196, 48, 0.12)', color: secondary }}
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
