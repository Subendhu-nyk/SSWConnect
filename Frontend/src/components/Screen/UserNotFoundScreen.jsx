import { useState, useEffect } from 'react';
import { keyframes } from '@emotion/react';
import { Button, Box, Typography, Dialog, DialogContent, DialogActions } from '@mui/material';

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7);
  }
  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 10px rgba(220, 53, 69, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(220, 53, 69, 0);
  }
`;

const UserNotFoundScreen = () => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer);
          handleLogout();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    window.location.href = '/logout';
  };

  return (
    <Dialog
      open={true}
      fullWidth
      maxWidth='sm'
      PaperProps={{
        sx: {
          backdropFilter: 'blur(35px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 3,
          boxShadow: 'none',
          overflow: 'visible',
        },
      }}
    >
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          pt: 4,
          pb: 0,
          backgroundColor: 'white',
          border: '1px solid gray',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          animation: 'fadeIn 0.5s ease-in-out',
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            backgroundColor: '#dc3545',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 3,
            animation: `${pulseAnimation} 1.5s infinite`,
          }}
        >
          <Typography variant='h4' sx={{ color: '#fff', fontWeight: 'bold' }}>
            !
          </Typography>
        </Box>

        <Typography
          variant='h5'
          sx={{
            color: '#721c24',
            fontWeight: 'bold',
            marginBottom: 2,
            textAlign: 'center',
          }}
        >
          User not found or Inactive
        </Typography>

        <Typography
          variant='body1'
          sx={{
            color: '#721c24',
            marginBottom: 2,
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          You are not an authorized user.
          <br /> Please contact admin for access.
        </Typography>

        <Typography
          variant='body2'
          sx={{ color: '#721c24', marginBottom: 1.5, fontStyle: 'italic' }}
        >
          You will be logged out in {countdown} seconds.
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: 'center',
          pb: 3,
          backgroundColor: 'white',
          borderTop: '1px solid gray',
        }}
      >
        <Button
          variant='contained'
          color='error'
          sx={{
            padding: '12px 30px',
            fontWeight: 'bold',
            borderRadius: '8px',
            textTransform: 'none',
            fontSize: '1rem',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
          }}
        >
          Contact Admin
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserNotFoundScreen;
