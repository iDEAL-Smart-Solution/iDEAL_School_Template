import axios from 'axios';
import { getMockSchoolData, mockSchools } from './mockData';

// Configure base URL - change this to your actual backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const USE_MOCK_DATA = true;

const schoolApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchSchoolLandingPage = async (schoolId = 2) => {
  try {
    if (USE_MOCK_DATA) {
      return getMockSchoolData(schoolId);
    }

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

export const fetchAllSchools = async () => {
  try {
    if (USE_MOCK_DATA) {
      return mockSchools;
    }

    const response = await schoolApi.get('/schools');
    return response.data;
  } catch (error) {
    console.error('Error fetching schools list:', error);
    throw new Error('Failed to fetch schools list.');
  }
};

export const fetchSchoolBySlug = async (slug) => {
  try {
    if (USE_MOCK_DATA) {
      return getMockSchoolData(slug, true);
    }

    const response = await schoolApi.get(`/schools/slug/${slug}/landing-page`);
    return response.data;
  } catch (error) {
    console.error('Error fetching school by slug:', error);
    throw new Error('School not found.');
  }
};

export default schoolApi;
