import { createRoot } from 'react-dom/client';

import ErrorBoundary from './common/ErrorBoundary/ErrorBoundary.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
