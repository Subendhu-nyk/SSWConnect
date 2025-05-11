import { Box, Typography } from '@mui/material';
import { CheckCircle, AlertCircle, Info, AlertTriangle, XCircle, Hourglass } from 'lucide-react';

const CustomToast = ({ type, message, theme }) => {
  const icons = {
    success: <CheckCircle style={{ width: 20, height: 20, color: '#22c55e' }} />,
    error: <AlertCircle style={{ width: 20, height: 20, color: '#ef4444' }} />,
    info: <Info style={{ width: 20, height: 20, color: '#3b82f6' }} />,
    warning: <AlertTriangle style={{ width: 20, height: 20, color: '#facc15' }} />,
    danger: <XCircle style={{ width: 20, height: 20, color: '#dc2626' }} />,
    process: <Hourglass style={{ width: 20, height: 20, color: '#facc15' }} />,
  };

  const titles = {
    success: 'Success',
    error: 'Error',
    info: 'Information',
    warning: 'Warning',
    danger: 'Danger',
    process: 'Processing',
  };

  const bgColors = {
    success: theme === 'dark' ? '#68696b' : '#ecfdf5',
    error: theme === 'dark' ? '#68696b' : '#fef2f2',
    info: theme === 'dark' ? '#68696b' : '#eff6ff',
    warning: theme === 'dark' ? '#68696b' : '#fffbeb',
    danger: theme === 'dark' ? '#68696b' : '#fef2f2',
    process: theme === 'dark' ? '#68696b' : '#fffbeb',
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        minHeight: 56,
        p: 2,
        borderRadius: 2,
        backgroundColor: bgColors[type],
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={{ flexShrink: 0 }}>{icons[type]}</Box>
      <Box sx={{ ml: 2, flex: 1 }}>
        <Typography variant='body' sx={{ fontWeight: 600 }}>
          {titles[type]}
        </Typography>
        <Typography
          variant='body2'
          sx={{ opacity: 0.8, color: theme === 'dark' ? '#fff' : '#555' }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomToast;
