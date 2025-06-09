export const AttendanceDetailFields = [
  {
    type: 'dropdown',
    name: 'department',
    label: 'Department',
    placeholder: 'Enter Department',
    required: true,
    options: [], // Populated dynamically
  },
  {
    name: 'role',
    type: 'dropdown',
    label: 'Select Role',
    required: true,
    options: [
      { label: 'Student', value: 'Student' },
      { label: 'Teacher', value: 'Teacher' },
      { label: 'Staff', value: 'Staff' },
    ],
  },
  {
    type: 'date',
    name: 'date',
    label: 'Enter Date',
    placeholder: 'Select Date',
    required: true,
  },

  // 🎓 STUDENT-SPECIFIC
  {
    type: 'dropdown',
    name: 'year',
    label: 'Year',
    placeholder: 'Select Year',
    required: true,
    options: [
      { label: '1st Year', value: '1st Year' },
      { label: '2nd Year', value: '2nd Year' },
      { label: '3rd Year', value: '3rd Year' },
      { label: '4th Year', value: '4th Year' },
    ],
    roles: ['Student'],
  },
  {
    type: 'dropdown',
    name: 'section',
    label: 'Section',
    placeholder: 'Select Section',
    required: true,
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
    ],
    roles: ['Student'],
  },

  // 🧑‍🏫 TEACHER-SPECIFIC
  {
    type: 'dropdown',
    name: 'subjectCode',
    label: 'Subject Code',
    placeholder: 'Select Subject',
    required: true,
    options: [], // Can be populated dynamically based on department
    roles: ['Teacher'],
  },
  {
    type: 'dropdown',
    name: 'lectureType',
    label: 'Lecture Type',
    placeholder: 'Select Lecture Type',
    required: true,
    options: [
      { label: 'Theory', value: 'Theory' },
      { label: 'Practical', value: 'Practical' },
    ],
    roles: ['Teacher'],
  },
  {
    type: 'dropdown',
    name: 'period',
    label: 'Period',
    placeholder: 'Select Period',
    required: true,
    options: [
      { label: '1st Period', value: '1' },
      { label: '2nd Period', value: '2' },
      { label: '3rd Period', value: '3' },
      { label: '4th Period', value: '4' },
      { label: '5th Period', value: '5' },
      { label: '6th Period', value: '6' },
      { label: '7th Period', value: '7' },
    ],
    roles: ['Teacher'],
  },

  // 🧑‍🔧 STAFF-SPECIFIC
  {
    type: 'dropdown',
    name: 'dutyType',
    label: 'Duty Type',
    placeholder: 'Select Duty Type',
    required: true,
    options: [
      { label: 'Admin', value: 'Admin' },
      { label: 'Library', value: 'Library' },
      { label: 'Maintenance', value: 'Maintenance' },
      { label: 'Security', value: 'Security' },
    ],
    roles: ['Staff'],
  },
];
