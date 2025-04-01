import { jwtDecode } from 'jwt-decode';

export const decodeToken = token => {
  try {
    return jwtDecode(token);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getDashboardPathForRole = role => {
  switch (role) {
    case 'admin':
      return '/admin-dashboard';
    case 'student':
      return '/student-dashboard';
    case 'teacher':
      return '/teacher-dashboard';
    case 'staff':
      return '/staff-dashboard';
    default:
      return '/auth';
  }
};
