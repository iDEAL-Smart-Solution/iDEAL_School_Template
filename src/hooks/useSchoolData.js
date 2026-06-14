import { useState, useEffect, useCallback } from 'react';
import { fetchPublicLandingPage, getCurrentDomainName } from '../services/landingPageService';

/**
 * Custom hook to fetch and manage public landing page data.
 * The current browser hostname controls which school is loaded.
 * @returns {object} - { data, loading, error, refetch, isFallback, domainName }
 */
export const useSchoolData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);
  const [domainName, setDomainName] = useState(getCurrentDomainName());

  const loadSchoolData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchPublicLandingPage();

      setData(result.data);
      setIsFallback(Boolean(result.isFallback));
      setDomainName(result.domainName || getCurrentDomainName());

      if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      console.error('Error in useSchoolData:', err);
      setError(err.message || 'Failed to load school data');
      setData(null);
      setIsFallback(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchoolData();
  }, []);

  const refetch = useCallback(() => {
    loadSchoolData();
  }, []);

  return { data, loading, error, refetch, isFallback, domainName };
};

export default useSchoolData;
