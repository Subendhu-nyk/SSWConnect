import axios from 'axios';
import { store } from '../store/store';
import urlMap from '../config/applicationConfig';

const isLocalhost = window.location.origin.includes('localhost');

// Get headers including token from Redux
const getDynamicParams = params => {
  const { token: loginToken } = store.getState().auth;

  const headers = {
    'Content-Type': params instanceof FormData ? 'multipart/form-data' : 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  if (loginToken) {
    headers['Authorization'] = `Bearer ${loginToken}`;
  }

  return { headers };
};

// Resolve URL via config for localhost testing
const getDynamicUrl = endpoint => {
  if (isLocalhost) {
    return urlMap[endpoint] || endpoint;
  }
  return endpoint;
};

// Main Axios client
const apiClient = axios.create();

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
