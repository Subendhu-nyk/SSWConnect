import { lazy } from 'react';
const AdminDashboard = lazy(() => import('../pages/Dashboard/Admin/AdminDashboard'));
const StudentDashboard = lazy(() => import('../pages/Dashboard/Student/StudentDashboard'));
const TeacherDashboard = lazy(() => import('../pages/Dashboard/Teacher/TeacherDashboard'));
const StaffDashboard = lazy(() => import('../pages/Dashboard/Staff/StaffDashboard'));
const AddDepartment = lazy(() => import('../pages/Department/AddDepartment'));
const AddDesignation = lazy(() => import('../pages/Department/AddDesignation'));
const AddStaff = lazy(() => import('../pages/User/AddStaff'));
const AddStudent = lazy(() => import('../pages/User/AddStudent'));
const AddTeacher = lazy(() => import('../pages/User/AddTeacher'));
const AddStudentTemplate = lazy(() => import('../pages/Template/AddStudentTemplate'));

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
  {
    path: 'add/departments',
    component: AddDepartment,
    requiredRole: ['admin', 'staff'],
  },
  {
    path: 'add/designations',
    component: AddDesignation,
    requiredRole: ['admin', 'staff'],
  },
  {
    path: 'add/staff',
    component: AddStaff,
    requiredRole: ['admin', 'staff'],
  },
  {
    path: 'add/student',
    component: AddStudent,
    requiredRole: ['admin', 'staff'],
  },
  {
    path: 'add/teacher',
    component: AddTeacher,
    requiredRole: ['admin', 'staff'],
  },
  {
    path: 'students/add-template',
    component: AddStudentTemplate,
    requiredRole: ['admin'],
  },
];
export default routesConfig;
