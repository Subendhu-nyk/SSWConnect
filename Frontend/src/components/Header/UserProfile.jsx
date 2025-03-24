import React from 'react';
import { Avatar, Button, Grid, Popover, Typography, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { LogoutOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';

const UserProfile = ({
  anchorEl = false,
  userData = {},
  handleClose = () => {},
  onLogout = () => {},
}) => {
  const open = Boolean(anchorEl);
  const userDetails = [
    {
      label: 'Username',
      icon: <PersonIcon sx={{ color: '#FF8A65' }} />, // Orange icon
      value: userData?.userName || 'Sam',
    },
    {
      label: 'User ID',
      icon: <BadgeIcon sx={{ color: '#FF8A65' }} />, // Orange icon
      value: userData?.user_id || 'SSW105',
    },
    {
      label: 'Role',
      icon: <ManageAccountsIcon sx={{ color: '#FF8A65' }} />, // Orange icon
      value: userData?.role || 'Student',
    },
  ];
  return (
    <Box>
      {userData && (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          sx={{ zIndex: 900 }}
          PaperProps={{
            sx: {
              height: '300px',
              width: '320px',
              borderRadius: '10px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',              
            },
          }}
        >
          <Stack direction='column'>
            <Box
              sx={{
                backgroundColor: 'background.profile',
                padding: '1rem',               
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',               
              }}
            >
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#0070e8 !important',
                  backgroundColor: '#E4F1FF',
                  textTransform: 'uppercase',
                }}
              >
                {/* {`${userData.firstName?.charAt(0)}${userData.lastName?.charAt(0)}`} */}
                SL
              </Avatar>
              <Typography variant='h6' sx={{ mt: 1 }}>
                {userData?.displayName || 'Sam'}
              </Typography>
              <Typography variant='subheading'>{userData?.emailId}</Typography>
            </Box>

            <Box p={2} sx={{ marginLeft: '20px'}}>
              <Grid container spacing={1}>
                {userDetails.map((detail, index) => (
                  <React.Fragment key={index}>
                    <Grid item md={6} sx={{ paddingRight: '0.5rem' }}>
                      <Stack
                        direction='row'
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        }}
                        spacing={2}
                      >
                        {React.cloneElement(detail.icon, { fontSize: '16px' })}
                        <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                          {detail.label}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item md={6} sx={{ paddingLeft: '0.5rem' }}>
                      <Stack
                        direction='row'
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                        }}
                        spacing={2}
                      >
                        <Typography
                          variant='body2'
                          sx={{ wordBreak: 'break-word', whiteSpace: 'normal' }}
                        >
                          {detail.value}
                        </Typography>
                      </Stack>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2.5 }}>
                <Button
                  variant='contained'
                  onClick={onLogout}
                  sx={{
                    minWidth: '6rem',
                    backgroundColor: '#3B30C8',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#2a1f9b' },
                  }}
                >
                  <LogoutOutlined sx={{ marginRight: '8px' }} />
                  Logout
                </Button>
              </Box>          
             
            </Box>
          </Stack>
        </Popover>
      )}      
    </Box>
  );
};

export default UserProfile;
