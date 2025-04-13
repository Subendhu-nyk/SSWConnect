export const DepartmentDetailFields = [
    {
      type: 'text',
      name: 'departmentName',
      label: 'Department Name',
      placeholder: 'Enter Department Name',
      maxLength: '20',
      autoFlag: false,
      required:true
    },
    {
      type: 'text',
      name: 'departmentId',
      label: 'Department ID',
      placeholder: 'Enter Department ID',
      maxLength: '15',
      required:true
    },
    {
      type: 'text',
      name: 'departmentCode',
      label: 'Department Code',
      placeholder: 'E.g. CSE, ECE',
      maxLength: '10',
      required:true
    },
    {
      type: 'dropdown',
      name: 'hodId',
      label: 'Head of Department (HOD)',
      placeholder: 'Select HOD',
      options: [], // To be dynamically populated with teacher/staff list
      required:false
    },
    {
      type: 'email',
      name: 'email',
      label: 'Department Email',
      placeholder: 'e.g. cse@sswcoe.edu',
      required:true,
      maxLength: '60',

    },
    {
      type: 'text',
      name: 'contactNumber',
      label: 'Contact Number',
      placeholder: 'Enter Contact Number',
      maxLength: '15',
      required:false
    },
    {
      type: 'multiselect',
      name: 'departmentType',
      label: 'Department Type',
      placeholder: 'Select Department Type',
      required:true,
      options: [
        { label: 'UG', value: 'UG' },
        { label: 'PG', value: 'PG' },
        { label: 'Research', value: 'Research' },
        { label: 'Others', value: 'Others' },
      ],
    },
    {
      type: 'text',
      name: 'buildingLocation',
      label: 'Building / Location',
      placeholder: 'e.g. Block A - 3rd Floor',
      maxLength: '50',
      required:false
    },
    {
      type: 'number',
      name: 'establishedYear',
      label: 'Established Year',
      placeholder: 'e.g. 2001',
      maxLength: '4',
      required:false
    },
    {
      type: 'dropdown',
      name: 'status',
      label: 'Status',
      placeholder: 'Select Status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Description / Notes',
      placeholder: 'Optional notes or internal description',
      maxLength: '500',
      rows: 3,
      required:false
    },
    {
      type: 'multiselect',
      name: 'associatedCourses',
      label: 'Associated Courses',
      placeholder: 'Select Courses Offered',
      showCheckbox: true,
      required:false,
      options: [], // To be populated dynamically from course DB
    },
  ];
  