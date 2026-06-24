import React from 'react';
import { resolveColor } from '../utils/landingPageTheme';
import { DEFAULT_LANDING_PAGE } from '../services/landingPageService';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

const defaultPrograms = [
  { icon: '📘', name: 'Junior Secondary Education', description: 'A strong foundation that builds core academic competence and character.' },
  { icon: '📗', name: 'Senior Secondary Education', description: 'Focused academic pathways that prepare students for external examinations and higher education.' },
  { icon: '🔬', name: 'Science Programs', description: 'Rigorous science study with practical engagement and laboratory-based learning.' },
  { icon: '💼', name: 'Commercial Programs', description: 'Commerce-focused learning for students interested in business and finance pathways.' },
  { icon: '📝', name: 'Arts & Humanities', description: 'Humanities subjects that sharpen critical thinking, communication, and civic awareness.' },
  { icon: '💻', name: 'ICT and Digital Literacy', description: 'Technology skills that help students thrive in a modern digital world.' },
  { icon: '🏅', name: 'Leadership Development', description: 'Student leadership activities that build confidence, service, and accountability.' },
  { icon: '⚽', name: 'Sports and Extracurricular Activities', description: 'Balanced school life with athletics, clubs, and creative activities.' },
];

const Programs = ({ schoolData }) => {
  const [sectionRef, isVisible] = useRevealOnScroll();
  const programs = schoolData?.programs?.length ? schoolData.programs : defaultPrograms;
  const secondary = schoolData?.secondary_color || '#1A1A2E';
  const accent = schoolData?.accent_color || '#D4AF37';
  const primary = schoolData?.theme_color || '#F4C430';

  return (
    <section id="programs" ref={sectionRef} data-reveal className={`py-16 sm:py-20 lg:py-24 bg-white transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div
            className="inline-block mb-4 rounded-full px-3 py-1 text-sm font-semibold"
            style={{ backgroundColor: 'rgba(244, 196, 48, 0.16)', color: secondary }}
          >
            Featured Programs
          </div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl" style={{ color: secondary }}>
            Programs & Academic Pathways
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Structured pathways designed to develop knowledge, discipline, and future-ready skills.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, idx) => (
            <div
              key={program.name || idx}
              className="animate-fadeIn rounded-xl border p-8 transition-all duration-300 transform hover:-translate-y-2"
              style={{
                animationDelay: `${idx * 0.1}s`,
                borderColor: 'rgba(26, 26, 46, 0.08)',
                background: 'linear-gradient(180deg, rgba(244,196,48,0.10), rgba(255,255,255,1))',
                boxShadow: '0 12px 30px rgba(26, 26, 46, 0.06)',
              }}
            >
              {program.icon && <div className="mb-4 text-5xl">{program.icon}</div>}
              <h3 className="mb-3 text-2xl font-bold" style={{ color: secondary }}>
                {program.name || program.title}
              </h3>
              <p className="leading-relaxed text-gray-700">{program.description}</p>
              {program.details && <p className="mt-4 text-sm text-gray-600">{program.details}</p>}
              {program.image && (
                <div className="mt-6 overflow-hidden rounded-xl">
                  <img
                    src={program.image}
                    alt={program.name || program.title}
                    className="h-52 w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
              <button
                className="mt-6 rounded-lg px-4 py-2 font-semibold transition-colors"
                style={{ backgroundColor: resolveColor(primary, DEFAULT_LANDING_PAGE.theme_color), color: secondary }}
              >
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
