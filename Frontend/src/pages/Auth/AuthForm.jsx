import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';

import { authenticateUserThunk } from '../../features/AuthReducer/authThunk';
import useToast from '../../hooks/useToast';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

import backgroundImage from '/cse3.jpg';

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
  const { showToast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { loading } = useSelector(state => state.auth);

  const handleLogin = async () => {
    const loginPayload = {
      password,
    };

    if (username.includes('@')) {
      loginPayload.emailId = username;
    } else {
      loginPayload.user_id = username;
    }

    try {
      await dispatch(authenticateUserThunk({ payload: loginPayload })).unwrap();
      navigate('/'); // Let router handle role-based redirect
    } catch (err) {
      showToast('error', `${err} Please try again.`);
      navigate('/auth');
    }
  };

  return (
    <BackgroundContainer>
      <Overlay />
      {loading.login && <LoadingComponent />}
      <LoginCard>
        <Box display='flex' flexDirection='column' alignItems='center' mb={3}>
          <Box
            component='img'
            src='fav.jpg'
            width='100px'
            height='100px'
            alt='Brand Logo'
            sx={{ mb: 1 }}
          />
          <Typography variant='h4' sx={{ fontWeight: 'bold', mt: 2, color: '#222' }}>
            Welcome to SSWConnect
          </Typography>
          <Typography variant='body2' sx={{ mt: 1, color: '#333', textAlign: 'center' }}>
            Access your personalized dashboard to connect, analyze reports, track attendance, view
            events, and more.
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box component='form'>
          <Typography variant='subtitle1' sx={{ fontWeight: 700, textAlign: 'center' }}>
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
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
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
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
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
            onClick={handleLogin}
            disabled={!username || !password || loading.login}
            sx={{ fontWeight: 'bold', fontSize: '1rem', borderRadius: '8px', my: 2 }}
          >
            {loading.login ? 'Logging in...' : 'Login'}
          </Button>

          <Typography variant='body2'>
            Don’t have an account?{' '}
            <Link href='#' sx={{ fontWeight: 500 }}>
              Click Here
            </Link>
          </Typography>
        </Box>
      </LoginCard>

      <Button
        variant='contained'
        endIcon={<SendIcon />}
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 3,
          backgroundColor: '#3b30c8',
          color: '#fff',
          fontWeight: 'bold',
          '&:hover': { backgroundColor: '#756ed8' },
        }}
      >
        Back to website
      </Button>
    </BackgroundContainer>
  );
};

export default AuthForm;
