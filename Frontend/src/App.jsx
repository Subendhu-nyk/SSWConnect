import { ThemeProvider } from '@mui/material';
import MainRouter from './routes/Router';
import theme from './styles/theme';
import { useSelector } from 'react-redux';

const App = () => {
  const isDarkMode = useSelector(state => state.theme.darkMode);
  return (
    <ThemeProvider theme={theme(isDarkMode)}>
      <MainRouter />
      <h1>Welcome to SSWConnect</h1>
    </ThemeProvider>
  );
};

export default App;
