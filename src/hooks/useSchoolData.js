import { useState, useEffect } from 'react';
import { fetchSchoolLandingPage, fetchSchoolBySlug } from '../services/schoolApi';

/**
 * Custom hook to fetch and manage school data
 * @param {string|number} schoolId - The school ID or slug to preview
 * @returns {object} - { data, loading, error, refetch }
 */
export const useSchoolData = (schoolId = 2, isSlug = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSchoolData = async () => {
    try {
      setLoading(true);
      setError(null);

      const schoolData = isSlug
        ? await fetchSchoolBySlug(schoolId)
        : await fetchSchoolLandingPage(schoolId);

      // Validate required fields
      if (!schoolData.name) {
        throw new Error('Invalid school data: missing school name');
      }

      // Set default values for optional fields
      const defaultedData = {
        name: schoolData.name,
        logo: schoolData.logo || '/command_logo.jpg',
        theme_color: schoolData.theme_color || '#F4C430',
        secondary_color: schoolData.secondary_color || '#1A1A2E',
        accent_color: schoolData.accent_color || '#D4AF37',
        background_color: schoolData.background_color || '#FFFFFF',
        text_color: schoolData.text_color || '#222222',
        tagline: schoolData.tagline || 'Welcome',
        about: schoolData.about || '',
        features: schoolData.features || [],
        programs: schoolData.programs || [],
        contact: schoolData.contact || {
          portal_url: schoolData.portal_link || '',
          description: '',
        },
        portal_link: schoolData.portal_link || '/login',
        footer: schoolData.footer || {
          copyright: `© ${new Date().getFullYear()} ${schoolData.name}. All rights reserved.`,
          company_name: schoolData.name,
        },
        ...schoolData,
      };

      setData(defaultedData);
    } catch (err) {
      console.error('Error in useSchoolData:', err);
      setError(err.message || 'Failed to load school data');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchoolData();
  }, [schoolId, isSlug]);

  const refetch = () => {
    loadSchoolData();
  };

  return { data, loading, error, refetch };
};

export default useSchoolData;
