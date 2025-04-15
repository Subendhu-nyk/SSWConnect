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
// using Formik to handle all form state, validations, and submit logic in a controlled way.

const AddDepartment = () => {
  const formType = 'departmentForm';
  const config = accordionConfig[formType];
  //Loads the corresponding field sections for 'departmentForm'.
  const handleSubmit = (values, { resetForm }) => {
    // whenever form is submitted, logging all values and resetting the form to initial state.
    console.log('Formik Inside handleSubmit - Values:', values);
    resetForm();
  };

  const initialValues = generateInitialValues(config);
  // Input: accordion config object.
  // Output:all blank strings initially.
  const validationSchema = generateValidationSchema(config);
  // Input: same config.
  // Output: Yup validation schema object like { departmentName: Yup.string().required(), ... }

  const renderAccordionContent = config => {
    return config.map(section => (
      <Grid item xs={12} key={section.sectionName}>
        {/* Renders each form section in its own accordion */}
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
            {/* 👆 "Basic Info" or "Manager Details", etc. */}
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {section.fields.map(field => (
                <Grid item xs={12} sm={6} key={field.name}>
                  {/* 🧾 Shows two fields per row on medium+ screens */}
                  <CommonTextFields
                    type={field.type}
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    required={field.required}
                    maxLength={field.maxLength ? parseInt(field.maxLength) : undefined}
                    options={field.options}
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

export default AddDepartment;
