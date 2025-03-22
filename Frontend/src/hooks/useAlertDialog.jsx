import { useState } from 'react';
import AlertDialog from '../common/AlertDilog/AlertDialog';

const useAlertDialog = () => {
  const [dialogConfig, setDialogConfig] = useState({
    open: false,
    type: 'info', // Default type
    message: '',    
    onConfirm: () => {},
    onCancel: () => {},   
    cancel: true,
  });

  const openDialog = ({
    type,
    message,    
    onConfirm,
    onCancel,
    cancel = true,
  }) => {
    setDialogConfig(prev => ({
      ...prev,
      open: true,
      type,
      message,       
      cancel,
      onConfirm: onConfirm || (() => {}),
      onCancel: onCancel || (() => setDialogConfig(prev => ({ ...prev, open: false }))),
    }));
  };

  const closeDialog = () => {
    setDialogConfig(prev => ({ ...prev, open: false }));
  };


  // Return the AlertDialog component and the openDialog function
  const AlertDialogComponent = () => (
    <AlertDialog
      open={dialogConfig.open}
      type={dialogConfig.type}
      message={dialogConfig.message}
      onClose={closeDialog} // Handle closing the dialog (e.g., clicking outside or pressing Escape)
      onConfirm={dialogConfig.onConfirm} // Handle "OK" button click
      onCancel={dialogConfig.onCancel} // Handle "Cancel" button click      
      cancel={dialogConfig.cancel}
    />
  );

  return {
    AlertDialogComponent, // This renders AlertDialog component
    openDialog, // Function to open the dialog
    closeDialog, // Function to close the dialog
    dialogConfig,
  };
};

export default useAlertDialog;
