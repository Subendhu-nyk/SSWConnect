import { DepartmentDetailFields } from '../FormFieldConfig/DepartmentFieldConfig/departmentDetailFields';
import { StaffDetailFields } from '../FormFieldConfig/StaffFieldConfig/staffDetailFields';

const extractFields = fieldNames =>
  StaffDetailFields.filter(field => fieldNames.includes(field.name));

export const accordionConfig = {
  departmentForm: [
    {
      sectionName: 'Department Details',
      fields: DepartmentDetailFields,
    },
  ],
  staffForm: [
    {
      sectionName: 'System Info',
      fields: extractFields(['user_id', 'password', 'confirmpassword']),
    },
    {
      sectionName: 'Personal Details',
      fields: extractFields([
        'firstName',
        'lastName',
        'displayName',
        'dob',
        'gender',
        'bloodGroup',
      ]),
    },
    {
      sectionName: 'Contact Details',
      fields: extractFields(['emailId', 'alternateEmailID', 'phoneNumber']),
    },
    {
      sectionName: 'Address Information',
      fields: extractFields(['address', 'state', 'city', 'pinCode']),
    },
    {
      sectionName: 'Professional Details',
      fields: extractFields(['department', 'roles', 'isActive', 'designation', 'experience']),
    },
    {
      sectionName: 'Educational Details',
      fields: extractFields(['education', 'educationDocument']),
    },
    {
      sectionName: 'Media',
      fields: extractFields(['uploadPhoto']),
    },
  ],
};
