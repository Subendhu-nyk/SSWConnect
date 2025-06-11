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
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useDispatch, useSelector } from 'react-redux';
import { accordionConfig } from '../../config/AccordionConfig/accordionConfig';
import { generateInitialValues } from '../../config/generateInitialValues';
import generateValidationSchema from '../../utils/validation/generateValidationSchema';
import CommonTextFields from '../../common/TextFields/CommonTextFields';
import { Form, Formik } from 'formik';
import * as Yup from 'yup'; // NEW: Added Yup for second form validation
import { getUserThunk } from '../../features/UserManagement/userManagementThunk';
import { buildPayloadByRole, handleExcelUpload } from '../../utils/commonFunction/commonFunction';
import { addAttendanceThunk } from '../../features/ManagementReducer/attendanceManagementThunk';
import CommonFilter from '../../common/CommonFilter/CommonFilter';
import { AttendanceDetailFields } from '../../config/FormFieldConfig/AttendanceFieldConfig/attendanceDetailFields';

function AddAttendance() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });
  const [selectedRole, setSelectedRole] = useState('');
  const [attendanceDate, setAttendanceDate] = useState('');
  const departmentData = useSelector(state => state?.hrmManagement?.getDepartmentData);
  const userData = useSelector(state => state?.userManagement?.getUserDetails);
  console.log(('student data', userData));
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
                        if (field.name === 'role') {
                          setSelectedRole(value); // Update role state
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

  // NEW: Handle top form submission to fetch students and show second form
  const handleTopFormSubmit = async (values, actions, { resetForm }) => {
    try {
      const payload = buildPayloadByRole(selectedRole, values);
      await dispatch(getUserThunk({ payload })).unwrap();
      setAttendanceDate(values.date);
      setTopFormValues(values); // Store form values
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
    resetForm();
  };

  useEffect(() => {
    if (!userData || !Array.isArray(userData)) return;

    const formatted = userData.map(user => ({
      id: user.userId,
      name: user.name,
      role: user.role,
      department: 'CSE',
      year: '1st Year',
      section: 'A',
      status: '',
      remarks: '',
    }));

    setStudents(formatted);
  }, [userData]);

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
  const handleSecondFormSubmit = async (values, actions) => {
    const attendanceData = students.map(student => {
      return {
        user_id: student.id,
        role: student.role,
        department: student.department,
        section: student.section,
        year: student.year,
        date: attendanceDate,
        status: values[`${student.id}_status`],
        remarks: values[`${student.id}_remarks`],
      };
    });
    await dispatch(addAttendanceThunk({ payload: attendanceData }));
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
    setStudents([]);
    setStudents(students.map(student => ({ ...student, status: '', remarks: '' })));
  };

  // NEW: Handle feedback close
  const handleCloseFeedback = () => {
    setFeedback({ ...feedback, open: false });
  };

  const handleAttendanceExcelUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';

    input.onchange = async e => {
      const file = e.target.files[0];
      if (!file) return;
      await handleExcelUpload(
        file,
        data => dispatch(addAttendanceThunk({ payload: data })), // your bulk attendance thunk
        () => console.log('Attendance upload successful!'),
        error => console.log(`Attendance upload failed: ${error.message}`)
      );
    };

    input.click();
  };

  const onDownloadAttendanceTemplate = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attendance Template');

    // Add header row
    const headerRow = worksheet.getRow(1);
    AttendanceDetailFields.forEach((field, index) => {
      const cell = headerRow.getCell(index + 1);
      cell.value = field.name;
      cell.font = {
        color: field.required ? { argb: 'FFFF0000' } : { argb: 'FF000000' },
        bold: true,
      };
      worksheet.getColumn(index + 1).width = Math.max(field.name.length + 5, 20);
    });
    headerRow.commit();

    // Add dropdown validation (first 1000 rows)
    AttendanceDetailFields.forEach((field, colIdx) => {
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

    // Create Excel buffer and download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'AttendanceTemplate.xlsx');
  };

  return (
    <>
      <CommonFilter
        title='Add Attendance'
        onSearch={false}
        showSearch={false}
        showAdd={true}
        showImport={true}
        showDownloadTemplate={true}
        showRefresh={true}
        showRecycleBin={true}
        onAdd={() => console.log('Add new')}
        onImport={handleAttendanceExcelUpload}
        onExport={() => console.log('Export')}
        onDownloadTemplate={onDownloadAttendanceTemplate}
        onRefresh={() => console.log('Refresh')}
        onRecycleBin={() => console.log('To recycle bin')}
        onPrint={() => window.print()}
      />
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
            <Grid container spacing={2}>
              {renderAccordionContent(dynamicConfig, selectedRole)}
              {!showSecondForm && (
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
              )}
            </Grid>
          </Form>
        )}
      </Formik>

      {/* NEW: Second Form (Student Attendance Table) */}
      {showSecondForm && (
        <Formik
          initialValues={secondFormInitialValues}
          validationSchema={secondFormValidationSchema}
          onSubmit={(values, actions) => {
            console.log('error', actions.error);
            console.log('inside submit', values);
            handleSecondFormSubmit(values, actions);
            // when Submit is clicked, Formik will call this with current form values + helpers like resetForm
          }}
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
                      <TableCell>User ID</TableCell>
                      <TableCell>User Name</TableCell>
                      <TableCell>User Role</TableCell>
                      <TableCell>Attendance Status</TableCell>
                      <TableCell>Remarks</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map(student => (
                      <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.role}</TableCell>
                        <TableCell>
                          <CommonTextFields
                            type='dropdown'
                            name={`${student.id}_status`}
                            label='Status'
                            placeholder='Select Status'
                            required={true}
                            options={[
                              { label: 'Present', value: 'Present' },
                              { label: 'Absent', value: 'Absent' },
                              { label: 'Leave', value: 'Leave' },
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
              <Grid container spacing={2} sx={{ mt: 1 }} justifyContent='flex-end'>
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
