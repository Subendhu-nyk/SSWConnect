import { ThemeProvider } from '@mui/material';
import MainRouter from './routes/Router';
import theme from './styles/theme';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react.js';
import { store, persistor } from './store/store.js';

const Config = () => {
  // const environment = window.location.hostname;
  // const [isServerDown, setIsServerDown] = useState(false);
  // const [isInValiduser, setIsInvalidUser] = useState(false);

  const isDarkMode = useSelector(state => state.theme.darkMode);

  // const userDataa = useSelector(state => state.userManagement);

  // Handle user logout due to inactivity

  return (
    <ThemeProvider theme={theme(isDarkMode)}>
      {/* {logoutUserWarning && <LogoutWarningScreen />} */}
      {/* {isServerDown && environment !== 'localhost' && (
        <ApplicationDownScreen isServerDown={isServerDown} onRetry={handleRetry} />
      )} */}
      {/* {isInValiduser && environment !== 'localhost' && <UserNotFoundScreen />} */}
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      {/* Provide the store to the entire app */}
      <PersistGate loading={null} persistor={persistor}>
        <Config />
      </PersistGate>
    </Provider>
  );
};

export default App;
