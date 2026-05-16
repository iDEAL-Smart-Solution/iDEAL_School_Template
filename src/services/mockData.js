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
    logo: "https://via.placeholder.com/200x100?text=Ideal+International",
    theme_color: "#1e40af",
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
    name: "Future Academy",
    slug: "future-academy",
    logo: "https://via.placeholder.com/200x100?text=Future+Academy",
    theme_color: "#059669",
    tagline: "Shaping Tomorrow's Leaders",
    about: "Future Academy prepares students for success in an increasingly digital world. Our innovative curriculum combines academic rigor with practical skills training. We believe in nurturing not just knowledge, but critical thinking, creativity, and character.",
    features: [
      {
        title: "Interactive E-Learning",
        description: "Engaging multimedia lessons and interactive content",
        icon: "🎥"
      },
      {
        title: "Virtual Classrooms",
        description: "Live classes with interactive whiteboard and breakout rooms",
        icon: "🖥️"
      },
      {
        title: "AI Learning Assistant",
        description: "Personalized learning paths powered by artificial intelligence",
        icon: "🤖"
      },
      {
        title: "Collaboration Tools",
        description: "Project management and team collaboration features",
        icon: "👥"
      },
      {
        title: "Assessment Hub",
        description: "Comprehensive testing, quizzes, and evaluation tools",
        icon: "✅"
      },
      {
        title: "Resource Library",
        description: "Vast collection of videos, articles, and learning materials",
        icon: "📖"
      }
    ],
    programs: [
      {
        name: "STEM Program",
        description: "Science, Technology, Engineering, Mathematics integration",
        icon: "⚙️"
      },
      {
        name: "Commerce",
        description: "Business Studies, Economics, Accounting programs",
        icon: "💼"
      },
      {
        name: "Language Studies",
        description: "English, Urdu, Arabic, and other language programs",
        icon: "🌍"
      },
      {
        name: "Professional Courses",
        description: "Industry-recognized certification programs",
        icon: "🏆"
      }
    ],
    contact: {
      email: "contact@futureacademy.edu",
      phone: "+92-300-9876543",
      address: "456 Innovation Street, Karachi, Pakistan"
    },
    portal_link: "/login",
    footer: {
      copyright: "© 2024 Future Academy. All rights reserved.",
      company_name: "Future Academy"
    }
  },
  {
    id: 3,
    name: "Excellence International",
    slug: "excellence-international",
    logo: "https://via.placeholder.com/200x100?text=Excellence",
    theme_color: "#7c3aed",
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
export const getMockSchoolData = (schoolIdOrSlug, isSlug = false) => {
  const school = isSlug
    ? mockSchools.find(s => s.slug === schoolIdOrSlug)
    : mockSchools.find(s => s.id === parseInt(schoolIdOrSlug));

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
 *        return getMockSchoolData(schoolId, false);
 *        
 *        // For production, uncomment the real API call:
 *        // const response = await schoolApi.get(`/schools/${schoolId}/landing-page`);
 *        // return response.data;
 *      } catch (error) {
 *        throw new Error('Failed to fetch school data');
 *      }
 *    };
 *
 * 3. Test with URLs like:
 *    http://localhost:3000/school/1
 *    http://localhost:3000/school/slug/ideal-international
 */
