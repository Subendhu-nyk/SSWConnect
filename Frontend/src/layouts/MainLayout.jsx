import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import LoadingComponent from '../components/LoadingComponent/LoadingComponent';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      {/* Full-width Header */}
      <Toolbar>HeaderView</Toolbar>
      {/* Sidebar */}
      SidebarView
      {/* Main Content Area */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          p: 3,
          pl: 8,
          mt: 8,
          overflowY: 'auto',
        }}
      >
        {/* Add LoadingComponent */}
        <Suspense fallback={LoadingComponent}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
};

export default MainLayout;
