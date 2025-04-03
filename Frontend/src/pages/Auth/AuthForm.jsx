import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setTokenFromStorage } from '../../features/AuthReducer/authSlice';
import { fetchRolePermissions } from '../../features/AuthReducer/authThunk';
import jwtEncode from 'jwt-encode';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);

  const { isAuthenticated } = useSelector(state => state.auth);

  // ✅ Auto logout if accessing /auth while logged in
  useEffect(() => {
    if (location.pathname === '/auth' && isAuthenticated) {
      dispatch(logout());
      localStorage.removeItem('token');
      setShowLogoutMsg(true);
    }
  }, [location.pathname, isAuthenticated, dispatch]);

  // ✅ Close snackbar
  const handleCloseSnackbar = () => {
    setShowLogoutMsg(false);
  };

  // ✅ Login handler
  const handleMockLogin = () => {
    const role = username.toLowerCase();
    const validRoles = ['admin', 'teacher', 'student', 'staff'];

    if (!validRoles.includes(role)) {
      alert('🚫 User not found. Please enter a valid username (admin, teacher, student, staff)');
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
    <Container maxWidth='xs'>
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant='h5' align='center' gutterBottom>
          Login
        </Typography>
        <Box display='flex' flexDirection='column' gap={2}>
          <TextField
            label='Username'
            fullWidth
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            label='Password'
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleMockLogin}
            disabled={!username || !password}
          >
            Login
          </Button>
        </Box>
      </Paper>

      {/* ✅ Snackbar on auto-logout */}
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
    </Container>
  );
};

export default AuthForm;
