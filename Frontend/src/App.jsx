import { ThemeProvider } from '@mui/material';
import MainRouter from './routes/Router';
import theme from './styles/theme';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';

const App = () => {
  const isDarkMode = useSelector(state => state.theme.darkMode);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme(isDarkMode)}>
          <MainRouter />
          <h1>Welcome to SSWConnect</h1>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
