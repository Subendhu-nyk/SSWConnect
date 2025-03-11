import axios from 'axios';
import { store } from '../store/store';
import urlMap from '../config/applicationConfig';

const isLocalhost = window.location.origin.includes('localhost');

// Define backend URL mappings here or shift it to applicationConfig
// const urlMap = {
//   signup: 'http://localhost:8800/api/signup',
//   login: 'http://localhost:8800/api/login',
//   users: 'http://localhost:8800/api/users',
//   // Add other mappings as needed
// };

// Function to get dynamic headers
const getDynamicParams = (params) => {
  const { loginToken } = store.getState().token;

  const headers = {
    'Content-Type': params instanceof FormData ? 'multipart/form-data' : 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${loginToken}`, // Use Redux token
  };

  return { headers };
};

// Function to get dynamic URL
// If isLocalhost, it replaces API calls with urlMap from config.js.
// If an endpoint is not mapped, it returns the original endpoint.
const getDynamicUrl = (endpoint) => {
    if (isLocalhost) {
      return urlMap[endpoint] || endpoint; 
    }
    return endpoint;
  };

// Axios instance
const apiClient = axios.create();

// Main API request function
const apiRequest = async (method, endpoint, params = null, data = null) => {
  try {
    const URL = getDynamicUrl(endpoint);
    const { headers } = getDynamicParams(data);

    const response = await apiClient({
      method,
      url: URL,
      data,
      params,
      headers,
    });

    return response.data;
  } catch (error) {
    console.error('API Request failed', error);
    throw error;
  }
};

export default apiRequest;
