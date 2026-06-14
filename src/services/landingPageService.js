const PUBLIC_LANDING_PAGE_ENDPOINT = 'https://suite.api.idealsmartsolutions.com/api/LandingPage/public';

/**
 * @typedef {Object} LandingPageStatisticsItem
 * @property {string} value
 * @property {string} label
 *
 * @typedef {Object} LandingPageListItem
 * @property {string} [icon]
 * @property {string} [name]
 * @property {string} [title]
 * @property {string} [description]
 * @property {string} [details]
 *
 * @typedef {Object} LandingPageData
 * @property {string} name
 * @property {string} logo
 * @property {string} theme_color
 * @property {string} secondary_color
 * @property {string} accent_color
 * @property {string} background_color
 * @property {string} text_color
 * @property {string} tagline
 * @property {string} hero_title
 * @property {string} hero_description
 * @property {string} about
 * @property {string} mission
 * @property {string} vision
 * @property {string[]} core_values
 * @property {LandingPageStatisticsItem[]} statistics
 * @property {LandingPageListItem[]} features
 * @property {LandingPageListItem[]} programs
 * @property {{ email?: string, phone?: string, address?: string, description?: string, portal_url?: string }} contact
 * @property {string} portal_link
 * @property {{ copyright: string, company_name: string }} footer
 * @property {{ title: string, description: string }} cta
 */

const DEFAULT_DOMAIN = 'localhost';

const DEFAULT_LANDING_PAGE = {
  name: 'Ideal International College',
  logo: '/logo.png',
  theme_color: '#254ccf',
  secondary_color: '#0f172a',
  accent_color: '#3b82f6',
  background_color: '#ffffff',
  text_color: '#222222',
  tagline: 'Empowering Students Through Technology',
  hero_title: 'Welcome to Ideal International College',
  hero_description:
    'A modern learning environment built to support digital education, academic growth, and student success.',
  about:
    'Ideal International College is a premier institution dedicated to providing cutting-edge digital education solutions. We leverage advanced technology to create an engaging learning environment where students can excel academically and prepare for the future. Our comprehensive approach combines traditional educational excellence with innovative digital tools.',
  mission:
    'To empower students through quality education, innovation, and a technology-rich learning experience.',
  vision:
    'To be a leading institution known for academic excellence, digital transformation, and student-centered learning.',
  core_values: ['Innovation', 'Excellence', 'Integrity', 'Responsibility', 'Growth', 'Service'],
  statistics: [
    { value: '2000+', label: 'Students' },
    { value: '120+', label: 'Qualified Teachers' },
    { value: '95%', label: 'Examination Success Rate' },
    { value: '25+', label: 'Years of Academic Excellence' },
  ],
  features: [
    {
      title: 'Digital Learning Platform',
      description: 'Access course materials, lectures, and resources from anywhere, anytime.',
      icon: '📚',
    },
    {
      title: 'Progress Tracking',
      description: 'Real-time analytics and detailed progress reports for students and parents.',
      icon: '📊',
    },
    {
      title: 'Direct Communication',
      description: 'Seamless messaging between students, teachers, and parents.',
      icon: '💬',
    },
    {
      title: 'Assignment Management',
      description: 'Submit assignments, receive feedback, and track grades instantly.',
      icon: '📝',
    },
    {
      title: 'Schedule Management',
      description: 'Interactive calendar with class schedules and important dates.',
      icon: '📅',
    },
    {
      title: 'Enterprise Security',
      description: 'Bank-level encryption protecting all student and institutional data.',
      icon: '🔐',
    },
  ],
  programs: [
    {
      name: 'Science',
      description: 'Physics, Chemistry, Biology with hands-on laboratory experience and practical projects.',
      icon: '🔬',
    },
    {
      name: 'Humanities',
      description: 'English, History, Geography, Social Studies with critical thinking focus.',
      icon: '📚',
    },
    {
      name: 'Computer Science',
      description: 'Programming, Web Development, AI, and Data Science for future tech leaders.',
      icon: '💻',
    },
    {
      name: 'Mathematics',
      description: 'Pure and Applied Mathematics with advanced problem-solving techniques.',
      icon: '📐',
    },
    {
      name: 'Arts & Humanities',
      description: 'Fine Arts, Visual Arts, and Performing Arts programs.',
      icon: '🎨',
    },
    {
      name: 'Physical Education',
      description: 'Sports, Fitness, and Health Education programs.',
      icon: '🏃',
    },
  ],
  contact: {
    portal_url: '/login',
    description: 'Use the official school portal for student services, updates, and admissions access.',
  },
  portal_link: '/login',
  footer: {
    copyright: '© 2026 Ideal International College. All rights reserved.',
    company_name: 'Ideal International College',
  },
  cta: {
    title: 'Begin Your Academic Journey Today',
    description: 'Join a community dedicated to excellence, innovation, and future success.',
  },
};

const pickFirst = (...values) => values.find((value) => value !== undefined && value !== null && value !== '');

const getString = (value, fallback = '') => {
  if (typeof value === 'string') return value.trim() || fallback;
  if (typeof value === 'number') return String(value);
  return fallback;
};

const getArray = (value) => (Array.isArray(value) ? value.filter(Boolean) : []);

const normalizeContact = (source = {}, portalLink = '') => ({
  email: getString(pickFirst(source.email, source.Email, source.contactEmail), ''),
  phone: getString(pickFirst(source.phone, source.Phone, source.contactPhone), ''),
  address: getString(pickFirst(source.address, source.Address, source.location), ''),
  description: getString(pickFirst(source.description, source.Description), ''),
  portal_url: getString(pickFirst(source.portal_url, source.portalUrl, source.portalLink, portalLink), ''),
});

const normalizeItemList = (items = []) =>
  items.map((item) => ({
    icon: getString(item?.icon, ''),
    name: getString(pickFirst(item?.name, item?.title), ''),
    title: getString(pickFirst(item?.title, item?.name), ''),
    description: getString(pickFirst(item?.description, item?.details), ''),
    details: getString(item?.details, ''),
  }));

const normalizeStatistics = (items = []) =>
  items.map((item) => ({
    value: getString(item?.value, ''),
    label: getString(item?.label, ''),
  }));

const normalizeLandingPageData = (payload = {}) => {
  const source = payload?.data || payload?.result || payload?.landingPage || payload;
  const branding = source?.branding || {};
  const content = source?.content || {};
  const contactSource = source?.contact || source?.contactInfo || {};
  const footerSource = source?.footer || source?.footerInfo || {};
  const ctaSource = source?.cta || {};

  const name = getString(
    pickFirst(
      source.schoolName,
      source.name,
      branding.schoolName,
      branding.name,
      content.schoolName,
      content.name,
    ),
    DEFAULT_LANDING_PAGE.name,
  );

  const logo = getString(
    pickFirst(
      source.logo,
      source.schoolLogo,
      source.school_logo,
      branding.logo,
      branding.schoolLogo,
      branding.school_logo,
      branding.schoolLogoFilePath,
    ),
    DEFAULT_LANDING_PAGE.logo,
  );

  const theme_color = getString(
    pickFirst(source.theme_color, source.themeColor, branding.themeColor, branding.theme_color),
    DEFAULT_LANDING_PAGE.theme_color,
  );

  const secondary_color = getString(
    pickFirst(source.secondary_color, source.secondaryColor, branding.secondaryColor, branding.secondary_color),
    DEFAULT_LANDING_PAGE.secondary_color,
  );

  const accent_color = getString(
    pickFirst(source.accent_color, source.accentColor, branding.accentColor, branding.accent_color),
    DEFAULT_LANDING_PAGE.accent_color,
  );

  const background_color = getString(
    pickFirst(source.background_color, source.backgroundColor, branding.backgroundColor),
    DEFAULT_LANDING_PAGE.background_color,
  );

  const text_color = getString(
    pickFirst(source.text_color, source.textColor, branding.textColor),
    DEFAULT_LANDING_PAGE.text_color,
  );

  const portal_link = getString(
    pickFirst(source.portal_link, source.portalLink, contactSource.portal_url, contactSource.portalUrl),
    DEFAULT_LANDING_PAGE.portal_link,
  );

  const rawCoreValues = getArray(pickFirst(source.core_values, source.coreValues, content.core_values, content.coreValues));
  const statistics = normalizeStatistics(getArray(pickFirst(source.statistics, content.statistics)));
  const features = normalizeItemList(getArray(pickFirst(source.features, content.features)));
  const programs = normalizeItemList(getArray(pickFirst(source.programs, content.programs)));

  return {
    name,
    logo,
    theme_color,
    secondary_color,
    accent_color,
    background_color,
    text_color,
    tagline: getString(pickFirst(source.tagline, content.tagline), DEFAULT_LANDING_PAGE.tagline),
    hero_title: getString(
      pickFirst(source.hero_title, source.heroTitle, content.hero_title, content.heroTitle),
      DEFAULT_LANDING_PAGE.hero_title,
    ),
    hero_description: getString(
      pickFirst(source.hero_description, source.heroDescription, content.hero_description, content.heroDescription),
      DEFAULT_LANDING_PAGE.hero_description,
    ),
    about: getString(pickFirst(source.about, content.about), DEFAULT_LANDING_PAGE.about),
    mission: getString(pickFirst(source.mission, content.mission), DEFAULT_LANDING_PAGE.mission),
    vision: getString(pickFirst(source.vision, content.vision), DEFAULT_LANDING_PAGE.vision),
    core_values: rawCoreValues.length ? rawCoreValues.map((value) => getString(value, '')).filter(Boolean) : DEFAULT_LANDING_PAGE.core_values,
    statistics: statistics.length ? statistics : DEFAULT_LANDING_PAGE.statistics,
    features: features.length ? features : DEFAULT_LANDING_PAGE.features,
    programs: programs.length ? programs : DEFAULT_LANDING_PAGE.programs,
    contact: normalizeContact(contactSource, portal_link),
    portal_link,
    footer: {
      copyright: getString(
        pickFirst(footerSource.copyright, source.copyright),
        DEFAULT_LANDING_PAGE.footer.copyright,
      ),
      company_name: getString(
        pickFirst(footerSource.company_name, footerSource.companyName, source.company_name, source.companyName),
        DEFAULT_LANDING_PAGE.footer.company_name,
      ),
    },
    cta: {
      title: getString(pickFirst(ctaSource.title, source.cta_title, source.ctaTitle), DEFAULT_LANDING_PAGE.cta.title),
      description: getString(
        pickFirst(ctaSource.description, source.cta_description, source.ctaDescription),
        DEFAULT_LANDING_PAGE.cta.description,
      ),
    },
  };
};

const buildFriendlyError = async (response) => {
  try {
    const payload = await response.json();
    return payload?.message || payload?.error || `Request failed with status ${response.status}`;
  } catch (_error) {
    return `Request failed with status ${response.status}`;
  }
};

export const getCurrentDomainName = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_DOMAIN;
  }

  return window.location.hostname || window.location.host || DEFAULT_DOMAIN;
};

/**
 * Loads the public landing page for the current browser domain.
 * If the API fails, returns the built-in fallback content so the page still renders.
 */
export const fetchPublicLandingPage = async (domainName = getCurrentDomainName()) => {
  const safeDomain = getString(domainName, DEFAULT_DOMAIN);

  try {
    const response = await fetch(
      `${PUBLIC_LANDING_PAGE_ENDPOINT}?domainName=${encodeURIComponent(safeDomain)}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(await buildFriendlyError(response));
    }

    const payload = await response.json();
    const source = payload?.data || payload?.result || payload?.landingPage || payload;
    const hasMeaningfulData = Boolean(
      pickFirst(
        source?.schoolName,
        source?.name,
        source?.logo,
        source?.theme_color,
        source?.themeColor,
        source?.about,
        source?.hero_title,
        source?.heroTitle,
      ),
    );

    if (!hasMeaningfulData) {
      throw new Error('School not found');
    }

    const normalized = normalizeLandingPageData(payload);

    if (!normalized.name) {
      throw new Error('School not found');
    }

    return {
      data: normalized,
      error: null,
      isFallback: false,
      domainName: safeDomain,
    };
  } catch (error) {
    console.error('Landing page API error:', error);

    return {
      data: normalizeLandingPageData(DEFAULT_LANDING_PAGE),
      error: error?.message || 'Failed to load school landing page',
      isFallback: true,
      domainName: safeDomain,
    };
  }
};

export const getFallbackLandingPageData = () => normalizeLandingPageData(DEFAULT_LANDING_PAGE);
