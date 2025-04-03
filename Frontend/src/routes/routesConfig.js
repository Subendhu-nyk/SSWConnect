import { lazy } from 'react';

const AdminDashboard = lazy(() => import('../pages/Dashboard/Admin/AdminDashboard'));
const StudentDashboard = lazy(() => import('../pages/Dashboard/Student/StudentDashboard'));
const TeacherDashboard = lazy(() => import('../pages/Dashboard/Teacher/TeacherDashboard'));
const StaffDashboard = lazy(() => import('../pages/Dashboard/Staff/StaffDashboard'));

const routesConfig = [
  {
    path: '/admin-dashboard',
    component: AdminDashboard,
    requiredRole: 'admin',
  },
  {
    path: '/student-dashboard',
    component: StudentDashboard,
    requiredRole: 'student',
  },
  {
    path: '/teacher-dashboard',
    component: TeacherDashboard,
    requiredRole: 'teacher',
  },
  {
    path: '/staff-dashboard',
    component: StaffDashboard,
    requiredRole: 'staff',
  },
];

export default routesConfig;
