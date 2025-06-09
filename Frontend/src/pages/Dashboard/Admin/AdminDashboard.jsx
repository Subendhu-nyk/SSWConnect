import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Badge,
  Avatar,
  Grid,
  IconButton,
  LinearProgress,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  CalendarToday,
  People,
  School,
  Person,
  Book,
  CheckCircle,
  Description,
  AttachMoney,
  TrendingUp,
  Add,
  ChevronLeft,
  ChevronRight,
  Close,
} from '@mui/icons-material';
import Calendar from 'react-calendar'; // Import the react-calendar library
import 'react-calendar/dist/Calendar.css'; // Import default styles (we'll override them)
import { ClipboardList, Home as HomeIcon, FileText } from 'lucide-react';
import { styled } from '@mui/material/styles';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from 'chart.js';
import { useSelector } from 'react-redux';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const GradientBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f97316 0%,white 100%)',
  color: theme.palette.common.white,
  padding: theme.spacing(4),
  borderRadius: 12,
}));

const AdminDashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1));
  const [selectedClass, setSelectedClass] = useState('Class II');
  const userData = useSelector(state => state?.auth?.user);
  console.log('data>>', userData);
  const statsCards = [
    { title: 'Total Students', value: '3654', change: '+5%', icon: People, color: '#f97316' },
    { title: 'Total Teachers', value: '284', change: '+2%', icon: School, color: '#3b82f6' },
    { title: 'Total Staff', value: '162', change: '+8%', icon: Person, color: '#a855f7' },
    { title: 'Total Subjects', value: '82', change: '+3%', icon: Book, color: '#22c55e' },
  ];

  const quickLinks = [
    { name: 'Calendar', icon: CalendarToday, color: '#22c55e' },
    { name: 'Exam Result', icon: ClipboardList, color: '#3b82f6' },
    { name: 'Attendance', icon: CheckCircle, color: '#eab308' },
    { name: 'Online', icon: HomeIcon, color: '#4ade80' },
    { name: 'Fees', icon: AttachMoney, color: '#14b8a6' },
    { name: 'Home Works', icon: Description, color: '#ef4444' },
    { name: 'Reports', icon: FileText, color: '#60a5fa' },
  ];

  const upcomingEvents = [
    {
      title: 'Parents, Teacher Meet',
      date: '15 July 2024',
      time: '09:10AM - 10:50PM',
      attendees: 3,
    },
    {
      title: 'Parents, Teacher Meet',
      date: '15 July 2024',
      time: '09:10AM - 10:50PM',
      attendees: 3,
    },
    {
      title: 'Vacation Meeting',
      date: '07 July 2024 - 07 July 2024',
      time: '09:10 AM - 10:50 PM',
      attendees: 2,
    },
  ];

  const leaveRequests = [
    {
      name: 'James',
      role: 'Physics Teacher',
      type: 'Emergency',
      dates: '12 - 13 May',
      status: 'pending',
    },
    { name: 'Ramon', role: 'Accountant', type: 'Casual', dates: '12 - 13 May', status: 'approved' },
  ];

  const notices = [
    { title: 'New Syllabus Instructions', date: '11 Mar 2024', type: 'info' },
    { title: 'World Environment Day Program...', date: '21 May 2024', type: 'success' },
    { title: 'Exam Preparation Notification', date: '13 Mar 2024', type: 'error' },
    { title: 'Online Classes Preparation', date: '24 May 2024', type: 'info' },
    { title: 'Exam Time Table Release', date: '24 May 2024', type: 'warning' },
  ];

  const todoItems = [
    { task: 'Send Reminder to Students', time: '01:00 PM', status: 'completed' },
    { task: 'Create Routine to new staff', time: '04:30 PM', status: 'incomplete' },
    { task: 'Extra Class Info to Students', time: '04:33 PM', status: 'yet-to-start' },
    { task: 'Fees for Upcoming Academics', time: '04:55 PM', status: 'yet-to-start' },
    { task: 'English - Essay on Visit', time: '05:30 PM', status: 'yet-to-start' },
  ];

  // Chart Data
  const attendanceData = {
    labels: ['Present', 'Absent', 'Late'],
    datasets: [
      {
        data: [28, 1, 1],
        backgroundColor: ['#3b82f6', '#ef4444', '#eab308'],
        hoverBackgroundColor: ['#2563eb', '#dc2626', '#d97706'],
      },
    ],
  };

  const performanceData = {
    labels: ['Top', 'Average', 'Below Avg'],
    datasets: [
      {
        data: [45, 11, 2],
        backgroundColor: ['#3b82f6', '#eab308', '#ef4444'],
        hoverBackgroundColor: ['#2563eb', '#d97706', '#dc2626'],
      },
    ],
  };

  const feesCollectionData = {
    labels: [
      'Q1 2023',
      'Q2 2023',
      'Q3 2023',
      'Q4 2023',
      'Q1 2024',
      'Q2 2024',
      'Q3 2024',
      'Q4 2024',
    ],
    datasets: [
      {
        label: 'Collected Fee',
        data: [70, 50, 90, 60, 80, 40, 100, 30],
        backgroundColor: '#3b82f6',
      },
      {
        label: 'Total Fee',
        data: [100, 100, 100, 100, 100, 100, 100, 100],
        backgroundColor: '#93c5fd',
      },
    ],
  };

  const earningsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Earnings',
        data: [50, 60, 55, 70, 65, 64.5],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
      },
    ],
  };

  const topSubjectsData = {
    labels: ['Maths', 'Science', 'English', 'Spanish'],
    datasets: [
      {
        label: 'Progress',
        data: [90, 85, 80, 75],
        backgroundColor: ['#22c55e', '#3b82f6', '#eab308', '#ef4444'],
      },
    ],
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f9fc', p: 3 }}>
      {/* Header */}
      <Box
        sx={{ bgcolor: 'white', borderRadius: 2, border: '1px solid #e5e7eb', px: 3, py: 2, mb: 2 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6' fontWeight='bold' color='#1e3a8a'>
              Admin Dashboard
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ display: { xs: 'none', sm: 'block' }, mt: 0.5 }}
            >
              Dashboard / Admin Dashboard
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              variant='contained'
              size='small'
              startIcon={<Add />}
              sx={{ bgcolor: '#3b82f6', '&:hover': { bgcolor: '#2563eb' } }}
            >
              Add New Student
            </Button>
            <Button
              variant='outlined'
              size='small'
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                borderColor: '#3b82f6',
                color: '#3b82f6',
              }}
            >
              Fees Details
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Alert Banner */}
      <Box
        sx={{
          bgcolor: '#d1fae5',
          borderRadius: 2,
          border: '1px solid #a7f3d0',
          px: 3,
          py: 2,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 8, height: 8, bgcolor: '#10b981', borderRadius: '50%' }} />
          <Typography variant='body2' color='#065f46'>
            Sakshi has paid Fees for the "Term1"
          </Typography>
        </Box>
        <IconButton size='small'>
          <Close fontSize='small' />
        </IconButton>
      </Box>

      {/* Welcome Section */}
      <GradientBox mb={2}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant='h3' fontWeight='bold' color='white'>
              Welcome Back, {userData.role.toUpperCase()}
            </Typography>
            <Typography variant='body2' color='blue'>
              Have a Good day at work
            </Typography>
          </Box>
          <Typography variant='caption' color='blue' sx={{ display: { xs: 'none', sm: 'block' } }}>
            Updated Recently on{' '}
            {new Date().toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </Typography>
        </Box>
      </GradientBox>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Stats Cards */}
        <Grid container spacing={2}>
          {statsCards.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <StyledCard>
                <CardContent sx={{ p: 2 }}>
                  {/* Row 1 */}
                  <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                    {/* Column 1: Icon on the left */}
                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor: stat.color,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        mr: 2,
                      }}
                    >
                      <stat.icon sx={{ color: 'white', fontSize: 20 }} />
                    </Box>
                    {/* Column 2: Value and Title */}
                    <Box sx={{ flex: 1 }}>
                      {/* Column 2, Row 1: Value above title */}
                      <Typography variant='h4' fontWeight='bold' color='#1e3a8a' sx={{ mb: 0.5 }}>
                        {stat.value}
                      </Typography>
                      {/* Column 2, Row 2: Title below value */}
                      <Typography
                        variant='caption'
                        color='text.secondary'
                        sx={{ fontSize: '0.85rem' }}
                      >
                        {stat.title}
                      </Typography>
                    </Box>
                    {/* Column 3: Badge with percentage */}
                    <Badge
                      badgeContent={stat.change}
                      color='primary'
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        '.MuiBadge-badge': {
                          bgcolor: stat.color,
                          color: 'white',
                          fontSize: '0.65rem',
                          minWidth: '24px',
                          height: '18px',
                          borderRadius: '10px',
                        },
                      }}
                    />
                  </Box>
                  {/* Row 2: Gray Divider */}
                  <Box sx={{ borderTop: '1px solid #e5e7eb', my: 1 }} />
                  {/* Row 2: Active and Inactive Counts */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Column 1: Active */}
                    <Typography
                      variant='caption'
                      color='text.secondary'
                      sx={{ fontSize: '0.75rem' }}
                    >
                      Active: {Math.floor(Number.parseInt(stat.value) * 0.9)}
                    </Typography>
                    {/* Column 2: Inactive */}
                    <Typography
                      variant='caption'
                      color='text.secondary'
                      sx={{ fontSize: '0.75rem' }}
                    >
                      Inactive: {Math.floor(Number.parseInt(stat.value) * 0.1)}
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} lg={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Calendar and Attendance */}
              <Grid container spacing={3}>
                {/* Calendar */}
                <Grid item xs={12} md={6}>
                  <StyledCard>
                    <CardHeader
                      title={
                        <Typography variant='h6' color='#1e3a8a'>
                          Schedules
                        </Typography>
                      }
                      action={
                        <Button variant='outlined' size='small' startIcon={<Add />}>
                          Add New
                        </Button>
                      }
                    />
                    <CardContent>
                      <Calendar
                        value={new Date(2025, 5, 8)} // Set to June 8, 2025 (today's date)
                        navigationLabel={({ date }) => (
                          <Typography variant='subtitle1' fontWeight='medium' color='#1e3a8a'>
                            {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
                          </Typography>
                        )}
                        tileClassName={({ date, view }) => {
                          if (
                            view === 'month' &&
                            date.getDate() === 8 &&
                            date.getMonth() === 5 &&
                            date.getFullYear() === 2025
                          ) {
                            return 'today';
                          }
                          return null;
                        }}
                        sx={{
                          width: '100%',
                          border: 'none',
                          '& .react-calendar__navigation': {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 1,
                          },
                          '& .react-calendar__navigation__label': {
                            flexGrow: 0,
                            border: 'none',
                            bgcolor: 'transparent',
                          },
                          '& .react-calendar__navigation__arrow': {
                            border: 'none',
                            bgcolor: 'transparent',
                            color: '#1e3a8a',
                            fontSize: '1.5rem',
                            p: 1,
                            '&:hover': {
                              bgcolor: 'grey.100',
                              borderRadius: '50%',
                            },
                          },
                          '& .react-calendar__month-view__weekdays': {
                            mb: 1,
                          },
                          '& .react-calendar__month-view__weekdays__weekday': {
                            color: 'text.secondary',
                            fontSize: '0.75rem',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            fontWeight: 'medium',
                          },
                          '& .react-calendar__month-view__days__day': {
                            color: 'text.primary',
                            fontSize: '0.85rem',
                            p: 1,
                            borderRadius: '50%',
                            '&:hover': {
                              bgcolor: 'grey.100',
                            },
                          },
                          '& .react-calendar__month-view__days__day--neighboringMonth': {
                            color: 'text.disabled',
                          },
                          '& .today': {
                            bgcolor: '#3b82f6',
                            color: 'white',
                            borderRadius: '50%',
                          },
                        }}
                      />
                    </CardContent>
                  </StyledCard>
                </Grid>

                {/* Attendance */}
                <Grid item xs={12} md={6}>
                  <StyledCard>
                    <CardHeader
                      title={
                        <Typography variant='h6' color='#1e3a8a'>
                          Attendance
                        </Typography>
                      }
                      action={
                        <Button variant='outlined' size='small'>
                          Today
                        </Button>
                      }
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <Box sx={{ width: 120, height: 120 }}>
                          <Doughnut
                            data={attendanceData}
                            options={{
                              cutout: '70%',
                              plugins: {
                                legend: { display: false },
                                tooltip: { enabled: true },
                              },
                            }}
                          />
                          <Typography
                            variant='h6'
                            sx={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              color: '#3b82f6',
                            }}
                          >
                            99.9%
                          </Typography>
                        </Box>
                      </Box>
                      <Grid container spacing={2} sx={{ textAlign: 'center' }}>
                        <Grid item xs={4}>
                          <Typography variant='h6' color='#1e3a8a'>
                            28
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            Present
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant='h6' color='#1e3a8a'>
                            01
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            Absent
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant='h6' color='#1e3a8a'>
                            01
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            Late
                          </Typography>
                        </Grid>
                      </Grid>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Typography variant='caption' color='text.secondary'>
                          Students
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          Teachers
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          Staff
                        </Typography>
                      </Box>
                    </CardContent>
                  </StyledCard>
                </Grid>
              </Grid>

              {/* Upcoming Events */}
              <StyledCard>
                <CardHeader
                  title={
                    <Typography variant='h6' color='#1e3a8a'>
                      Upcoming Events
                    </Typography>
                  }
                  action={<Button variant='text'>View All</Button>}
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {upcomingEvents.map((event, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: '#f0f7ff',
                        p: 2,
                        borderRadius: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: '#dbeafe',
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CalendarToday sx={{ fontSize: 20, color: '#3b82f6' }} />
                      </Box>
                      <Box sx={{ flex: 1, ml: 2 }}>
                        <Typography variant='subtitle2' color='#1e3a8a'>
                          {event.title}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {event.date}
                        </Typography>
                        <Typography
                          variant='caption'
                          color='text.secondary'
                          sx={{ display: 'block' }}
                        >
                          {event.time}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', ml: 2 }}>
                        {Array.from({ length: event.attendees }, (_, i) => (
                          <Avatar
                            key={i}
                            sx={{
                              width: 28,
                              height: 28,
                              fontSize: 12,
                              ml: -1,
                              border: '2px solid white',
                            }}
                          >
                            U
                          </Avatar>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </StyledCard>

              {/* Performance Cards */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <StyledCard sx={{ bgcolor: '#22c55e', color: 'white' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          mb: 2,
                        }}
                      >
                        <Box>
                          <Typography variant='h6' fontWeight='bold'>
                            Best Performer
                          </Typography>
                          <Typography variant='body2'>Rubel</Typography>
                          <Typography variant='caption'>Physics Teacher</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Box
                            sx={{ width: 8, height: 8, bgcolor: 'white', borderRadius: '50%' }}
                          />
                          <Box
                            sx={{ width: 8, height: 8, bgcolor: 'white', borderRadius: '50%' }}
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          bgcolor: 'rgba(255,255,255,0.2)',
                          borderRadius: '50%',
                          mx: 'auto',
                        }}
                      />
                    </CardContent>
                  </StyledCard>
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledCard sx={{ bgcolor: '#3b82f6', color: 'white' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          mb: 2,
                        }}
                      >
                        <Box>
                          <Typography variant='h6' fontWeight='bold'>
                            Star Students
                          </Typography>
                          <Typography variant='body2'>Tenesa</Typography>
                          <Typography variant='caption'>XII A</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Box
                            sx={{ width: 8, height: 8, bgcolor: 'white', borderRadius: '50%' }}
                          />
                          <Box
                            sx={{ width: 8, height: 8, bgcolor: 'white', borderRadius: '50%' }}
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          bgcolor: 'rgba(255,255,255,0.2)',
                          borderRadius: '50%',
                          mx: 'auto',
                        }}
                      />
                    </CardContent>
                  </StyledCard>
                </Grid>
              </Grid>

              {/* Fees Collection */}
              <StyledCard>
                <CardHeader
                  title={
                    <Typography variant='h6' color='#1e3a8a'>
                      Fees Collection
                    </Typography>
                  }
                  action={
                    <Button variant='outlined' size='small'>
                      Last 8 Quarter
                    </Button>
                  }
                />
                <CardContent>
                  <Box sx={{ height: 150 }}>
                    <Bar
                      data={feesCollectionData}
                      options={{
                        plugins: { legend: { display: false } },
                        scales: {
                          x: { stacked: true },
                          y: { stacked: true, beginAtZero: true, max: 120 },
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </StyledCard>
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Quick Links */}
              <StyledCard>
                <CardHeader
                  title={
                    <Typography variant='h6' color='#1e3a8a'>
                      Quick Links
                    </Typography>
                  }
                />
                <CardContent>
                  <Grid container spacing={2}>
                    {quickLinks.map((link, index) => (
                      <Grid item xs={4} key={index} sx={{ textAlign: 'center' }}>
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            bgcolor: link.color,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 1,
                          }}
                        >
                          <link.icon sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                        <Typography variant='caption' color='text.secondary'>
                          {link.name}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </StyledCard>

              {/* Class Routine */}
              <StyledCard>
                <CardHeader
                  title={
                    <Typography variant='h6' color='#1e3a8a'>
                      Class Routine
                    </Typography>
                  }
                  action={
                    <Button variant='outlined' size='small'>
                      Add New
                    </Button>
                  }
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {['Oct 2024', 'Nov 2024', 'Oct 2024'].map((month, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: 40, height: 40, bgcolor: 'grey.200', borderRadius: 2 }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant='subtitle2' color='#1e3a8a'>
                          {month}
                        </Typography>
                        <LinearProgress
                          variant='determinate'
                          value={100}
                          sx={{
                            height: 4,
                            bgcolor: index === 0 ? '#bfdbfe' : index === 1 ? '#fef9c3' : '#bbf7d0',
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </StyledCard>

              {/* Performance */}
              <StyledCard>
                <CardHeader
                  title={
                    <Typography variant='h6' color='#1e3a8a'>
                      Performance
                    </Typography>
                  }
                  action={
                    <FormControl size='small'>
                      <Select
                        value={selectedClass}
                        onChange={e => setSelectedClass(e.target.value)}
                        sx={{ minWidth: 100 }}
                      >
                        <MenuItem value='Class II'>Class II</MenuItem>
                        <MenuItem value='Class III'>Class III</MenuItem>
                      </Select>
                    </FormControl>
                  }
                />
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                    {[
                      { label: 'Top', value: 45, color: '#3b82f6' },
                      { label: 'Average', value: 11, color: '#eab308' },
                      { label: 'Below Avg', value: 2, color: '#ef4444' },
                    ].map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant='body2' color='text.secondary'>
                          {item.label}
                        </Typography>
                        <Typography variant='subtitle1' fontWeight='bold' color={item.color}>
                          {item.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ width: 100, height: 100, mx: 'auto' }}>
                    <Doughnut
                      data={performanceData}
                      options={{
                        cutout: '70%',
                        plugins: { legend: { display: false } },
                      }}
                    />
                  </Box>
                </CardContent>
              </StyledCard>

              {/* Leave Requests */}
              <StyledCard>
                <CardHeader
                  title={
                    <Typography variant='h6' color='#1e3a8a'>
                      Leave Requests
                    </Typography>
                  }
                  action={
                    <Button variant='outlined' size='small'>
                      Today
                    </Button>
                  }
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {leaveRequests.map((request, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 40, height: 40 }}>{request.name[0]}</Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant='subtitle2' color='#1e3a8a'>
                            {request.name}
                          </Typography>
                          <Badge
                            badgeContent={request.type}
                            color={request.type === 'Emergency' ? 'error' : 'secondary'}
                            sx={{ '.MuiBadge-badge': { fontSize: 10 } }}
                          />
                        </Box>
                        <Typography variant='caption' color='text.secondary'>
                          {request.role}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          Leave: {request.dates}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            bgcolor: request.status === 'approved' ? '#22c55e' : '#ef4444',
                            borderRadius: '50%',
                          }}
                        />
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            bgcolor: request.status === 'approved' ? '#22c55e' : '#ef4444',
                            borderRadius: '50%',
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </StyledCard>
            </Box>
          </Grid>
        </Grid>

        {/* Quick Action Cards */}
        <Grid container spacing={3}>
          {[
            { icon: CalendarToday, title: 'View Attendance', color: '#eab308' },
            { icon: Add, title: 'New Events', color: '#22c55e' },
            { icon: People, title: 'Membership Plans', color: '#ef4444' },
            { icon: AttachMoney, title: 'Finance & Accounts', color: '#14b8a6' },
          ].map((card, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <StyledCard
                sx={{
                  bgcolor: card.color,
                  color: 'white',
                  '&:hover': { bgcolor: `${card.color}cc` },
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <card.icon sx={{ fontSize: 32, mb: 1 }} />
                  <Typography variant='h6' fontWeight='bold'>
                    {card.title}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {/* Final Bottom Section */}
        <Grid container spacing={3}>
          {/* Total Earnings */}
          <Grid item xs={12} lg={3}>
            <StyledCard>
              <CardContent sx={{ p: 3 }}>
                <Typography variant='body2' color='text.secondary' mb={2}>
                  Total Earnings
                </Typography>
                <Typography variant='h5' fontWeight='700' color='#22c55e'>
                  $64,522.24
                </Typography>
                <Box sx={{ height: 100, mt: 3 }}>
                  <Line
                    data={earningsData}
                    options={{
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { display: true },
                        y: { beginAtZero: true },
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Notice Board */}
          <Grid item xs={12} lg={3}>
            <StyledCard>
              <CardHeader
                title={
                  <Typography variant='h6' color='#1e3a8a'>
                    Notice Board
                  </Typography>
                }
                action={<Button variant='text'>View All</Button>}
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {notices.map((notice, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        bgcolor:
                          notice.type === 'info'
                            ? '#3b82f6'
                            : notice.type === 'success'
                            ? '#22c55e'
                            : notice.type === 'error'
                            ? '#ef4444'
                            : '#eab308',
                        borderRadius: '50%',
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant='body2' color='#1e3a8a'>
                        {notice.title}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        Added on: {notice.date}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Fees Collected */}
          <Grid item xs={12} lg={3}>
            <StyledCard>
              <CardContent sx={{ p: 3 }}>
                <Typography variant='body2' color='text.secondary' mb={2}>
                  Total Fees Collected
                </Typography>
                <Typography variant='h5' fontWeight='700' color='#22c55e'>
                  $25,000.02
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <TrendingUp sx={{ fontSize: 16, color: '#22c55e', mr: 1 }} />
                  <Typography variant='caption' color='#22c55e'>
                    +1.8%
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant='caption' color='text.secondary'>
                      Fine Collected till date
                    </Typography>
                    <Typography variant='caption' color='#22c55e'>
                      $54.64
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant='caption' color='text.secondary'>
                      Student Not Paid
                    </Typography>
                    <Typography variant='caption' color='#ef4444'>
                      $45
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='caption' color='text.secondary'>
                      Total Outstanding
                    </Typography>
                    <Typography variant='caption' color='#ef4444'>
                      $54.64
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Todo */}
          <Grid item xs={12} lg={3}>
            <StyledCard>
              <CardHeader
                title={
                  <Typography variant='h6' color='#1e3a8a'>
                    Todo
                  </Typography>
                }
                action={
                  <Button variant='outlined' size='small'>
                    Today
                  </Button>
                }
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {todoItems.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        bgcolor:
                          item.status === 'completed'
                            ? '#22c55e'
                            : item.status === 'incomplete'
                            ? '#3b82f6'
                            : '#eab308',
                        borderRadius: '50%',
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant='body2' color='#1e3a8a'>
                        {item.task}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {item.time}
                      </Typography>
                    </Box>
                    <Badge
                      badgeContent={
                        item.status === 'completed'
                          ? 'Completed'
                          : item.status === 'incomplete'
                          ? 'Inprogress'
                          : 'Yet to Start'
                      }
                      color={
                        item.status === 'completed'
                          ? 'success'
                          : item.status === 'incomplete'
                          ? 'primary'
                          : 'warning'
                      }
                      sx={{ '.MuiBadge-badge': { fontSize: 10 } }}
                    />
                  </Box>
                ))}
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Top Subjects */}
          <Grid item xs={12} lg={3}>
            <StyledCard>
              <CardHeader
                title={
                  <Typography variant='h6' color='#1e3a8a'>
                    Top Subjects
                  </Typography>
                }
                action={
                  <FormControl size='small'>
                    <Select
                      value={selectedClass}
                      onChange={e => setSelectedClass(e.target.value)}
                      sx={{ minWidth: 100 }}
                    >
                      <MenuItem value='Class II'>Class II</MenuItem>
                      <MenuItem value='Class III'>Class III</MenuItem>
                    </Select>
                  </FormControl>
                }
              />
              <CardContent>
                <Typography variant='caption' color='text.secondary' mb={2}>
                  These Result obtained from the syllabus completion in the respective Class
                </Typography>
                <Box sx={{ height: 150 }}>
                  <Bar
                    data={topSubjectsData}
                    options={{
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { display: true },
                        y: { beginAtZero: true, max: 100 },
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Student Activity */}
          <Grid item xs={12} lg={3}>
            <StyledCard>
              <CardHeader
                title={
                  <Typography variant='h6' color='#1e3a8a'>
                    Student Activity
                  </Typography>
                }
                action={
                  <Button variant='outlined' size='small'>
                    This Month
                  </Button>
                }
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  {
                    title: "1st place in 'Chess'",
                    desc: 'This event took place in our School',
                    img: 'https://via.placeholder.com/40',
                  },
                  {
                    title: "Participated in 'Carrom'",
                    desc: 'Justin Lee participated in Carrom',
                    img: 'https://via.placeholder.com/40',
                  },
                  {
                    title: "1st place in '100M'",
                    desc: 'International Conference',
                    img: 'https://via.placeholder.com/40',
                  },
                ].map((activity, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={activity.img} sx={{ width: 40, height: 40 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant='body2' color='#1e3a8a'>
                        {activity.title}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {activity.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
