import React from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

const SchoolStats = ({ schoolData }) => {
  const [sectionRef, isVisible] = useRevealOnScroll();

  if (!schoolData?.statistics?.length) return null;

  const accent = schoolData.accent_color || '#D4AF37';
  const secondary = schoolData.secondary_color || '#1A1A2E';

  return (
    <section ref={sectionRef} data-reveal className={`py-16 sm:py-20 bg-white transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {schoolData.statistics.filter(item => Boolean(item.value)).map((item, index) => (
            <div
              key={item.label}
              className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
              style={{
                borderColor: 'rgba(26, 26, 46, 0.12)',
                animationDelay: `${index * 0.08}s`,
              }}
            >
              <div
                className="mb-3 h-12 w-12 rounded-2xl flex items-center justify-center text-lg font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${secondary}, ${accent})` }}
              >
                {item.value.replace(/[+%]/g, '').slice(0, 2)}
              </div>
              <p className="text-3xl font-bold" style={{ color: secondary }}>
                {item.value}
              </p>
              <p className="mt-2 text-sm font-medium text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchoolStats;