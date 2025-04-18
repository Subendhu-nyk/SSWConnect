import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
  Avatar,
  FormControlLabel,
  Switch,  
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Badge from '@mui/material/Badge';
// import { useNavigate } from 'react-router-dom';

import UserProfile from './UserProfile';
import { toggleTheme } from '../../features/ThemeReducer/themeSlice';
import NotificationBar from '../NotificationBar/NotificationBar';
import ApplicationSettings from './ApplicationSettings';
import { capitalizeWords } from '../../utils/commonFunction/commonFunction';

// Custom styled switch defined within the component
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#3b30c8',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute !important',
      width: '100% !important',
      height: '100% !important',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat !important',
      backgroundPosition: 'center !important',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#0d203d',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));

const Header = () => {
  const theme = useSelector(state => state.theme);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const onLogout = () => {
    alert('logout');
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: 'background.default',
          position: 'fixed !important',
          zIndex: 101,
          boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12) !important`,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex !important',
            justifyContent: 'space-between !important',
            alignItems: 'center !important',
            padding: '0 16px !important',
            color: theme.darkMode ? '#fff' : '#424242',
          }}
        >
          <Box ml={1} display='flex' flexDirection='row' alignItems='center'>
            <img
              style={{
                verticalAlign: 'middle',
                userSelect: 'none',
                filter: imageLoaded ? 'none' : 'blur(6px)',
                transition: 'filter 0.5s ease-in-out, opacity 0.5s ease-in-out',
              }}
              height='42px'
              width='auto'
              src='fav.jpg'
              alt='App Logo'
              loading='lazy'
              draggable='false'
              onLoad={() => setImageLoaded(true)}
            />
            <Typography variant='h6' sx={{ whiteSpace: 'nowrap', mx: 2, fontSize: '18px' }}>
              SSWCOE
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex !important',
              alignItems: 'center !important',
              gap: '16px !important',
            }}
          >
            <Typography variant='h6' sx={{ whiteSpace: 'nowrap' }}>
              Welcome, {'SAM'}{' '}
              <span style={{ color: theme.darkMode ? '#fff' : 'blue' }}>({capitalizeWords(user.role)})</span>
            </Typography>
            <Tooltip
              sx={{ marginLeft: '1px !important', marginRight: '1px !important' }}
              title={`Now the Theme is ${theme.darkMode === true ? 'Dark' : 'Light'}`}
            >
              <FormControlLabel
                control={<MaterialUISwitch checked={theme.darkMode} onChange={handleThemeToggle} />}
              />
            </Tooltip>

            {/* {userData && ( */}
            <Tooltip title='User Details'>
              <IconButton
                onClick={handleClick}
                size='small'
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                sx={{
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:focus-visible': {
                    outline: 'none',
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    fontSize: '0.8rem !important',
                    color: '#3730c7 !important',
                    backgroundColor: '#eae9ff !important',
                    textTransform: 'uppercase',
                  }}
                >
                  {/* Name initials */}
                  SL
                  {/* {`${userData.firstName?.charAt(0)}${userData.lastName?.charAt(0)}`} */}
                </Avatar>
              </IconButton>
            </Tooltip>
            {/* )} */}

            <Tooltip title='Application Settings'>
              <IconButton
                onClick={handleDialogOpen}
                sx={{
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:focus-visible': {
                    outline: 'none',
                  },
                }}
              >
                <SettingsOutlinedIcon sx={{ color: theme.darkMode ? '#fff' : '#424242' }} />
              </IconButton>
            </Tooltip>

            <Tooltip title='Notifications'>
              <IconButton
                onClick={toggleDrawer(!drawerOpen)}
                sx={{
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:focus-visible': {
                    outline: 'none',
                  },
                }}
              >
                <Badge badgeContent={5} color='primary'>
                  <NotificationsOutlinedIcon sx={{ color: theme.darkMode ? '#fff' : '#424242' }} />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <UserProfile {...{ anchorEl, handleClose, onLogout }} />
      <ApplicationSettings open={isDialogOpen} onClose={handleDialogClose} />
      <NotificationBar toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
    </>
  );
};

export default Header;
