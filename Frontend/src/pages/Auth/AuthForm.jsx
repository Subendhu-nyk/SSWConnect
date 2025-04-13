import { useEffect, useState } from 'react';
import jwtEncode from 'jwt-encode';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  IconButton,
  Divider,
  InputAdornment,
  Snackbar,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';

import { logout, setTokenFromStorage } from '../../features/AuthReducer/authSlice';
import { fetchRolePermissions } from '../../features/AuthReducer/authThunk';
import backgroundImage from '../../../public/cse3.jpg'; // Update to your image path
import UserNotFoundScreen from '../../components/Screen/UserNotFoundScreen';

const BackgroundContainer = styled(Box)({
  position: 'relative',
  height: '100vh',
  width: '100vw',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  zIndex: 1,
});

const LoginCard = styled(Box)({
  position: 'relative',
  zIndex: 2,
  backgroundColor: 'rgba(255, 255, 255, 0.89)',
  borderRadius: '16px',
  padding: '2rem',
  maxWidth: '450px',
  width: '90%',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
  textAlign: 'center',
});

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);
  const [isValidUser,setIsValidUser]=useState(false)

  const { isAuthenticated } = useSelector(state => state.auth);

  // ✅ Auto logout if accessing /auth while logged in
  useEffect(() => {
    if (location.pathname === '/auth' && isAuthenticated) {
      dispatch(logout());
      localStorage.removeItem('token');
      setShowLogoutMsg(true);
    }
  }, [location.pathname, isAuthenticated, dispatch]);

  const handleCloseSnackbar = () => {
    setShowLogoutMsg(false);
  };

  // ✅ Login handler
  const handleMockLogin = () => {
    const role = username.toLowerCase();
    const validRoles = ['admin', 'teacher', 'student', 'staff'];

    if (!validRoles.includes(role)) {      
      setIsValidUser(true)
      return;
    }

    const mockPayload = {
      name: username || 'John Doe',
      email: `${username}@example.com`,
      userId: '123',
      role,
    };

    const mockToken = jwtEncode(mockPayload, 'secret');

    dispatch(setTokenFromStorage(mockToken));
    dispatch(fetchRolePermissions({ role }));
    localStorage.setItem('token', mockToken);

    navigate('/');
  };

  return (
    <BackgroundContainer>
      <Overlay />
      <LoginCard>
        {/* Top branding section using Box (centered content) */}
        <Box display='flex' flexDirection='column' alignItems='center' mb={3}>
          <Box
            component='img'
            src='fav.jpg'
            width='100px'
            height='100px'
            alt='Brand Logo'
            sx={{ mb: 1 }}
          />
          <Typography
            variant='h4'
            sx={{
              fontWeight: 'bold',
              mt: 2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: '#222',
            }}
          >
            Welcome to SSWConnect
          </Typography>
          <Typography variant='body2' sx={{ mt: 1, color: '#333', textAlign: 'center' }}>
            Access your personalized dashboard to connect, analyze reports, track attendance, view
            events, get admin notifications, and read messages from the principal or directors—all
            in one place.{' '}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Form section */}
        <Box component='form'>
          <Typography
            variant='subtitle1'
            sx={{ fontWeight: 700, color: '#000', textAlign: 'center' }}
          >
            USER LOGIN
          </Typography>

          <TextField
            label='Username'
            variant='outlined'
            fullWidth
            margin='normal'
            value={username}
            onChange={e => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
          />

          <TextField
            label='Password'
            type={showPassword ? 'text' : 'password'}
            variant='outlined'
            fullWidth
            margin='normal'
            value={password}
            onChange={e => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <VpnKeyIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => setShowPassword(!showPassword)}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
          />

          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item>
              <FormControlLabel control={<Checkbox color='primary' />} label='Remember' />
            </Grid>
            <Grid item>
              <Link href='#' variant='body2' color='primary'>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleMockLogin}
            disabled={!username || !password}
            sx={{ fontWeight: 'bold', fontSize: '1rem', borderRadius: '8px', margin: '10px 0px' }}
          >
            Login
          </Button>

          <Typography variant='body2' sx={{ my: 2 }}>
            Don’t have an account?{' '}
            <Link href='#' sx={{ fontWeight: 500 }}>
              Click Here
            </Link>
          </Typography>
        </Box>
      </LoginCard>
      <Snackbar
        open={showLogoutMsg}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity='info' variant='filled' onClose={handleCloseSnackbar}>
          You have been logged out due to navigation.
        </Alert>
      </Snackbar>
      <Button
        variant='contained'
        endIcon={<SendIcon />}
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 3, // Make sure it's above overlay (zIndex: 1)
          backgroundColor: '#3b30c8',
          color: '#fff',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#756ed8',
          },
        }}
      >
        Back to website
      </Button>
      {isValidUser && <UserNotFoundScreen/>}
    </BackgroundContainer>
  );
};

export default AuthForm;
