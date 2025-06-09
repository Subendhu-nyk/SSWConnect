import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Typography, Paper, Divider, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
// import { addTemplateThunk } from '../../features/TemplateReducer/templateThunk';
import {
  deleteTemplateThunk,
  getTemplateThunk,
} from '../../features/TemplateReducer/templateThunk';
import useAlertDialog from '../../hooks/useAlertDialog';

function toTitleCaseFromSnakeCase(str) {
  if (!str || typeof str !== 'string') return ''; // Safe fallback
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

const DeleteTemplate = () => {
  const dispatch = useDispatch();
  const templateData = useSelector(state => state.template.getTemplateData);
  const location = useLocation();
  const { AlertDialogComponent, openDialog, closeDialog } = useAlertDialog();
  const pathSegments = location.pathname.split('/'); // ['', 'students', 'add-template']
  const userType = pathSegments[1]; // 'students', 'teachers', or 'staff'

  useEffect(() => {
    dispatch(getTemplateThunk({ payload: { templateName: `${userType}_template` } }));
  }, [dispatch, userType]);

  const handleDeleteTemplate = () => {
    openDialog({
      type: 'warning',
      message: `Are you sure you want to delete ${userType} template`,
      onConfirm: () => {
        deleteTemplate();
        closeDialog();
      },
      onCancel: () => {
        closeDialog();
      },
      textFieldRequired: false,
    });
  };

  const deleteTemplate = async () => {
    await dispatch(deleteTemplateThunk({ payload: { templateName: `${userType}_template` } }));
  };

  return (
    <Grid container spacing={4} padding={4}>
      <AlertDialogComponent />
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ px: 3, py: 2 }}>
          <Typography variant='h4' gutterBottom>
            Delete {userType.charAt(0).toUpperCase() + userType.slice(1)} Template
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ padding: 3 }}>
          <Typography variant='h6' gutterBottom>
            Delete Template
          </Typography>

          <Grid item xs={12} md={12}>
            <Divider sx={{ mb: 2 }} />
            <Box display='flex' alignItems='center' justifyContent='space-between'>
              {templateData?.templateName ? (
                <>
                  <Typography variant='body1'>
                    <Typography component='span'>
                      {toTitleCaseFromSnakeCase(templateData.templateName)}
                    </Typography>
                  </Typography>
                  <IconButton onClick={handleDeleteTemplate}>
                    <DeleteIcon color='error' />
                  </IconButton>
                </>
              ) : (
                <Typography variant='body1'>
                  <Typography component='span'>No template found</Typography>
                </Typography>
              )}
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DeleteTemplate;
