import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, requiredRole, requiredPermission }) => {
  const { isAuthenticated, user, permissions } = useSelector(state => state.auth);

  // Redirect to login if not logged in
  if (!isAuthenticated) {
    return <Navigate to='/auth' replace />;
  }

  //  If route has a required role (e.g. admin-dashboard)
  if (requiredRole && !requiredRole.includes(user?.role)) {   
    return <div>🚫 Access Denied: You do not have the required role to view this page.</div>;
  }

  //  If route has required permission (e.g. users, courses)
  if (requiredPermission && !permissions.includes(requiredPermission)) {
    return <div>🚫 Access Denied: You do not have permission to access this resource.</div>;
  }

  // Access granted
  return <Component />;
};

export default ProtectedRoute;
