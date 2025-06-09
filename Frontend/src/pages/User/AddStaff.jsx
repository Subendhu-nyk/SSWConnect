import {
  Button,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
// imported MUI components to structure the layout, show labels, and create form buttons.

import { ExpandMoreOutlined } from '@mui/icons-material';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';

import CommonTextFields from '../../common/TextFields/CommonTextFields';
// using this to dynamically render form fields like text, select, autocomplete etc. with minimal code.
import { Form, Formik } from 'formik';
import generateValidationSchema from '../../utils/validation/generateValidationSchema';
// Dynamically creates Yup validation schema based on form config.
import { accordionConfig } from '../../config/AccordionConfig/accordionConfig';
// Accordion-based form field config grouped by section.
import { generateInitialValues } from '../../config/generateInitialValues';
import { useDispatch, useSelector } from 'react-redux';
import { addUserThunk } from '../../features/UserManagement/userManagementThunk';
import { handleExcelUpload } from '../../utils/commonFunction/commonFunction';
import CommonFilter from '../../common/CommonFilter/CommonFilter';
import { StaffDetailFields } from '../../config/FormFieldConfig/UserFieldConfig/staffDetailFields';
import { useMemo } from 'react';
// using Formik to handle all form state, validations, and submit logic in a controlled way.

const AddStaff = () => {
  const formType = 'staffForm';
  const config = accordionConfig[formType];
  const dispatch = useDispatch();
  const departmentData=useSelector(state=>state?.hrmManagement?.getDepartmentData)

  const dynamicConfig = useMemo(() => {
  if (!departmentData) return accordionConfig[formType];

  return accordionConfig[formType].map(section => {
    if (section.sectionName === 'Professional Details') {
      return {
        ...section,
        fields: section.fields.map(field => {
          if (field.name === 'department') {
            return {
              ...field,
              options: departmentData.map(dept => ({
                label: dept.departmentCode, // adapt to your actual object keys
                value: dept.departmentCode, // use a unique value
              })),
            };
          }
          return field;
        }),
      };
    }
    return section;
  });
}, [departmentData]);



  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Create FormData object to handle text fields and files
      const formData = new FormData();
      const fileFields = ['educationDocument', 'uploadPhoto'];

      // Append all fields to FormData
      Object.entries(values).forEach(([key, value]) => {
        if (fileFields.includes(key)) {
          if (key === 'educationDocument' && Array.isArray(value)) {
            // Handle multiple files for documents
            value.forEach((file, index) => {
              if (file instanceof File) {
                formData.append(`educationDocument`, file); // Append as 'documents' for multer array
              }
            });
          } else if (key === 'uploadPhoto' && value instanceof File) {
            // Handle single file for uploadPhoto
            formData.append('uploadPhoto', value);
          }
        } else {
          // Append non-file fields individually
          formData.append(key, value === null ? '' : value);
        }
      });

      // Dispatch addStaffThunk with FormData and headers
      const result = await dispatch(
        addUserThunk({
          payload: formData, // Changed from 'data' to 'payload' to match createApiThunk
        })
      );

      // On success, reset form and show success message
      resetForm();
    } catch (error) {
      // Handle errors and display in form
      console.error('Error creating staff:', error);
    }
  };

  const initialValues = generateInitialValues(dynamicConfig);
  const validationSchema = generateValidationSchema(dynamicConfig);

  const renderAccordionContent = config => {
    return config.map(section => (
      <Grid item xs={12} key={section.sectionName}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
            aria-controls={`${section.sectionName}-content`}
            id={`${section.sectionName}-header`}
            sx={{
              backgroundColor: '#f5f5f5',
              borderRadius: 0.5,
            }}
          >
            <Typography variant='h6'>{section.sectionName}</Typography>
            {/*"Basic Info" or "Manager Details", etc. */}
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {section.fields.map(field => (
                <Grid item xs={12} sm={6} key={field.name}>
                  {/*  Shows two fields per row on medium+ screens */}
                  <CommonTextFields
                    type={field.type}
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    required={field.required}
                    maxLength={field.maxLength ? parseInt(field.maxLength) : undefined}
                    options={field.options}
                    multiple={field.multiple} // Pass multiple prop
                    accept={field.accept} // Pass accept prop
                    onChange={value => console.log(`${field.name} changed:`, value)}
                    // 🔄 E.g. typing into "Department Name": logs -> "departmentName changed: HR"
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    ));
  };

  const onDownloadTemplate = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff Fields');
    // Add header row
    const headerRow = worksheet.getRow(1);
    StaffDetailFields.forEach((field, index) => {
      const cell = headerRow.getCell(index + 1);
      cell.value = field.label;
      // Apply red font for required fields
      cell.font = {
        color: field.required ? { argb: 'FFFF0000' } : { argb: 'FF000000' },
        bold: true,
      };
      // Optional: auto size
      worksheet.getColumn(index + 1).width = Math.max(field.label.length + 5, 20);
    });
    headerRow.commit();
    // Add data validation for dropdown fields for first 10 rows
    StaffDetailFields.forEach((field, colIdx) => {
      if (
        (field.type === 'dropdown' || field.type === 'multiselect') &&
        Array.isArray(field.options) &&
        field.options.length > 0
      ) {
        const list = field.options.map(opt => opt.label).join(',');
        for (let row = 2; row <= 1000; row++) {
          worksheet.getCell(row, colIdx + 1).dataValidation = {
            type: 'list',
            allowBlank: !field.required,
            formulae: [`"${list}"`],
            showErrorMessage: true,
            errorStyle: 'warning',
            errorTitle: 'Invalid Input',
            error: 'Please select a value from the dropdown list.',
          };
        }
      }
    });
    // Create buffer and trigger download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'StaffDetailFields.xlsx');
  };

  const handleExcelDataUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';
    input.onchange = async e => {
      const file = e.target.files[0];
      if (!file) return;
      await handleExcelUpload(
        file,
        data => dispatch(addUserThunk({ payload: data })),
        () => alert('Bulk upload successful!'),
        err => alert('Bulk upload failed: ' + err.message)
      );
    };
    input.click();
  };

  return (
    <>
      <CommonFilter
        title='Add Staff'
        onSearch={false}
        showSearch={false}
        showAdd={true}
        showImport={true}
        showDownloadTemplate={true}
        showRefresh={true}
        showRecycleBin={true}
        onAdd={() => console.log('Add new')}
        onImport={handleExcelDataUpload}
        onExport={() => console.log('Export')}
        onDownloadTemplate={onDownloadTemplate}
        onRefresh={() => console.log('Refresh')}
        onRecycleBin={() => console.log('To recycle bin')}
        onPrint={() => window.print()}
      />
      <Formik
        initialValues={initialValues}
        // passing the default values object so Formik knows what each field starts with
        validationSchema={validationSchema}
        // attaching the Yup schema we just built to enable per-field validation
        onSubmit={(values, actions) => {
          console.log('error', actions.error);
          handleSubmit(values, actions);

          // when Submit is clicked, Formik will call this with current form values + helpers like resetForm
        }}
        enableReinitialize
        // allows the form to reset if initialValues change dynamically (useful for editing forms too)
      >
        {({ resetForm, errors, touched }) => {
          // using Formik's render function to access form helpers like resetForm and validation states
          console.log('error', errors);
          return (
            <Form>
              <Grid container spacing={2}>
                {renderAccordionContent(dynamicConfig)}
                <Grid item xs={12} container justifyContent='flex-end' spacing={2}>
                  <Grid item>
                    <Button variant='contained' color='primary' type='submit'>
                      Submit
                      {/* triggers the Formik onSubmit when clicked, only works if all validation passes */}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant='outlined' color='error' onClick={() => resetForm()}>
                      Cancel
                      {/* clicking this calls resetForm() from Formik and clears everything */}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddStaff;
