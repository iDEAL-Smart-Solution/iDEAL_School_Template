import React from 'react';

const SchoolStats = ({ schoolData }) => {
  if (!schoolData?.statistics?.length) return null;

  const accent = schoolData.accent_color || '#D4AF37';
  const secondary = schoolData.secondary_color || '#1A1A2E';

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {schoolData.statistics.map((item, index) => (
            <div
              key={item.label}
              className="rounded-2xl border bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1"
              style={{
                borderColor: 'rgba(26, 26, 46, 0.12)',
                boxShadow: '0 10px 30px rgba(26, 26, 46, 0.06)',
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