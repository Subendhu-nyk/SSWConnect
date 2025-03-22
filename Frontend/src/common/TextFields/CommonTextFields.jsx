// Import React's useState hook to manage local state (e.g., focus state of the input)
import { useState } from 'react';

// Import rsuite's CSS for styling the DatePicker and DateRangePicker components
import 'rsuite/dist/rsuite.min.css';

// Import useSelector from react-redux to access the global state (e.g., dark mode theme)
import { useSelector } from 'react-redux';

// Import Material-UI components for building the form UI
import {
  FormControl, // Used to wrap form inputs and manage their layout and error states
  Input, // Used for textarea input
  Select, // Used for dropdown menus
  MenuItem, // Used for individual options in a dropdown
  Checkbox, // Used for checkbox inputs
  FormControlLabel, // Used to pair a label with a checkbox or switch
  Switch, // Used for toggle switches
  CircularProgress, // Used to show a loading spinner
  TextField, // Used for text, email, and search inputs
  RadioGroup, // Used for radio button groups
  Radio, // Used for individual radio buttons
  Typography, // Used for rendering text (e.g., labels, errors)
  InputAdornment, // Used to add icons (e.g., clear icon) to the end of inputs
  Tooltip, // Used to show tooltips on hover
} from '@mui/material';

// Import Autocomplete component from Material-UI for autocomplete dropdowns
import Autocomplete from '@mui/material/Autocomplete';

// Import ClearIcon from Material-UI icons to show a clear button in the search field
import ClearIcon from '@mui/icons-material/Clear';

// Import Field from Formik to connect form inputs to Formik's state management
import { Field } from 'formik';

// Import DateRangePicker, CustomProvider, and DatePicker from rsuite for date selection
import { DateRangePicker, CustomProvider, DatePicker } from 'rsuite';

// Define the CommonTextFields component with props for customization
const CommonTextFields = ({
  type, // Determines the type of input (e.g., text, dropdown, date)
  name, // The name of the field, used by Formik to track its value
  label, // The label to display above the field
  options = [], // Array of options for dropdowns, autocomplete, etc. (e.g., [{ label: 'Option 1', value: 'opt1' }])
  placeholder = '', // Placeholder text for the input
  required = false, // Boolean to mark the field as required (shows a red asterisk)
  disabled = false, // Boolean to disable the input
  isLoading = false, // Boolean to show a loading spinner (e.g., while fetching options)
  onChange, // Callback function triggered when the field value changes
  onSearch, // Callback function for autocomplete search input
  onFocus, // Callback function triggered when the field is focused
  onBlur, // Callback function triggered when the field loses focus
  tooltipMessage = '', // Tooltip message to show on hover (for autocomplete)
  maxLength, // Maximum length for text/number inputs
  showCheckbox = false, // Boolean to show checkboxes in multi-select options
  limitTags = 3, // Limits the number of visible tags in multi-select chips
  layout = 'vertical', // Layout for radio groups (vertical or horizontal)
}) => {
  // Use useState to track whether the input is focused (for showing character count)
  const [isFocused, setIsFocused] = useState(false);

  // Use useSelector to get the darkMode value from Redux state to apply theme
  const isDarkMode = useSelector(state => state.theme.darkMode);

  // Define predefined date ranges for the DateRangePicker (e.g., "This Week", "Last Month")
  const PredefinedRanges = [
    // "This Week": From the start of the current week to today
    { label: 'This Week', value: [new Date(new Date().setDate(new Date().getDate() - new Date().getDay())), new Date()] },
    // "Last Week": From the start of last week to the end of last week
    { label: 'Last Week', value: [new Date(new Date().setDate(new Date().getDate() - new Date().getDay() - 7)), new Date(new Date().setDate(new Date().getDate() - new Date().getDay() - 1))] },
    // "This Month": From the start of the current month to today
    { label: 'This Month', value: [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()] },
    // "Last Month": From the start of last month to the end of last month
    { label: 'Last Month', value: [new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), new Date(new Date().getFullYear(), new Date().getMonth(), 0)] },
    // "This Year": From the start of the current year to today
    { label: 'This Year', value: [new Date(new Date().getFullYear(), 0, 1), new Date()] },
  ];

  // Helper function to render the label with a red asterisk if the field is required
  const isRequired = (label, required) => (
    label && ( // Only render if a label is provided
      <Typography variant="body1" color="text.primary">
        {label} {/* Display the label text */}
        {required && <span style={{ color: 'red', marginLeft: '5px' }}>*</span>} {/* Add a red asterisk if required */}
      </Typography>
    )
  );

  // Helper function to render an error message if the field has been touched and has an error
  // const isError = meta => (
  //   meta.touched && meta.error && ( // Only show if the field is touched and has an error
  //     <Typography variant="caption" color="error" sx={{ display: 'flex', ml: 2, mt: 0.5 }}>
  //       {meta.error} {/* Display the error message */}
  //     </Typography>
  //   )
  // );

  // Function to render the appropriate field based on the type prop
  const renderField = () => {
    // Use a switch statement to handle different field types
    switch (type) {
      // Case for text and number inputs
      case 'text':
      case 'number':
        return (
          // Use Formik's Field component to connect this input to Formik's state
          <Field name={name}>
            {({ field, form, meta }) => ( // Destructure field, form, and meta from Formik
              // FormControl wraps the input for layout and error handling
              <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
                {isRequired(label, required)} {/* Render the label with a required asterisk if needed */}
                {/* TextField is the input component for text/number */}
                <TextField
                  {...field} // Spread Formik's field props (value, onChange, etc.)
                  variant="outlined" // Use outlined style for the input
                  type={type === 'number' ? 'text' : type} // Use 'text' for number to avoid spinners
                  inputProps={type === 'number' ? { inputMode: 'numeric', pattern: '[0-9]*' } : {}} // Ensure numeric input for number type
                  placeholder={placeholder} // Set the placeholder text
                  disabled={disabled} // Disable the input if disabled prop is true
                  onFocus={e => { // Handle focus event
                    setIsFocused(true); // Set focus state to true to show character count
                    if (onFocus) onFocus(e); // Call the onFocus callback if provided
                  }}
                  onBlur={e => { // Handle blur event
                    form.handleBlur(field.name); // Notify Formik that the field lost focus
                    setIsFocused(false); // Reset focus state
                    if (onBlur) onBlur(e); // Call the onBlur callback if provided
                  }}
                  onChange={e => { // Handle value changes
                    let newValue = e.target.value; // Get the new value
                    if (type === 'number') newValue = newValue.replace(/[^0-9]/g, ''); // Remove non-digits for number type
                    if (maxLength && newValue.length > maxLength) newValue = newValue.substring(0, maxLength); // Enforce maxLength
                    form.setFieldValue(field.name, newValue); // Update Formik's state
                    if (onChange) onChange(newValue); // Call the onChange callback if provided
                  }}
                  error={meta.touched && Boolean(meta.error)} // Show error styling if touched and has error
                  helperText={ // Show helper text (error or character count)
                    meta.touched && meta.error ? meta.error : // Show error if present
                    isFocused && maxLength ? `${field.value?.length || 0}/${maxLength}` : null // Show character count if focused
                  }
                  size="small" // Use small size for the input
                  sx={{ // Custom styles for the input
                    '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': { display: 'none' }, // Hide number spinners in Webkit browsers
                    '& input[type=number]': { MozAppearance: 'textfield' }, // Hide number spinners in Firefox
                    '& .MuiOutlinedInput-input': { backgroundColor: isDarkMode ? '#1a1d24' : '#fff' }, // Adjust background based on theme
                  }}
                />
                {/* {isError(meta)} Render error message if applicable */}
              </FormControl>
            )}
          </Field>
        );

      // Case for email input
      case 'email':
        return (
          // Use Field to connect to Formik and add custom validation
          <Field
            name={name}
            validate={value => { // Custom validation for email
              if (!value && required) return 'Required'; // Check if required and empty
              if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return 'Invalid email address'; // Validate email format
            }}
          >
            {({ field, meta }) => (
              <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
                {isRequired(label, required)} {/* Render the label */}
                <TextField
                  {...field} // Spread Formik's field props
                  variant="outlined" // Use outlined style
                  type="email" // Set input type to email
                  placeholder={placeholder} // Set placeholder text
                  disabled={disabled} // Disable if needed
                  onFocus={onFocus} // Call onFocus callback
                  onBlur={onBlur} // Call onBlur callback
                  onChange={e => { // Handle value changes
                    field.onChange(e); // Update Formik's state
                    if (onChange) onChange(e.target.value); // Call onChange callback
                  }}
                  error={meta.touched && Boolean(meta.error)} // Show error styling
                  helperText={meta.touched && meta.error} // Show error message
                  size="small" // Use small size
                  sx={{ '& .MuiOutlinedInput-input': { backgroundColor: isDarkMode ? '#1a1d24' : '#fff' } }} // Adjust background for theme
                />
                {/* {isError(meta)} Render error message */}
              </FormControl>
            )}
          </Field>
        );

      // Case for dropdown (single-select)
      case 'dropdown':
        return (
          <Field name={name}>
            {({ field, form, meta }) => (
              <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
                {isRequired(label, required)} {/* Render the label */}
                <Select
                  {...field} // Spread Formik's field props
                  value={field.value || ''} // Ensure a default value
                  onChange={e => { // Handle value changes
                    form.setFieldValue(field.name, e.target.value); // Update Formik's state
                    if (onChange) onChange(e.target.value); // Call onChange callback
                  }}
                  onFocus={onFocus} // Call onFocus callback
                  onBlur={onBlur} // Call onBlur callback
                  disabled={disabled || isLoading} // Disable if needed or loading
                  displayEmpty // Allow an empty option
                  size="small" // Use small size
                >
                  <MenuItem value=""><em>{placeholder || 'Select an option'}</em></MenuItem> {/* Placeholder option */}
                  {options.map((option, idx) => ( // Map through options to create dropdown items
                    <MenuItem key={idx} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
                {/* {isError(meta)} Render error message */}
                {isLoading && <CircularProgress size={20} sx={{ position: 'absolute', right: 25, top: '50%' }} />} {/* Show loader if loading */}
              </FormControl>
            )}
          </Field>
        );

      // Case for autocomplete (single-select with search)
      case 'autocomplete':
        return (
          <Field name={name}>
            {({ field, form, meta }) => (
              <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
                {isRequired(label, required)} {/* Render the label */}
                <Tooltip title={disabled && tooltipMessage ? tooltipMessage : ''}> {/* Show tooltip if disabled and message provided */}
                  <Autocomplete
                    size="small" // Use small size
                    options={options || []} // Set options for autocomplete
                    autoHighlight // Highlight the first option automatically
                    loading={isLoading} // Show loading state
                    disabled={disabled || isLoading} // Disable if needed or loading
                    isOptionEqualToValue={(option, value) => option.value === value.value} // Compare options by value
                    onChange={(_, newValue) => { // Handle value changes
                      form.setFieldValue(field.name, newValue); // Update Formik's state
                      if (onChange) onChange(newValue?.value); // Call onChange callback
                    }}
                    onInputChange={(_, value) => onSearch && onSearch(value)} // Handle search input changes
                    onFocus={onFocus} // Call onFocus callback
                    onBlur={onBlur} // Call onBlur callback
                    sx={{ '& .MuiOutlinedInput-root': { backgroundColor: isDarkMode ? '#1a1d24' : '#fff' } }} // Adjust background for theme
                    noOptionsText={isLoading ? 'Loading...' : 'No Options'} // Text to show when no options are available
                    value={ // Set the current value
                      options && field.value && typeof field.value === 'object' && 'value' in field.value
                        ? field.value
                        : options.find(option => option.value === field.value?.value) || null
                    }
                    renderOption={(props, option) => ( // Render each option
                      <li {...props} style={{ color: isDarkMode ? 'white' : '#1d1d1d' }}>
                        {option.label}
                      </li>
                    )}
                    renderInput={params => ( // Render the input field
                      <TextField
                        {...params}
                        placeholder={placeholder} // Set placeholder
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: ( // Add a loader to the end of the input
                            <>
                              {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                </Tooltip>
                {/* {isError(meta)} Render error message */}
              </FormControl>
            )}
          </Field>
        );

      // Case for multi-select with chips (selectChips and multiselect are the same)
      case 'selectChips':
      case 'multiselect':
        return (
          <Field name={name}>
            {({ field, form, meta }) => (
              <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
                {isRequired(label, required)} {/* Render the label */}
                <Autocomplete
                  size="small" // Use small size
                  multiple // Enable multi-select
                  limitTags={limitTags} // Limit the number of visible tags
                  options={options} // Set options
                  disabled={disabled || isLoading} // Disable if needed or loading
                  getOptionLabel={option => option.label} // Display the label of each option
                  value={field.value || []} // Set the current value (array for multi-select)
                  isOptionEqualToValue={(option, value) => option.value === value.value} // Compare options by value
                  onChange={(_, newValue) => { // Handle value changes
                    form.setFieldValue(field.name, newValue); // Update Formik's state
                    if (onChange) onChange(newValue); // Call onChange callback
                  }}
                  onFocus={onFocus} // Call onFocus callback
                  onBlur={onBlur} // Call onBlur callback
                  sx={{ '& .MuiOutlinedInput-root': { backgroundColor: isDarkMode ? '#1a1d24' : '#fff' } }} // Adjust background for theme
                  renderOption={(props, option, { selected }) => ( // Render each option
                    <li {...props} style={{ color: isDarkMode ? 'white' : '#1d1d1d' }}>
                      {showCheckbox && <Checkbox checked={selected} style={{ color: isDarkMode ? 'white' : '#1d1d1d' }} />} {/* Show checkbox if enabled */}
                      {option.label}
                    </li>
                  )}
                  renderInput={params => ( // Render the input field
                    <TextField
                      {...params}
                      placeholder={placeholder} // Set placeholder
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: ( // Add a loader to the end of the input
                          <>
                            {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
                {/* {isError(meta)} Render error message */}
              </FormControl>
            )}
          </Field>
        );

      // Case for search input
      case 'search':
        return (
          <Field name={name}>
            {({ field, form, meta }) => (
              <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
                {isRequired(label, required)} {/* Render the label */}
                <TextField
                  {...field} // Spread Formik's field props
                  value={field.value || ''} // Ensure a default value
                  onChange={e => { // Handle value changes
                    form.setFieldValue(field.name, e.target.value); // Update Formik's state
                    if (onChange) onChange(e.target.value); // Call onChange callback
                  }}
                  onFocus={onFocus} // Call onFocus callback
                  onBlur={onBlur} // Call onBlur callback
                  disabled={disabled} // Disable if needed
                  placeholder={placeholder || 'Search...'} // Set placeholder
                  variant="outlined" // Use outlined style
                  size="small" // Use small size
                  InputProps={{ // Add a clear icon to the end of the input
                    endAdornment: field.value && (
                      <InputAdornment position="end">
                        <ClearIcon onClick={() => form.setFieldValue(field.name, '')} style={{ cursor: 'pointer' }} /> {/* Clear the input */}
                      </InputAdornment>
                    ),
                  }}
                />
                {/* {isError(meta)} Render error message */}
              </FormControl>
            )}
          </Field>
        );

      // Case for textarea input
      case 'textarea':
        return (
          <Field name={name}>
            {({ field, form, meta }) => (
              <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
                {isRequired(label, required)} {/* Render the label */}
                <Input
                  {...field} // Spread Formik's field props
                  placeholder={placeholder} // Set placeholder
                  multiline // Enable multi-line input
                  rows={4} // Set the number of rows
                  disabled={disabled} // Disable if needed
                  onFocus={onFocus} // Call onFocus callback
                  onBlur={onBlur} // Call onBlur callback
                  onChange={e => { // Handle value changes
                    form.setFieldValue(field.name, e.target.value); // Update Formik's state
                    if (onChange) onChange(e.target.value); // Call onChange callback
                  }}
                  sx={{ // Custom styles for the textarea
                    border: '1px solid gray',
                    padding: 1,
                    borderRadius: '8px',
                    backgroundColor: isDarkMode ? '#1a1d24' : '#fff', // Adjust background for theme
                  }}
                />
                {/* {isError(meta)} Render error message */}
              </FormControl>
            )}
          </Field>
        );

      // Case for switch (toggle)
      case 'switch':
        return (
          <Field name={name}>
            {({ field, form, meta }) => (
              <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
                {isRequired(label, required)} {/* Render the label */}
                <FormControlLabel
                  control={ // The switch component
                    <Switch
                      {...field} // Spread Formik's field props
                      checked={field.value || false} // Ensure a default value
                      onChange={e => { // Handle value changes
                        form.setFieldValue(field.name, e.target.checked); // Update Formik's state
                        if (onChange) onChange(e.target.checked); // Call onChange callback
                      }}
                      onFocus={onFocus} // Call onFocus callback
                      onBlur={onBlur} // Call onBlur callback
                      disabled={disabled} // Disable if needed
                      sx={{ // Custom styles for the switch
                        '& .MuiSwitch-thumb': { backgroundColor: 'white' },
                        '& .MuiSwitch-track': { backgroundColor: '#555' },
                      }}
                    />
                  }
                  label={<Typography>{label}</Typography>} // Label for the switch
                />
                {/* {isError(meta)} Render error message */}
              </FormControl>
            )}
          </Field>
        );

      // Case for checkbox
      case 'checkbox':
        return (
          <Field name={name}>
            {({ field, form, meta }) => (
              <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
                {isRequired(label, required)} {/* Render the label */}
                <FormControlLabel
                  control={ // The checkbox component
                    <Checkbox
                      {...field} // Spread Formik's field props
                      checked={field.value || false} // Ensure a default value
                      onChange={e => { // Handle value changes
                        form.setFieldValue(field.name, e.target.checked); // Update Formik's state
                        if (onChange) onChange(e.target.checked); // Call onChange callback
                      }}
                      onFocus={onFocus} // Call onFocus callback
                      onBlur={onBlur} // Call onBlur callback
                      disabled={disabled} // Disable if needed
                    />
                  }
                  label={<Typography>{label}</Typography>} // Label for the checkbox
                />
                {/* {isError(meta)} Render error message */}
              </FormControl>
            )}
          </Field>
        );

      // Case for radio group
      case 'select-radio':
        return (
          <Field name={name}>
            {({ field, form, meta }) => (
              <FormControl component="fieldset" fullWidth error={meta.touched && Boolean(meta.error)}>
                {isRequired(label, required)} {/* Render the label */}
                <RadioGroup
                  {...field} // Spread Formik's field props
                  value={field.value || ''} // Ensure a default value
                  onChange={e => { // Handle value changes
                    form.setFieldValue(field.name, e.target.value); // Update Formik's state
                    if (onChange) onChange(e.target.value); // Call onChange callback
                  }}
                  onFocus={onFocus} // Call onFocus callback
                  onBlur={onBlur} // Call onBlur callback
                  sx={{ flexDirection: layout }} // Set layout (vertical or horizontal)
                >
                  {options.map((option, idx) => ( // Map through options to create radio buttons
                    <FormControlLabel
                      key={idx}
                      value={option.value}
                      control={<Radio />}
                      label={<Typography>{option.label}</Typography>}
                      disabled={disabled} // Disable if needed
                    />
                  ))}
                </RadioGroup>
                {/* {isError(meta)} Render error message */}
              </FormControl>
            )}
          </Field>
        );

      // Case for date range picker
      case 'date_picker':
        return (
          <Field name={name}>
            {({ field, form, meta }) => (
              <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
                {isRequired(label, required)} {/* Render the label */}
                <CustomProvider theme={isDarkMode ? 'dark' : 'light'}> {/* Apply theme to rsuite components */}
                  <DateRangePicker
                    value={field.value} // Set the current value
                    onChange={range => { // Handle value changes
                      form.setFieldValue(field.name, range); // Update Formik's state
                      if (onChange) onChange(range); // Call onChange callback
                    }}
                    onFocus={onFocus} // Call onFocus callback
                    onBlur={onBlur} // Call onBlur callback
                    disabled={disabled} // Disable if needed
                    shouldDisableDate={date => date > new Date()} // Disable future dates
                    format="dd MMM yyyy" // Set date format
                    ranges={PredefinedRanges} // Use predefined ranges
                    placeholder={placeholder} // Set placeholder
                    block // Make it full-width
                    placement="auto" // Automatically position the picker
                  />
                </CustomProvider>
                {/* {isError(meta)} Render error message */}
              </FormControl>
            )}
          </Field>
        );

      // Case for single date picker
      case 'date':
        return (
          <Field name={name}>
            {({ field, form, meta }) => (
              <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
                {isRequired(label, required)} {/* Render the label */}
                <CustomProvider theme={isDarkMode ? 'dark' : 'light'}> {/* Apply theme to rsuite components */}
                  <DatePicker
                    value={field.value} // Set the current value
                    onChange={date => { // Handle value changes
                      form.setFieldValue(field.name, date); // Update Formik's state
                      if (onChange) onChange(date); // Call onChange callback
                    }}
                    onFocus={onFocus} // Call onFocus callback
                    onBlur={onBlur} // Call onBlur callback
                    disabled={disabled} // Disable if needed
                    format="dd MMM yyyy" // Set date format
                    placeholder={placeholder} // Set placeholder
                    shouldDisableDate={date => date > new Date()} // Disable future dates
                    block // Make it full-width
                    placement="auto" // Automatically position the picker
                  />
                </CustomProvider>
                {/* {isError(meta)} Render error message */}
              </FormControl>
            )}
          </Field>
        );

      // Case for file attachment
      case 'attachment':
        return (
          <Field name={name}>
            {({ field, form, meta }) => (
              <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
                {isRequired(label, required)} {/* Render the label */}
                <input
                  type="file" // File input for attachments
                  accept="application/pdf" // Only accept PDF files
                  onChange={e => { // Handle file selection
                    const file = e.target.files[0]; // Get the selected file
                    form.setFieldValue(field.name, file); // Update Formik's state
                    if (onChange) onChange(file); // Call onChange callback
                  }}
                  onFocus={onFocus} // Call onFocus callback
                  onBlur={onBlur} // Call onBlur callback
                  disabled={disabled} // Disable if needed
                  style={{ padding: '8px', width: '100%' }} // Basic styling
                />
                {field.value && <Typography variant="caption">{field.value.name}</Typography>} {/* Show the selected file name */}
                {/* {isError(meta)} Render error message */}
              </FormControl>
            )}
          </Field>
        );

      // Default case if the type is not recognized
      default:
        return null; // Return null to render nothing
    }
  };

  // Return the rendered field
  return renderField();
};

// Export the component for use in other files
export default CommonTextFields;