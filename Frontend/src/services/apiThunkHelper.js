import apiRequest from './apiClient'; // Import the dynamic API client

const createApiThunk =
  (method, endpoint) =>
  async ({ payload }, { rejectWithValue }) => {
    try {
      let response;
      // Handle POST request (payload in body)
      if (method === 'POST') {
        response = await apiRequest(method, endpoint, null, payload);
      }

      // Handle GET request (params in query string)
      else if (method === 'GET') {
        response = await apiRequest(method, endpoint, payload, null);
      }

      // Handle PUT request (update data in body)
      else if (method === 'PUT') {
        response = await apiRequest(method, endpoint, null, payload);
      }

      // Handle DELETE request (params might be used as identifiers in the URL)
      else if (method === 'DELETE') {
        response = await apiRequest(method, endpoint, payload, null);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Unknown Error');
    }
  };

export default createApiThunk;
