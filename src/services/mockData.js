/**
 * Legacy mock school data.
 * The landing page now fetches live school details from the public API.
 * This file keeps one iDEAL fallback record only, for local fallback use.
 */

export const mockSchools = [
  {
    id: 1,
    name: "Ideal International College",
    slug: "ideal-international",
    logo: "/logo.png",
    theme_color: "#254ccf",
    secondary_color: "#0f172a",
    accent_color: "#3b82f6",
    background_color: "#ffffff",
    text_color: "#222222",
    tagline: "Empowering Students Through Technology",
    about: "Ideal International College is a premier institution dedicated to providing cutting-edge digital education solutions. We leverage advanced technology to create an engaging learning environment where students can excel academically and prepare for the future. Our comprehensive approach combines traditional educational excellence with innovative digital tools.",
    features: [
      {
        title: "Digital Learning Platform",
        description: "Access course materials, lectures, and resources from anywhere, anytime",
        icon: "📚"
      },
      {
        title: "Progress Tracking",
        description: "Real-time analytics and detailed progress reports for students and parents",
        icon: "📊"
      },
      {
        title: "Direct Communication",
        description: "Seamless messaging between students, teachers, and parents",
        icon: "💬"
      },
      {
        title: "Assignment Management",
        description: "Submit assignments, receive feedback, and track grades instantly",
        icon: "📝"
      },
      {
        title: "Schedule Management",
        description: "Interactive calendar with class schedules and important dates",
        icon: "📅"
      },
      {
        title: "Enterprise Security",
        description: "Bank-level encryption protecting all student and institutional data",
        icon: "🔐"
      }
    ],
    programs: [
      {
        name: "Science",
        description: "Physics, Chemistry, Biology with hands-on laboratory experience and practical projects",
        icon: "🔬"
      },
      {
        name: "Humanities",
        description: "English, History, Geography, Social Studies with critical thinking focus",
        icon: "📚"
      },
      {
        name: "Computer Science",
        description: "Programming, Web Development, AI, and Data Science for future tech leaders",
        icon: "💻"
      },
      {
        name: "Mathematics",
        description: "Pure and Applied Mathematics with advanced problem-solving techniques",
        icon: "📐"
      },
      {
        name: "Arts & Humanities",
        description: "Fine Arts, Visual Arts, and Performing Arts programs",
        icon: "🎨"
      },
      {
        name: "Physical Education",
        description: "Sports, Fitness, and Health Education programs",
        icon: "🏃"
      }
    ],
    contact: {
      email: "info@idealinternational.edu",
      phone: "+92-300-1234567",
      address: "123 Education Lane, Lahore, Pakistan"
    },
    portal_link: "/login",
    footer: {
      copyright: "© 2026 Ideal International College. All rights reserved.",
      company_name: "Ideal International College"
    }
  }
];

export const getMockSchoolData = (schoolIdOrSlug = 1, isSlug = false) => {
  const normalized = String(schoolIdOrSlug).trim();
  const parsedId = Number(normalized);
  const school = isSlug
    ? mockSchools.find((s) => s.slug === normalized)
    : Number.isFinite(parsedId)
      ? mockSchools.find((s) => s.id === parsedId)
      : mockSchools.find((s) => s.slug === normalized);

  if (!school) {
    throw new Error('School not found');
  }

  return school;
};
