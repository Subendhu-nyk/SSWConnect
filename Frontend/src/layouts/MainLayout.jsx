import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import LoadingComponent from '../components/LoadingComponent/LoadingComponent';
import Header from '../components/Header/Header';
import SidebarView from '../components/Sidebar/SidebarView';

const MainLayout = () => {
  const userRole = localStorage.getItem('userRole') || 'admin';
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      {/* Full-width Header */}
      <Toolbar>
        <Header />
      </Toolbar>
      {/* Sidebar */}
      <SidebarView userRole={userRole} />
      {/* Main Content Area */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          p: 3,
          width: { xs: 'calc(100% - 240px)' }, // Adjust for sidebar width
          ml: { xs: '240px' }, // Offset main content by sidebar width
          mt: `64px`,
          overflowY: 'auto',
          minWidth: 0,
          position: 'absolute',
          left: 0,
          right: 0,
        }}
      >
        {/* Add LoadingComponent */}
        <Suspense fallback={<LoadingComponent />}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
};

export default MainLayout;
