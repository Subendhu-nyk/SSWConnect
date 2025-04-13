import { Button, Grid, Typography } from '@mui/material';
// imported MUI components to structure the layout, show labels, and create form buttons.
import { DepartmentDetailFields } from '../../config/FormFieldConfig/DepartmentFieldConfig/departmentDetailFields';
// brought in all the field config that controls what to render in the form.
import CommonTextFields from '../../common/TextFields/CommonTextFields';
// using this to dynamically render form fields like text, select, autocomplete etc. with minimal code.
import { Form, Formik } from 'formik';
import generateValidationSchema from '../../utils/validation/generateValidationSchema';
// using Formik to handle all form state, validations, and submit logic in a controlled way.

const AddDepartment = () => {
  const handleSubmit = (values, { resetForm }) => {
    // whenever form is submitted, logging all values and resetting the form to initial state.
    console.log('Formik Inside handleSubmit - Values:', values);
    resetForm();
  };

  const initialValues = DepartmentDetailFields.reduce((acc, field) => {
    // generating initial values for each field based on its type
    if (field.type === 'multiselect' || field.type === 'selectChips') {
      acc[field.name] = []; // Set default empty array for multiselect fields
    } else if (field.type === 'autoComplete') {
      acc[field.name] = null; // Set null for autocomplete fields
    } else {
      acc[field.name] = ''; // Set empty string for all other fields
    }
    return acc; // Return accumulated object
  }, {});

  const validationSchema = generateValidationSchema(DepartmentDetailFields);

  return (
    <Formik
      initialValues={initialValues}
      // passing the default values object so Formik knows what each field starts with
      validationSchema={validationSchema}
      // attaching the Yup schema we just built to enable per-field validation
      onSubmit={(values, actions) => {
        handleSubmit(values, actions);
        // when Submit is clicked, Formik will call this with current form values + helpers like resetForm
      }}
      enableReinitialize
      // allows the form to reset if initialValues change dynamically (useful for editing forms too)
    >
      {({ resetForm, errors, touched }) => {
        // using Formik's render function to access form helpers like resetForm and validation states
        return (
          <Form>
            <Typography variant='h6' gutterBottom>
              Add Department
            </Typography>
            <Grid container spacing={2}>
              {DepartmentDetailFields.map((field, idx) => (
                <Grid item xs={6} key={idx}>
                  {/* rendering each field in a 6-column wide grid, i.e., 2 per row */}
                  <CommonTextFields
                    type={field.type}
                    // tells the field what kind of input to render (text, email, dropdown, etc.)
                    name={field.name}
                    // connects the field to Formik using this key
                    label={field.label}
                    // shows the user-facing label above the input
                    placeholder={`${field.placeholder}`}
                    // gives a hint to the user about what to enter
                    required={field.required}
                    // shows the red asterisk and adds `required` to validation only if true
                    maxLength={field.maxLength ? parseInt(field.maxLength) : undefined}
                    // enforces input length restriction, passed as number if defined
                    options={field.options}
                    // used by dropdowns, autocompletes, multiselects — passed from config
                    onChange={value => console.log(`${field.fieldName} changed:`, value)}
                    // logs value changes (optional for debugging or tracking user input)
                  />
                </Grid>
              ))}
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

export default AddDepartment;
