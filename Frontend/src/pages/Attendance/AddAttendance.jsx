import { useEffect, useState } from 'react';
import {
  Typography,
  //   Breadcrumbs,
  //   Link,
  Button,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMoreOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { accordionConfig } from '../../config/AccordionConfig/accordionConfig';
import { generateInitialValues } from '../../config/generateInitialValues';
import generateValidationSchema from '../../utils/validation/generateValidationSchema';
import CommonTextFields from '../../common/TextFields/CommonTextFields';
import { Form, Formik } from 'formik';
import { getDepartmentThunk } from '../../features/ManagementReducer/hrmManagementThunk';
import * as Yup from 'yup'; // NEW: Added Yup for second form validation
import { getUserThunk } from '../../features/UserManagement/userManagementThunk';
import { buildPayloadByRole } from '../../utils/commonFunction/commonFunction';

function AddAttendance() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([
    { id: 'CSE101', name: 'Alice Johnson', status: '', remarks: '' },
    { id: 'CSE102', name: 'Bob Smith', status: '', remarks: '' },
  ]);
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });
  const [selectedRole, setSelectedRole] = useState('');
  const departmentData = useSelector(state => state?.hrmManagement?.getDepartmentData);
  const formType = 'attendanceForm';
  // const config = accordionConfig[formType];
  const [dynamicConfig, setDynamicConfig] = useState(accordionConfig[formType] || []);
  const initialValues = generateInitialValues(dynamicConfig);
  const validationSchema = generateValidationSchema(dynamicConfig);
  // NEW: State to control visibility of the second form
  const [showSecondForm, setShowSecondForm] = useState(false);
  // NEW: State to store top form values for student fetching
  const [topFormValues, setTopFormValues] = useState(null);

  useEffect(() => {
    if (!departmentData || departmentData.length === 0) return;

    const departmentOptions = departmentData.map(item => ({
      label: item.departmentCode,
      value: item.departmentCode,
    }));

    setDynamicConfig(prevConfig =>
      prevConfig.map(section => ({
        ...section,
        fields: section.fields.map(field =>
          field.name === 'department' ? { ...field, options: departmentOptions } : field
        ),
      }))
    );
  }, [departmentData]);

  // const renderAccordionContent = config => {
  //   if (!config || !Array.isArray(config) || config.length === 0) {
  //     return null;
  //   }

  //   // Map directly over config (array of sections)
  //   return config.map(section => (
  //     <Grid item xs={12} key={section.sectionName}>
  //       <Accordion defaultExpanded>
  //         <AccordionSummary
  //           expandIcon={<ExpandMoreOutlined />}
  //           aria-controls={`${section.sectionName}-content`}
  //           id={`${section.sectionName}-header`}
  //           sx={{
  //             backgroundColor: '#f5f5f5',
  //             borderRadius: 0.5,
  //           }}
  //         >
  //           <Typography variant='h6'>{section.sectionName}</Typography>
  //         </AccordionSummary>
  //         <AccordionDetails>
  //           <Grid container spacing={2}>
  //             {section.fields.map(field => (
  //               <Grid item xs={12} sm={6} key={field.name}>
  //                 <CommonTextFields
  //                   type={field.type}
  //                   name={field.name}
  //                   label={field.label}
  //                   placeholder={field.placeholder}
  //                   required={field.required}
  //                   maxLength={field.maxLength ? parseInt(field.maxLength) : undefined}
  //                   options={field.options || []}
  //                   onChange={value => console.log(`${field.name} changed:`, value)}
  //                 />
  //               </Grid>
  //             ))}
  //           </Grid>
  //         </AccordionDetails>
  //       </Accordion>
  //     </Grid>
  //   ));
  // };

  // Updated renderAccordionContent to conditionally render fields by role
  const renderAccordionContent = (config, selectedRole) => {
    if (!config || !Array.isArray(config) || config.length === 0) return null;

    return config.map(section => (
      <Grid item xs={12} key={section.sectionName}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
            aria-controls={`${section.sectionName}-content`}
            id={`${section.sectionName}-header`}
            sx={{ backgroundColor: '#f5f5f5', borderRadius: 0.5 }}
          >
            <Typography variant='h6'>{section.sectionName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {section.fields
                .filter(field => !field.roles || field.roles.includes(selectedRole)) // ✅ Filter by selected role
                .map(field => (
                  <Grid item xs={12} sm={6} key={field.name}>
                    <CommonTextFields
                      type={field.type}
                      name={field.name}
                      label={field.label}
                      placeholder={field.placeholder}
                      required={field.required}
                      maxLength={field.maxLength ? parseInt(field.maxLength) : undefined}
                      options={field.options || []}
                      onChange={value => {
                        if (field.name === 'roles') {
                          setSelectedRole(value); // ✅ Update role state
                        }
                      }}
                    />
                  </Grid>
                ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    ));
  };

  // const handleSubmit = (values, actions) => {
  //   console.log('Form values:', values);
  //   setFeedback({ open: true, message: 'Attendance saved successfully!', severity: 'success' });
  //   actions.setSubmitting(false);
  // };

  // NEW: Handle top form submission to fetch students and show second form
  const handleTopFormSubmit = async (values, actions) => {
    try {
      // Simulate fetching students based on form values (replace with actual API call)
      // Example API call: const response = await axios.post('/get-students', values);
      
      const payload = buildPayloadByRole(selectedRole, values);
      const response = dispatch(getUserThunk({ payload}));
      console.log("response",response)
      setTopFormValues(values); // Store form values
      setStudents([
        { id: 'CSE101', name: 'Alice Johnson', status: '', remarks: '' },
        { id: 'CSE102', name: 'Bob Smith', status: '', remarks: '' },
      ]); // Update with actual student data from API if needed
      setShowSecondForm(true); // Show the second form
      setFeedback({
        open: true,
        message: 'Form submitted! Please mark attendance.',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error fetching students:', error);
      setFeedback({ open: true, message: 'Failed to load students', severity: 'error' });
    }
    actions.setSubmitting(false);
  };

  // NEW: Validation schema for second form
  const secondFormValidationSchema = Yup.object().shape(
    students.reduce(
      (schema, student) => ({
        ...schema,
        [`${student.id}_status`]: Yup.string().required('Status is required'),
        [`${student.id}_remarks`]: Yup.string().optional(),
      }),
      {}
    )
  );

  // NEW: Initial values for second form
  const secondFormInitialValues = students.reduce(
    (values, student) => ({
      ...values,
      [`${student.id}_status`]: student.status || '',
      [`${student.id}_remarks`]: student.remarks || '',
    }),
    {}
  );

  // NEW: Handle "Mark All as Present" checkbox
  const handleSelectAll = setFieldValue => e => {
    students.forEach(student => {
      setFieldValue(`${student.id}_status`, e.target.checked ? 'Present' : '');
    });
  };

  // NEW: Handle second form submission
  const handleSecondFormSubmit = (values, actions) => {
    const attendanceData = students.map(student => ({
      id: student.id,
      status: values[`${student.id}_status`],
      remarks: values[`${student.id}_remarks`],
    }));
    console.log('Attendance data:', attendanceData);
    // Replace with actual API call to save attendance
    setFeedback({ open: true, message: 'Attendance saved successfully!', severity: 'success' });
    actions.setSubmitting(false);
  };

  // NEW: Handle second form reset
  const handleSecondFormReset = resetForm => () => {
    resetForm();
    setStudents(students.map(student => ({ ...student, status: '', remarks: '' })));
  };

  // NEW: Handle second form cancel
  const handleSecondFormCancel = () => {
    setShowSecondForm(false);
    setStudents(students.map(student => ({ ...student, status: '', remarks: '' })));
  };

  // NEW: Handle feedback close
  const handleCloseFeedback = () => {
    setFeedback({ ...feedback, open: false });
  };

  return (
    <>
      {/* Top Form */}
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log('error', actions.error);
          console.log('inside submit', values);
          handleTopFormSubmit(values, actions);
          // when Submit is clicked, Formik will call this with current form values + helpers like resetForm
        }}
        enableReinitialize
      >
        {({ resetForm }) => (
          <Form>
            <Typography variant='h6' gutterBottom>
              Add Attendance
            </Typography>
            <Grid container spacing={2}>
              {renderAccordionContent(dynamicConfig, selectedRole)}
              <Grid item xs={12} container justifyContent='flex-end' spacing={2}>
                <Grid item>
                  <Button variant='contained' color='primary' type='submit'>
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant='outlined' color='error' onClick={() => resetForm()}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      {/* NEW: Second Form (Student Attendance Table) */}
      {showSecondForm && (
        <Formik
          initialValues={secondFormInitialValues}
          validationSchema={secondFormValidationSchema}
          onSubmit={handleSecondFormSubmit}
          enableReinitialize
        >
          {({ setFieldValue, resetForm, errors, touched }) => (
            <Form>
              <Typography variant='h6' gutterBottom sx={{ mt: 4 }}>
                Mark Attendance
              </Typography>
              <TableContainer component={Paper} sx={{ maxHeight: 400, mt: 2 }}>
                <FormControlLabel
                  control={<Checkbox onChange={handleSelectAll(setFieldValue)} />}
                  label='Mark All as Present'
                  sx={{ m: 2 }}
                />
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student ID</TableCell>
                      <TableCell>Student Name</TableCell>
                      <TableCell>Attendance Status</TableCell>
                      <TableCell>Remarks</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map(student => (
                      <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          <CommonTextFields
                            type='dropdown'
                            name={`${student.id}_status`}
                            label='Status'
                            placeholder='Select Status'
                            required={true}
                            options={[
                              { label: 'Select', value: '' },
                              { label: 'Present', value: 'Present' },
                              { label: 'Absent', value: 'Absent' },
                              { label: 'Late', value: 'Late' },
                            ]}
                            error={
                              touched[`${student.id}_status`] && !!errors[`${student.id}_status`]
                            }
                            helperText={
                              touched[`${student.id}_status`] && errors[`${student.id}_status`]
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <CommonTextFields
                            type='text'
                            name={`${student.id}_remarks`}
                            label='Remarks'
                            placeholder='Optional'
                            error={
                              touched[`${student.id}_remarks`] && !!errors[`${student.id}_remarks`]
                            }
                            helperText={
                              touched[`${student.id}_remarks`] && errors[`${student.id}_remarks`]
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid container spacing={2} sx={{ mt: 2 }} justifyContent='flex-end'>
                <Grid item>
                  <Button variant='contained' color='primary' type='submit'>
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant='outlined'
                    color='secondary'
                    onClick={handleSecondFormReset(resetForm)}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant='outlined' color='error' onClick={handleSecondFormCancel}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      )}

      {/* NEW: Snackbar for feedback */}
      <Snackbar open={feedback.open} autoHideDuration={6000} onClose={handleCloseFeedback}>
        <Alert onClose={handleCloseFeedback} severity={feedback.severity} sx={{ width: '100%' }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddAttendance;
