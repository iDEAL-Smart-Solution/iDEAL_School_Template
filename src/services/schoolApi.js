import axios from 'axios';
import { getMockSchoolData } from './mockData';

// Configure base URL - change this to your actual backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Flag to use mock data during development (set to false when backend is ready)
const USE_MOCK_DATA = true;

const schoolApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch school landing page data
export const fetchSchoolLandingPage = async (schoolId) => {
  try {
    // For development: use mock data
    if (USE_MOCK_DATA) {
      console.log('📦 Using mock data for school ID:', schoolId);
      return getMockSchoolData(schoolId, false);
    }

    // For production: use real API
    const response = await schoolApi.get(`/schools/${schoolId}/landing-page`);
    return response.data;
  } catch (error) {
    console.error('Error fetching school landing page:', error);
    throw new Error(
      error.response?.data?.message || 
      'Failed to fetch school data. Please try again later.'
    );
  }
};

// Fetch all schools (optional, for listing)
export const fetchAllSchools = async () => {
  try {
    if (USE_MOCK_DATA) {
      return require('./mockData').mockSchools;
    }

    const response = await schoolApi.get('/schools');
    return response.data;
  } catch (error) {
    console.error('Error fetching schools list:', error);
    throw new Error('Failed to fetch schools list.');
  }
};

// Fetch school by slug (optional, for clean URLs)
export const fetchSchoolBySlug = async (slug) => {
  try {
    // For development: use mock data
    if (USE_MOCK_DATA) {
      console.log('📦 Using mock data for school slug:', slug);
      return getMockSchoolData(slug, true);
    }

    // For production: use real API
    const response = await schoolApi.get(`/schools/slug/${slug}/landing-page`);
    return response.data;
  } catch (error) {
    console.error('Error fetching school by slug:', error);
    throw new Error('School not found.');
  }
};

export default schoolApi;
