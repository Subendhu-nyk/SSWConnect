import { createAsyncThunk } from '@reduxjs/toolkit';

import createApiThunk from '../../services/apiThunkHelper';
// import { destination_BP } from '../../config/destinationVariableConfig';

// 1. Login Authentication (POST)
export const authenticateUserThunk = createAsyncThunk(
  'auth/authenticateUser',
  createApiThunk('POST', `http://localhost:3000/auth/login`)
);

// 2. Get Role-Based Menus (POST, requires role in body)
// export const fetchRolePermissions = createAsyncThunk(
//   'auth/fetchRolePermissions',
//   //   createApiThunk('POST', `destination_BP/permissions/getRoleMenus`)
//   async ({ role }) => {
//     // 🧪 Simulate API delay + response
//     await new Promise(res => setTimeout(res, 500));

//     const mockPermissions = {
//       admin: [
//         {
//           Main: ['dashboard', 'application'],
//         },
//         {
//           Peoples: ['students', 'teachers', 'staff'],
//         },
//         {
//           Academic: ['classes', 'classroom', 'class-routine', 'courses', 'syllabus', 'timetable'],
//         },
//         {
//           Management: ['fees-collection', 'library'],
//         },
//         {
//           HRM: [
//             'staffs',
//             'departments',
//             'designation',
//             'attendance',
//             'leaves',
//             'holidays',
//             'front-office',
//           ],
//         },
//         {
//           Announcements: ['notice-board', 'events'],
//         },
//         {
//           Reports: [
//             'attendance-report',
//             'class-report',
//             'student-report',
//             'grade-report',
//             'leave-report',
//             'fees-report',
//           ],
//         },
//       ],
//       teacher: ['dashboard', 'courses', 'students', 'grades'],
//       student: ['dashboard', 'courses', 'grades'],
//     };

//     const mockSubPermissions = {
//       admin: [
//         'add-user',
//         'list-users',
//         'add-student',
//         'edit-student',
//         'list-students',
//         'view-student',
//       ],
//       teacher: ['list-students', 'view-student'],
//       student: ['list-courses', 'view-grades'],
//     };

//     return {
//       data: mockPermissions[role] || [],
//       subPermissions: mockSubPermissions[role] || [],
//     };
//   }
// );
