/**
 * Mock School Data
 * This file contains sample school data for testing and development
 * In production, this data would come from your backend API
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
      copyright: "© 2024 Ideal International College. All rights reserved.",
      company_name: "Ideal International College"
    }
  },
  {
    id: 2,
    name: "Command Day Secondary School, Ojo",
    slug: "command-day-secondary-school-ojo",
    logo: "/command_logo.jpg",
    theme_color: "#F4C430",
    secondary_color: "#1A1A2E",
    accent_color: "#D4AF37",
    background_color: "#FFFFFF",
    text_color: "#222222",
    tagline: "Excellence Through Discipline and Quality Education",
    hero_title: "Welcome to Command Day Secondary School, Ojo",
    hero_description: "Providing quality education, character development, leadership training, and academic excellence in a disciplined learning environment.",
    about: "Command Day Secondary School, Ojo is a leading educational institution committed to nurturing students into responsible, knowledgeable, and productive citizens. Through a blend of academic excellence, discipline, leadership development, and extracurricular activities, the school prepares learners for success in higher education and future careers.",
    mission: "To provide quality education that develops intellectual capacity, moral values, leadership skills, and lifelong learning.",
    vision: "To be a centre of excellence recognized for producing disciplined, innovative, and globally competitive students.",
    core_values: [
      "Discipline",
      "Excellence",
      "Integrity",
      "Leadership",
      "Responsibility",
      "Innovation"
    ],
    statistics: [
      { value: "2000+", label: "Students" },
      { value: "120+", label: "Qualified Teachers" },
      { value: "95%", label: "Examination Success Rate" },
      { value: "25+", label: "Years of Academic Excellence" }
    ],
    features: [
      {
        title: "Experienced Teachers",
        description: "Highly qualified teachers who combine subject mastery with student mentorship.",
        icon: "👨‍🏫"
      },
      {
        title: "Modern Learning Environment",
        description: "A disciplined and well-structured environment that supports focused learning.",
        icon: "🏫"
      },
      {
        title: "Academic Excellence",
        description: "A consistent record of strong results, rigorous standards, and quality instruction.",
        icon: "🎓"
      },
      {
        title: "Character Development",
        description: "Programs that build responsibility, respect, and strong moral values.",
        icon: "🛡️"
      },
      {
        title: "ICT Integration",
        description: "Digital literacy and technology-enabled learning to prepare students for the future.",
        icon: "💻"
      },
      {
        title: "Leadership Training",
        description: "Opportunities that develop confidence, initiative, and responsible leadership.",
        icon: "⭐"
      }
    ],
    programs: [
      {
        name: "Junior Secondary Education",
        description: "A strong foundation that builds core academic competence and character.",
        icon: "📘"
      },
      {
        name: "Senior Secondary Education",
        description: "Focused academic pathways that prepare students for external examinations and higher education.",
        icon: "📗"
      },
      {
        name: "Science Programs",
        description: "Rigorous science study with practical engagement and laboratory-based learning.",
        icon: "🔬"
      },
      {
        name: "Commercial Programs",
        description: "Commerce-focused learning for students interested in business and finance pathways.",
        icon: "💼"
      },
      {
        name: "Arts & Humanities",
        description: "Humanities subjects that sharpen critical thinking, communication, and civic awareness.",
        icon: "📝"
      },
      {
        name: "ICT and Digital Literacy",
        description: "Technology skills that help students thrive in a modern digital world.",
        icon: "💻"
      },
      {
        name: "Leadership Development",
        description: "Student leadership activities that build confidence, service, and accountability.",
        icon: "🏅"
      },
      {
        name: "Sports and Extracurricular Activities",
        description: "Balanced school life with athletics, clubs, and creative activities.",
        icon: "⚽"
      }
    ],
    contact: {
      portal_url: "https://commandojo.idealsmartsolutions.com/",
      description: "Use the official school portal for student services, updates, and admissions access."
    },
    portal_link: "https://commandojo.idealsmartsolutions.com/",
    footer: {
      copyright: "© 2026 Command Day Secondary School, Ojo. All rights reserved.",
      company_name: "Command Day Secondary School, Ojo"
    }
  },
  {
    id: 3,
    name: "Excellence International",
    slug: "excellence-international",
    logo: "https://via.placeholder.com/200x100?text=Excellence",
    theme_color: "#7c3aed",
    secondary_color: "#312e81",
    accent_color: "#a78bfa",
    background_color: "#ffffff",
    text_color: "#1f2937",
    tagline: "Excellence in Every Aspect",
    about: "Excellence International School is committed to delivering world-class education that prepares students for global success. With cutting-edge facilities and highly qualified educators, we provide a holistic learning experience that develops academic excellence and personal growth.",
    features: [
      {
        title: "Holistic Development",
        description: "Balance between academics, sports, and co-curricular activities",
        icon: "⭐"
      },
      {
        title: "Expert Faculty",
        description: "Highly qualified teachers with international experience",
        icon: "👨‍🏫"
      },
      {
        title: "State-of-the-art Labs",
        description: "Modern laboratories with latest equipment and technology",
        icon: "🔬"
      },
      {
        title: "Cultural Exposure",
        description: "International exchange programs and cultural activities",
        icon: "🌏"
      },
      {
        title: "Mentorship System",
        description: "One-on-one guidance and mentoring from experienced advisors",
        icon: "🎓"
      },
      {
        title: "Career Counseling",
        description: "Professional guidance for university and career selection",
        icon: "🚀"
      }
    ],
    programs: [
      {
        name: "Cambridge O-Levels",
        description: "International Cambridge Board examination programs",
        icon: "🏅"
      },
      {
        name: "Cambridge A-Levels",
        description: "Advanced level qualifications for university entrance",
        icon: "📜"
      },
      {
        name: "Advanced Placement",
        description: "AP courses for college credit",
        icon: "🎯"
      }
    ],
    contact: {
      email: "admissions@excellenceinternational.edu",
      phone: "+92-300-5555555",
      address: "789 Excellence Boulevard, Islamabad, Pakistan"
    },
    portal_link: "/login",
    footer: {
      copyright: "© 2024 Excellence International. All rights reserved.",
      company_name: "Excellence International"
    }
  }
];

/**
 * Mock API Response Function
 * Use this to test the application without a backend
 */
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

/**
 * Instructions for using mock data:
 *
 * 1. In `src/services/schoolApi.js`, import this file:
 *    import { getMockSchoolData } from './mockData';
 *
 * 2. Modify the API functions to use mock data:
 *    export const fetchSchoolLandingPage = async (schoolId) => {
 *      try {
 *        // For testing, return mock data
 *        return getMockSchoolData(schoolId);
 *        
 *        // For production, uncomment the real API call:
 *        // const response = await schoolApi.get(`/schools/${schoolId}/landing-page`);
 *        // return response.data;
 *      } catch (error) {
 *        throw new Error('Failed to fetch school data');
 *      }
 *    };
 *
 * 3. Test with both numeric IDs and slugs in the preview routes.
 */
