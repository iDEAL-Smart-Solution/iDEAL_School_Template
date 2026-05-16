import { useState, useEffect } from 'react';
import { fetchSchoolLandingPage, fetchSchoolBySlug } from '../services/schoolApi';

/**
 * Custom hook to fetch and manage school data
 * @param {string} schoolId - The school ID or slug
 * @param {boolean} isSlug - Whether the identifier is a slug (default: false)
 * @returns {object} - { data, loading, error, refetch }
 */
export const useSchoolData = (schoolId, isSlug = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSchoolData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!schoolId) {
        throw new Error('School ID is required');
      }

      let schoolData;
      if (isSlug) {
        schoolData = await fetchSchoolBySlug(schoolId);
      } else {
        schoolData = await fetchSchoolLandingPage(schoolId);
      }

      // Validate required fields
      if (!schoolData.name) {
        throw new Error('Invalid school data: missing school name');
      }

      // Set default values for optional fields
      const defaultedData = {
        name: schoolData.name,
        logo: schoolData.logo || '/default-logo.png',
        theme_color: schoolData.theme_color || '#1e40af',
        tagline: schoolData.tagline || 'Welcome',
        about: schoolData.about || '',
        features: schoolData.features || [],
        programs: schoolData.programs || [],
        contact: schoolData.contact || {
          email: '',
          phone: '',
          address: '',
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
