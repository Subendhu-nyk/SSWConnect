import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingComponent = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(4px)',
        zIndex: 1301, // Higher than MUI's AppBar default
      }}
    >
      <Box sx={{ position: 'relative', textAlign: 'center' }}>
        {/* Loader with Image Inside */}
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            size={74} // Equivalent to w-16/h-16 (4rem = 64px)
            thickness={4} // Controls the border thickness
            sx={{
              color: '#e88d1a', // Blue-500 equivalent
              borderTopColor: 'transparent', // Only top border is colored for spin effect
              animation: 'spin 1s linear infinite', // Custom spin animation
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          />
          {/* Image centered inside the loader */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)', // Center the image
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src='fav.jpg'
              alt='loading icon'
              style={{ width: '28px' }} // Equivalent to w-7 (1.75rem = 28px)
            />
          </Box>
        </Box>

        {/* Loading text */}
        <Typography
          variant='body1'
          sx={{ mt: 2, color: '#6b7280' }} // Gray-500 equivalent
        >
          Your request is being processed. Do not close or refresh the page.
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingComponent;
