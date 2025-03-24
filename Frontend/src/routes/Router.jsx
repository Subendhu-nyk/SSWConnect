import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import routesConfig from './routesConfig';
import ProtectedRoute from './ProtectedRoute';
import LoadingComponent from '../components/LoadingComponent/LoadingComponent';

const MainLayout = lazy(() => import('../layouts/MainLayout'));

const Router = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          {/* Map through the routesConfig to add the protected routes */}
          {routesConfig.map(({ path, component: Component, requiredPermission }) => (           
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute component={Component} requiredPermission={requiredPermission} />
              }
            />
          ))}
          {/* Default route if no match (you can change this to any fallback page) */}
          <Route path='*' element={<Navigate to='/Dashboard' replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
