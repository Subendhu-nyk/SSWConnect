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
const AddTemplate = lazy(() => import('../pages/Template/AddTemplate'));
const EditTemplate = lazy(() => import('../pages/Template/EditTemplate'));
const DeleteTemplate = lazy(() => import('../pages/Template/DeleteTemplate'));
const AddAttendance = lazy(() => import('../pages/Attendance/AddAttendance'));
const ViewAttendance = lazy(() => import('../pages/Attendance/ViewAttendance'));

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
    path: '/student/add-template',
    component: AddTemplate,
    requiredRole: ['admin'],
  },
  {
    path: '/teacher/add-template',
    component: AddTemplate,
    requiredRole: ['admin'],
  },
  {
    path: '/staff/add-template',
    component: AddTemplate,
    requiredRole: ['admin'],
  },
  {
    path: '/student/edit-template',
    component: EditTemplate,
    requiredRole: ['admin'],
  },
  {
    path: '/teacher/edit-template',
    component: EditTemplate,
    requiredRole: ['admin'],
  },
  {
    path: '/staff/edit-template',
    component: EditTemplate,
    requiredRole: ['admin'],
  },
  {
    path: '/student/delete-template',
    component: DeleteTemplate,
    requiredRole: ['admin'],
  },
  {
    path: '/teacher/delete-template',
    component: DeleteTemplate,
    requiredRole: ['admin'],
  },
  {
    path: '/staff/delete-template',
    component: DeleteTemplate,
    requiredRole: ['admin'],
  },
   {
    path: '/add/attendance',
    component: AddAttendance,
    requiredRole: ['admin', 'teacher', 'staff'],
  },
   {
    path: '/all/attendance',
    component: ViewAttendance,
    requiredRole: ['admin', 'teacher', 'staff'],
  },
  
];
export default routesConfig;
