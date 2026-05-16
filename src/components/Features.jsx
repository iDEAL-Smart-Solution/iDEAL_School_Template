import React from 'react';

const Features = ({ schoolData }) => {
  if (!schoolData || !schoolData.features || schoolData.features.length === 0) {
    // Show default features if none provided
    return (
      <section id="features" className="py-16 sm:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
              Portal Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Powerful Portal Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for a complete digital education experience
            </p>
          </div>

          {/* Features Grid - Default */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '📚',
                title: 'Digital Learning',
                description: 'Access course materials and learning resources anytime, anywhere',
              },
              {
                icon: '📊',
                title: 'Progress Tracking',
                description: 'Monitor student progress with detailed analytics and reports',
              },
              {
                icon: '💬',
                title: 'Communication',
                description: 'Direct messaging between students, teachers, and parents',
              },
              {
                icon: '📝',
                title: 'Assignment Management',
                description: 'Submit and review assignments with real-time feedback',
              },
              {
                icon: '📅',
                title: 'Schedule Management',
                description: 'View class schedules and important dates in one place',
              },
              {
                icon: '🔐',
                title: 'Secure Access',
                description: 'Enterprise-grade security for protecting student data',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fadeIn"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
            Portal Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Powerful Portal Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need for a complete digital education experience
          </p>
        </div>

        {/* Features Grid - From API */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schoolData.features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fadeIn"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {feature.icon && (
                <div className="text-4xl mb-4">{feature.icon}</div>
              )}
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title || feature.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
