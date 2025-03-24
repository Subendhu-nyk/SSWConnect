import { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  CircularProgress,
  Typography,
  Box,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  InfoOutlined as InfoOutlinedIcon,
  HomeOutlined as HomeOutlinedIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import HelpIcon from '@mui/icons-material/Help';

const AlertDialog = ({
  open,
  type,
  message,
  onClose, // Handle closing the dialog (e.g., clicking outside or pressing Escape)
  onConfirm, // Handle "OK" button click
  onCancel, // Handle "Cancel" button click
  cancel = true,
}) => {
  const textFieldHandler = () => {
    onConfirm();
  };

  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 25000); // Auto-close after 25 seconds
      return () => clearTimeout(timer);
    }
    return;
  }, [open, onClose]);

  const getIcon = type => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon style={{ color: 'green', marginRight: 8 }} />;
      case 'error':
        return <ErrorIcon style={{ color: 'red', marginRight: 8 }} />;
      case 'warning':
        return <WarningIcon style={{ color: 'orange', marginRight: 8 }} />;
      case 'address':
        return <HomeOutlinedIcon style={{ color: 'orange', marginRight: 8 }} />;
      case 'info':
        return <InfoOutlinedIcon style={{ color: 'blue', marginRight: 8 }} />;
      case 'Confirm':
        return <HelpIcon style={{ color: 'blue', marginRight: 8 }} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth='xs' fullWidth sx={{ zIndex: 105 }}>
      <DialogTitle>
        <Box display='flex' alignItems='center'>
          {getIcon(type)}
          <Typography variant='h6' style={{ marginLeft: 8 }}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Typography>
          <IconButton
            edge='end'
            color='inherit'
            onClick={cancel ? onCancel : onClose}
            aria-label='close'
            style={{ marginLeft: 'auto' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box display='flex' alignItems='center'>
          {type === 'address' && <CircularProgress size={24} style={{ marginRight: 8 }} />}
          <Typography variant='body1'>{message}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        {cancel && (
          <Button onClick={onCancel} color='primary' variant='outlined'>
            Cancel
          </Button>
        )}
        <Button onClick={textFieldHandler} color='primary' variant='contained'>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info', 'address']).isRequired,
  onClose: PropTypes.func.isRequired,
  cancel: PropTypes.bool,
  onCancel: PropTypes.func, 
};

export default AlertDialog;
