import React from 'react';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
  Stack,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/system';
import { logout } from '../../features/AuthReducer/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { capitalizeWords } from '../../utils/commonFunction/commonFunction';

const UserProfile = ({ anchorEl = false, userData = {}, handleClose = () => {} }) => {
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(state => state.auth);

  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/auth');
  };

  const handleOptionClick = option => {
    alert(`${option} clicked!`);
    handleClose();
  };

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
              width: '250px',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <Stack direction='column'>
            {/* Header Section */}
            <Box
              sx={{
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #e0e0e0',
              }}
            >
              <Box sx={{ position: 'relative', marginRight: '0.75rem' }}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#E4F1FF',
                    color: '#0070e8',
                  }}
                  src={userData?.profilePhoto || ''} // Use profile photo if available
                >
                  {/* If no profile photo, show PersonIcon */}
                  {!userData?.profilePhoto && <PersonIcon />}
                </Avatar>
                {/* Green online dot */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 14,
                    height: 14,
                    backgroundColor: '#4caf50', // Green color for online status
                    borderRadius: '50%',
                    border: '2px solid white', // White border to match the image
                  }}
                />
              </Box>
              <Box>
                <Typography variant='subtitle1' sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                  {userData?.displayName || 'Sam'}
                </Typography>
                <Typography variant='body2' sx={{ color: '#1976d2', fontSize: '0.85rem' }}>
                  {capitalizeWords(user.role) || 'Administrator'}
                </Typography>
                <Typography variant='body2' sx={{ color: '#666', fontSize: '0.85rem' }}>
                  User ID: {userData?.user_id || 'SSW105'}
                </Typography>
              </Box>
            </Box>

            {/* Divider */}
            <Divider />

            {/* Options List */}
            <List sx={{ padding: 0 }}>
              <ListItem
                button
                onClick={() => handleOptionClick('View Profile')}
                sx={{ padding: '0.5rem 1rem' }}
              >
                <ListItemIcon sx={{ minWidth: '30px' }}>
                  <PersonIcon sx={{ fontSize: '20px' }} />
                </ListItemIcon>
                <ListItemText
                  primary='View Profile'
                  primaryTypographyProps={{ fontSize: '0.9rem' }}
                />
              </ListItem>
              <ListItem
                button
                onClick={() => handleOptionClick('Help Center')}
                sx={{ padding: '0.5rem 1rem' }}
              >
                <ListItemIcon sx={{ minWidth: '30px' }}>
                  <HelpOutlineIcon sx={{ fontSize: '20px' }} />
                </ListItemIcon>
                <ListItemText
                  primary='Help Center'
                  primaryTypographyProps={{ fontSize: '0.9rem' }}
                />
              </ListItem>
              <ListItem
                button
                onClick={() => handleOptionClick('Account Settings')}
                sx={{ padding: '0.5rem 1rem' }}
              >
                <ListItemIcon sx={{ minWidth: '30px' }}>
                  <SettingsIcon sx={{ fontSize: '20px' }} />
                </ListItemIcon>
                <ListItemText
                  primary='Account Settings'
                  primaryTypographyProps={{ fontSize: '0.9rem' }}
                />
              </ListItem>
              <ListItem button onClick={onLogout} sx={{ padding: '0.5rem 1rem' }}>
                <ListItemIcon sx={{ minWidth: '30px' }}>
                  <LogoutIcon sx={{ fontSize: '20px' }} />
                </ListItemIcon>
                <ListItemText primary='Log Out' primaryTypographyProps={{ fontSize: '0.9rem' }} />
              </ListItem>
            </List>
          </Stack>
        </Popover>
      )}
    </Box>
  );
};

export default UserProfile;
