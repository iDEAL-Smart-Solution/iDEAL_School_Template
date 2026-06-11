import React from 'react';

const defaultFeatures = [
  {
    icon: '👨‍🏫',
    title: 'Experienced Teachers',
    description: 'Highly qualified teachers who combine subject mastery with student mentorship.',
  },
  {
    icon: '🏫',
    title: 'Modern Learning Environment',
    description: 'A disciplined and well-structured environment that supports focused learning.',
  },
  {
    icon: '🎓',
    title: 'Academic Excellence',
    description: 'A consistent record of strong results, rigorous standards, and quality instruction.',
  },
  {
    icon: '🛡️',
    title: 'Character Development',
    description: 'Programs that build responsibility, respect, and strong moral values.',
  },
  {
    icon: '💻',
    title: 'ICT Integration',
    description: 'Digital literacy and technology-enabled learning to prepare students for the future.',
  },
  {
    icon: '⭐',
    title: 'Leadership Training',
    description: 'Opportunities that develop confidence, initiative, and responsible leadership.',
  },
];

const Features = ({ schoolData }) => {
  const features = schoolData?.features?.length ? schoolData.features : defaultFeatures;
  const secondary = schoolData?.secondary_color || '#1A1A2E';
  const accent = schoolData?.accent_color || '#D4AF37';

  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div
            className="inline-block mb-4 rounded-full px-3 py-1 text-sm font-semibold"
            style={{ backgroundColor: 'rgba(244, 196, 48, 0.16)', color: secondary }}
          >
            Why Choose Us
          </div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl" style={{ color: secondary }}>
            Why Families Trust Command Day Secondary School, Ojo
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            A disciplined academic culture built around teachers, support systems, and future-ready learning.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={feature.title || idx}
              className="animate-fadeIn rounded-xl bg-white p-8 shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              style={{
                borderTop: `4px solid ${accent}`,
                animationDelay: `${idx * 0.1}s`,
              }}
            >
              {feature.icon && <div className="mb-4 text-4xl">{feature.icon}</div>}
              <h3 className="mb-3 text-xl font-semibold" style={{ color: secondary }}>
                {feature.title || feature.name}
              </h3>
              <p className="leading-relaxed text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
