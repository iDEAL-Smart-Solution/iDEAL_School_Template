import React from 'react';

const Programs = ({ schoolData }) => {
  if (!schoolData || !schoolData.programs || schoolData.programs.length === 0) {
    // Show default programs if none provided
    return (
      <section id="programs" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
              Academic Programs
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Programs & Faculties
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Diverse academic programs designed to inspire and empower students
            </p>
          </div>

          {/* Programs Grid - Default */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🔬',
                name: 'Science',
                description: 'Physics, Chemistry, Biology with hands-on laboratory experience',
              },
              {
                icon: '📚',
                name: 'Humanities',
                description: 'English, History, Geography, and Social Studies programs',
              },
              {
                icon: '💻',
                name: 'Computer Science',
                description: 'Programming, Web Development, AI, and Data Science',
              },
              {
                icon: '📐',
                name: 'Mathematics',
                description: 'Pure and Applied Mathematics with advanced problem solving',
              },
              {
                icon: '🎨',
                name: 'Arts',
                description: 'Fine Arts, Visual Arts, and Performing Arts programs',
              },
              {
                icon: '🏃',
                name: 'Physical Education',
                description: 'Sports, Fitness, and Health Education programs',
              },
            ].map((program, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-100 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 animate-fadeIn"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-5xl mb-4">{program.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {program.name}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {program.description}
                </p>
                <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Explore
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="programs" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
            Academic Programs
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Programs & Faculties
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Diverse academic programs designed to inspire and empower students
          </p>
        </div>

        {/* Programs Grid - From API */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schoolData.programs.map((program, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-100 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 animate-fadeIn"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {program.icon && (
                <div className="text-5xl mb-4">{program.icon}</div>
              )}
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {program.name || program.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {program.description}
              </p>
              {program.details && (
                <p className="mt-4 text-sm text-gray-600">{program.details}</p>
              )}
              <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Explore
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
