import { useCallback } from 'react';
import { useTheme } from '@mui/material/styles';

import { show, showPromise } from '../services/showToastify';

const useToast = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  // Function to show a normal toast
  const showToast = useCallback(
    (type, message, options = {}) => {
      document.body.setAttribute('data-theme', mode);
      show(type, message, { theme: mode, ...options });
    },
    [mode]
  );

  // Function to show a promise-based toast
  const showPromiseToast = useCallback(
    (promise, messages, options = {}) => {
      document.body.setAttribute('data-theme', mode);
      return showPromise(promise, messages, { theme: mode, ...options });
    },
    [mode]
  );

  return { showToast, showPromiseToast };
};

export default useToast;
