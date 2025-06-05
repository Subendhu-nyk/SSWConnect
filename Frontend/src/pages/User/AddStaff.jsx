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
// using Formik to handle all form state, validations, and submit logic in a controlled way.

const AddStaff = () => {
  const formType = 'staffForm';
  const config = accordionConfig[formType];
  const dispatch = useDispatch();
  //Loads the corresponding field sections for 'departmentForm'.
  // const handleSubmit = async (values, { resetForm }) => {
  //   // dispatch(addStaffThunk({payload:'formData'}))
  //   // whenever form is submitted, logging all values and resetting the form to initial state.
  //   try {
  //     // Create FormData object to hold all form fields and files
  //     const formData = new FormData();

  //     // === Append all regular fields (text inputs) ===
  //     Object.entries(values).forEach(([key, value]) => {
  //       if (key !== 'uploadPhoto' && key !== 'educationDocument') {
  //         formData.append(key, value);
  //       }
  //     });

  //     // === Handle single file: uploadPhoto ===
  //     if (values.uploadPhoto instanceof File) {
  //       formData.append('uploadPhoto', values.uploadPhoto);
  //     }

  //     // === Handle multiple files: educationDocument ===
  //     if (Array.isArray(values.educationDocument)) {
  //       values.educationDocument.forEach(file => {
  //         if (file instanceof File) {
  //           formData.append('educationDocument', file); // ✔️ backend receives as array
  //         }
  //       });
  //     }

  //     // === Make the POST request ===
  //     // const response = await fetch('/api/staff/add/staff', {
  //     //   method: 'POST',
  //     //   // headers: { Authorization: `Bearer ${token}` }, // 🔐 Add later if needed
  //     //   body: formData,
  //     // });
  //     const response = await dispatch(addStaffThunk({ payload: formData }));

  //     if (!response.ok) {
  //       console.log( 'Failed to create staff');
  //     }

  //     // ✅ Success – reset form and show message
  //     resetForm();
  //   } catch (error) {
  //     console.error('Error creating staff:', error);
  //   }
  // };

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

      // Log FormData entries for debugging
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value);
      // }

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

  const initialValues = generateInitialValues(config);
  const validationSchema = generateValidationSchema(config);

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

  return (
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
            <Typography variant='h6' gutterBottom>
              Add Staff
            </Typography>
            <Grid container spacing={2}>
              {renderAccordionContent(config)}
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
  );
};

export default AddStaff;
