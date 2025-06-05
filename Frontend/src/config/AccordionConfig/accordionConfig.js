import { DepartmentDetailFields } from '../FormFieldConfig/DepartmentFieldConfig/departmentDetailFields';
import { DesignationDetailFields } from '../FormFieldConfig/DesignationFieldConfig/designationDetailField';
import { StaffDetailFields } from '../FormFieldConfig/UserFieldConfig/staffDetailFields';
import { StudentDetailFields } from '../FormFieldConfig/UserFieldConfig/studentDetailFields';
import { TeacherDetailFields } from '../FormFieldConfig/UserFieldConfig/teacherDetailFields';

const extractFields = (detailFields, fieldNames) =>
  detailFields.filter(field => fieldNames.includes(field.name));

export const accordionConfig = {
  departmentForm: [
    {
      sectionName: 'Department Details',
      fields: DepartmentDetailFields,
    },
  ],
  designationForm: [
    {
      sectionName: 'Designation Details',
      fields: DesignationDetailFields,
    },
  ],
  staffForm: [
    {
      sectionName: 'System Info',
      fields: extractFields(StaffDetailFields, [
        'user_id',
        'password',
        'confirmpassword',
        'joiningDate',
      ]),
    },
    {
      sectionName: 'Personal Details',
      fields: extractFields(StaffDetailFields, [
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
      fields: extractFields(StaffDetailFields, ['emailId', 'alternateEmailID', 'phoneNumber']),
    },
    {
      sectionName: 'Address Information',
      fields: extractFields(StaffDetailFields, ['address', 'state', 'city', 'pinCode']),
    },
    {
      sectionName: 'Professional Details',
      fields: extractFields(StaffDetailFields, [
        'department',
        'roles',
        'isActive',
        'designation',
        'experience',
        'certificationDocument',
      ]),
    },
    {
      sectionName: 'Educational Details',
      fields: extractFields(StaffDetailFields, ['education', 'educationDocument']),
    },
    {
      sectionName: 'Media',
      fields: extractFields(StaffDetailFields, ['uploadPhoto']),
    },
  ],
  studentForm: [
    {
      sectionName: 'System Info',
      fields: extractFields(StudentDetailFields, [
        'user_id',
        'password',
        'confirmpassword',
        'registrationDate',
      ]),
    },
    {
      sectionName: 'Personal Details',
      fields: extractFields(StudentDetailFields, [
        'firstName',
        'lastName',
        'displayName',
        'dob',
        'gender',
        'fatherName',
        'bloodGroup',
      ]),
    },
    {
      sectionName: 'Contact Details',
      fields: extractFields(StudentDetailFields, [
        'emailId',
        'alternateEmailID',
        'phoneNumber',
        'fatherMobileNumber',
      ]),
    },
    {
      sectionName: 'Address Information',
      fields: extractFields(StudentDetailFields, ['address', 'state', 'city', 'pinCode']),
    },
    {
      sectionName: 'Professional Details',
      fields: extractFields(StudentDetailFields, ['department', 'roles', 'Year', 'isActive']),
    },
    {
      sectionName: 'Educational Details',
      fields: extractFields(StudentDetailFields, ['education', 'educationDocument']),
    },
    {
      sectionName: 'Media',
      fields: extractFields(StudentDetailFields, ['uploadPhoto']),
    },
  ],
  teacherForm: [
    {
      sectionName: 'System Info',
      fields: extractFields(TeacherDetailFields, [
        'user_id',
        'password',
        'confirmpassword',
        'joiningDate',
      ]),
    },
    {
      sectionName: 'Personal Details',
      fields: extractFields(TeacherDetailFields, [
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
      fields: extractFields(TeacherDetailFields, ['emailId', 'alternateEmailID', 'phoneNumber']),
    },
    {
      sectionName: 'Address Information',
      fields: extractFields(TeacherDetailFields, ['address', 'state', 'city', 'pinCode']),
    },
    {
      sectionName: 'Professional Details',
      fields: extractFields(TeacherDetailFields, [
        'department',
        'roles',
        'isActive',
        'designation',
        'experience',
        'certificationDocument',
        'experienceDocument',
      ]),
    },
    {
      sectionName: 'Educational Details',
      fields: extractFields(TeacherDetailFields, ['education', 'educationDocument']),
    },
    {
      sectionName: 'Media',
      fields: extractFields(TeacherDetailFields, ['uploadPhoto']),
    },
  ],
};
