import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomToast from '../components/Toast/CustomToast';

const defaultToastOptions = {
  position: 'top-center',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  icon: false,
  closeButton: false,
};

// Function to show a normal toast
export const show = (type, message, options = {}) => {
  const config = { ...defaultToastOptions, ...options, className: 'custom-toast' };
  const content = CustomToast({ type, message, theme: options.theme });

  switch (type) {
    case 'success':
      toast.success(content, config);
      break;
    case 'error':
      toast.error(content, config);
      break;
    case 'info':
      toast.info(content, config);
      break;
    case 'warning':
      toast.warning(content, config);
      break;
    case 'process':
      toast.warning(content, config);
      break;
    default:
      toast(content, config);
  }
};

// Function to show a promise-based toast
export const showPromise = (promise, messages, options = {}) => {
  const config = { ...defaultToastOptions, ...options };
  return toast.promise(
    promise,
    {
      pending: {
        render: () =>
          CustomToast({
            type: 'info',
            message: messages.pending || 'Processing...',
            theme: options.theme,
          }),
      },
      success: {
        render: () =>
          CustomToast({
            type: 'success',
            message: messages.success || 'Operation successful!',
            theme: options.theme,
          }),
      },
      error: {
        render: () =>
          CustomToast({
            type: 'error',
            message: messages.error || 'Something went wrong!',
            theme: options.theme,
          }),
      },
    },
    config
  );
};
