import {
  Button,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { ExpandMoreOutlined } from '@mui/icons-material';

import CommonTextFields from '../../common/TextFields/CommonTextFields';
import { Form, Formik } from 'formik';
import generateValidationSchema from '../../utils/validation/generateValidationSchema';

import { accordionConfig } from '../../config/AccordionConfig/accordionConfig';
import { generateInitialValues } from '../../config/generateInitialValues';
import { addDesignationThunk } from '../../features/ManagementReducer/hrmManagementThunk';
import { useDispatch } from 'react-redux';

const AddDesignation = () => {
  const formType = 'designationForm';
  const config = accordionConfig[formType];
  const dispatch = useDispatch();
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await dispatch(
        addDesignationThunk({
          payload: values,
        })
      );
      // resetForm(); // Clear the form on success
    } catch (error) {
      console.error('Error creating designation:', error);
    }
  };

  const initialValues = generateInitialValues(config);

  const validationSchema = generateValidationSchema(config);

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
              Add Designation
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

export default AddDesignation;
