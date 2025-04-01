import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import routesConfig from './routesConfig';
import ProtectedRoute from './ProtectedRoute';
import { getDashboardPathForRole } from '../utils/auth/authUtils';
import LoadingComponent from '../components/LoadingComponent/LoadingComponent';

const AuthForm = lazy(() => import('../pages/Auth/AuthForm'));
const MainLayout = lazy(() => import('../layouts/MainLayout'));

const Router = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  return (
    <Suspense fallback={<LoadingComponent/>}>
      <Routes>
        {/* Public Route */}
        <Route path='/auth' element={<AuthForm />} />

        {/* Default Route: redirect to dashboard or login */}
        <Route
          path='/'
          element={
            isAuthenticated ? (
              <Navigate to={getDashboardPathForRole(user?.role)} replace />
            ) : (
              <Navigate to='/auth' replace />
            )
          }
        />

        {/* Layout + Protected Routes */}
        <Route path='/' element={<MainLayout />}>
          {routesConfig.map(({ path, component: Component, requiredRole, requiredPermission }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute
                  component={Component}
                  requiredRole={requiredRole}
                  requiredPermission={requiredPermission}
                />
              }
            />
          ))}
        </Route>

        {/* Catch-all redirect */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
