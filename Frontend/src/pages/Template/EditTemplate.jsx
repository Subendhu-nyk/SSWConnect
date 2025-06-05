import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Grid,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Typography,
  TextField,
  Paper,
  Divider,
  Box,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useDispatch, useSelector } from 'react-redux';
// import { addTemplateThunk } from '../../features/TemplateReducer/templateThunk';
import { editTemplateThunk, getTemplateThunk } from '../../features/TemplateReducer/templateThunk';

const EditTemplate = () => {
  const [fields, setFields] = useState([]);
  const [inputField, setInputField] = useState('');
  const dispatch = useDispatch();

  const templateData = useSelector(state => state.template.getTemplateData);
  const location = useLocation();

  const pathSegments = location.pathname.split('/'); // ['', 'students', 'add-template']
  const userType = pathSegments[1]; // 'students', 'teachers', or 'staff'
  // Logs the current path (e.g., "/dashboard/students")

  useEffect(() => {
    dispatch(getTemplateThunk({ payload: { templateName: `${userType}_template` } }));
  }, [dispatch, userType]);

  useEffect(() => {
    if (templateData?.fields?.length) {
      const initialFieldData = templateData.fields.map(field => ({
        name: field.name,
        selected: false,
        required: field.required,
        isCustom: false,
      }));
      setFields(initialFieldData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateData]);
  const handleAddField = () => {
    const trimmed = inputField.trim();
    if (trimmed && !fields.find(f => f.name === trimmed)) {
      setFields([...fields, { name: trimmed, selected: false, required: false, isCustom: true }]);
      setInputField('');
    }
  };

  const handleCheckboxChange = index => {
    const updated = [...fields];
    updated[index].selected = !updated[index].selected;
    setFields(updated);
  };

  const handleRadioChange = (index, value) => {
    const updated = [...fields];
    updated[index].required = value === 'yes';
    setFields(updated);
  };
  const handleDeleteField = index => {
    const updated = [...fields];
    updated[index].selected = false;
    setFields(updated);
  };

  const downloadExcel = async fields => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`${userType} Template`);

    const headerRow = worksheet.addRow(fields.map(f => f.name));

    headerRow.eachCell((cell, colNumber) => {
      const field = fields[colNumber - 1];
      cell.font = {
        bold: field.required,
        color: field.required ? { argb: 'FFFF0000' } : { argb: 'FF000000' },
      };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `${userType}Template.xlsx`);
  };

  const postTemplate = async fields => {
    const payload = {
      templateName: `${userType}_template`,
      createdBy: 'admin',
      fields: fields.map(f => ({ name: f.name, required: f.required })),
    };

    try {
      await dispatch(editTemplateThunk({ payload }));
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };

  const handleGenerate = async () => {
    const selectedFields = fields.filter(f => f.selected);

    try {
      await downloadExcel(selectedFields);
      await postTemplate(selectedFields);
    } catch (error) {
      console.error('Generation failed:', error);
    }
  };

  return (
    <Grid container spacing={4} padding={4}>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ px: 3, py: 2 }}>
          <Typography variant='h4' gutterBottom>
            Update {userType.charAt(0).toUpperCase() + userType.slice(1)} Template
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ padding: 3 }}>
          <Typography variant='h6' gutterBottom>
            Add Addon Fields
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant='outlined'
                size='small'
                label='Field Name'
                value={inputField}
                onChange={e => setInputField(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button variant='contained' color='primary' onClick={handleAddField}>
                Add +
              </Button>
            </Grid>
          </Grid>

          <Box mt={4}>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                  Fields
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                  Mandatory
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ mb: 1 }} />
            {fields.map(
              (field, index) =>
                !field.selected && (
                  <Grid container key={index} alignItems='center' mt={2}>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={field.selected}
                            onChange={() => handleCheckboxChange(index)}
                          />
                        }
                        label={field.name}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <RadioGroup
                        row
                        value={field.required ? 'yes' : 'no'}
                        onChange={e => handleRadioChange(index, e.target.value)}
                      >
                        <FormControlLabel value='yes' control={<Radio />} label='Yes' />
                        <FormControlLabel value='no' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                )
            )}
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ padding: 3 }}>
          <Typography variant='h6'>Selected Fields</Typography>
          <Divider sx={{ mb: 2 }} />
          {fields
            .filter(f => f.selected)
            .map((field, index) => (
              <Box key={index} display='flex' alignItems='center' justifyContent='space-between'>
                <Typography variant='body1'>
                  {field.name}{' '}
                  {field.required && (
                    <Typography component='span' color='error'>
                      (Mandatory)
                    </Typography>
                  )}
                </Typography>
                <IconButton onClick={() => handleDeleteField(index)}>
                  <DeleteIcon color='error' />
                </IconButton>
              </Box>
            ))}
          <Button
            variant='contained'
            fullWidth
            color='success'
            onClick={handleGenerate}
            sx={{ mt: 2 }}
          >
            Generate Template
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EditTemplate;
