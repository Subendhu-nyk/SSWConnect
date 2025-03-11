const env = import.meta.env.MODE; 
// If we're running npm run dev, then import.meta.env.MODE will be development.
// If deployed in production, it will be production.


// The apiConfig object holds the backend URLs for different environments.
// Each key (e.g., signup, login, users) corresponds to a backend API endpoint.
const apiConfig = {
  development: {
    signup: 'http://localhost:8800/api/signup',
    login: 'http://localhost:8800/api/login',
    users: 'http://localhost:8800/api/users',
  },
  production: {
    signup: 'https://api.production.com/signup',
    login: 'https://api.production.com/login',
    users: 'https://api.production.com/users',
  },
};

// Fallback to development if env is undefined
const urlMap = apiConfig[env] || apiConfig.development;

export default urlMap;
