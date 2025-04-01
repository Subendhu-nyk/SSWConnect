import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Divider,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

const AdminDashboard = ({ userRole = 'admin' }) => {
  const [studentForm, setStudentForm] = useState({
    name: '',
    studentId: '',
    course: '',
  });

  const [courseForm, setCourseForm] = useState({
    courseName: '',
    teacher: '',
    schedule: '',
  });

  const [gradeForm, setGradeForm] = useState({
    studentId: '',
    course: '',
    grade: '',
  });

  const handleStudentSubmit = e => {
    e.preventDefault();
    console.warn('Student Form Submitted:', studentForm);
    setStudentForm({ name: '', studentId: '', course: '' });
  };

  const handleCourseSubmit = e => {
    e.preventDefault();
    console.warn('Course Form Submitted:', courseForm);
    setCourseForm({ courseName: '', teacher: '', schedule: '' });
  };

  const handleGradeSubmit = e => {
    e.preventDefault();
    console.warn('Grade Form Submitted:', gradeForm);
    setGradeForm({ studentId: '', course: '', grade: '' });
  };

  const renderDashboardContent = () => {
    switch (userRole.toLowerCase()) {
      case 'admin':
        return (
          <>
            <Paper elevation={3} sx={{ p: 3, mb: 4, width: '100%' }}>
              <Typography variant='h6' gutterBottom>
                Add New Student
              </Typography>
              <form onSubmit={handleStudentSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label='Student Name'
                      value={studentForm.name}
                      onChange={e => setStudentForm({ ...studentForm, name: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label='Student ID'
                      value={studentForm.studentId}
                      onChange={e => setStudentForm({ ...studentForm, studentId: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label='Course'
                      value={studentForm.course}
                      onChange={e => setStudentForm({ ...studentForm, course: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label='Course'
                      value={studentForm.course}
                      onChange={e => setStudentForm({ ...studentForm, course: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label='Course'
                      value={studentForm.course}
                      onChange={e => setStudentForm({ ...studentForm, course: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label='Course'
                      value={studentForm.course}
                      onChange={e => setStudentForm({ ...studentForm, course: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label='Course'
                      value={studentForm.course}
                      onChange={e => setStudentForm({ ...studentForm, course: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type='submit' variant='contained' color='primary'>
                      Add Student
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>

            <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
              <Typography variant='h6' gutterBottom>
                Add New Course
              </Typography>
              <form onSubmit={handleCourseSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label='Course Name'
                      value={courseForm.courseName}
                      onChange={e => setCourseForm({ ...courseForm, courseName: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label='Teacher'
                      value={courseForm.teacher}
                      onChange={e => setCourseForm({ ...courseForm, teacher: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label='Schedule'
                      value={courseForm.schedule}
                      onChange={e => setCourseForm({ ...courseForm, schedule: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type='submit' variant='contained' color='primary'>
                      Add Course
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </>
        );

      case 'teacher':
        return (
          <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
            <Typography variant='h6' gutterBottom>
              Submit Student Grades
            </Typography>
            <form onSubmit={handleGradeSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='Student ID'
                    value={gradeForm.studentId}
                    onChange={e => setGradeForm({ ...gradeForm, studentId: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='Course'
                    value={gradeForm.course}
                    onChange={e => setGradeForm({ ...gradeForm, course: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Grade</InputLabel>
                    <Select
                      value={gradeForm.grade}
                      label='Grade'
                      onChange={e => setGradeForm({ ...gradeForm, grade: e.target.value })}
                      required
                    >
                      <MenuItem value='A'>A</MenuItem>
                      <MenuItem value='B'>B</MenuItem>
                      <MenuItem value='C'>C</MenuItem>
                      <MenuItem value='D'>D</MenuItem>
                      <MenuItem value='F'>F</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button type='submit' variant='contained' color='primary'>
                    Submit Grade
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        );

      case 'student':
        return (
          <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
            <Typography variant='h6' gutterBottom>
              Student Dashboard
            </Typography>
            <Typography variant='body1'>
              Welcome to your dashboard! Here you can view your courses and grades.
            </Typography>
          </Paper>
        );

      case 'staff':
        return (
          <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
            <Typography variant='h6' gutterBottom>
              Staff Dashboard
            </Typography>
            <Typography variant='body1'>Manage attendance and course schedules here.</Typography>
          </Paper>
        );

      default:
        return <Typography>Dashboard content not available for this role.</Typography>;
    }
  };

  return (
    <Box sx={{ py: 2, width: '100%' }}>
      <Typography variant='h4' gutterBottom>
        {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard
      </Typography>
      <Divider sx={{ mb: 3 }} />
      {renderDashboardContent()}
    </Box>
  );
};

export default AdminDashboard;
