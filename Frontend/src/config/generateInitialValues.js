export const generateInitialValues = (config) => {

    // Using reduce to loop through each section in the config array
    // Example: config = [{ sectionName: 'Department Details', fields: [...] }]
    return config.reduce((acc, section) => {
  
      // It will Loop through all fields in the current section
      // Example: section.fields = [{ name: 'departmentType', type: 'multiselect' }, ...]
      section.fields.forEach((field) => {
  
        // It will Check if the field type is multiselect or selectChips
        // Example: field = { name: 'departmentType', type: 'multiselect' }
        if (field.type === 'multiselect' || field.type === 'selectChips') {
          // Then it will initialize this field with an empty array
          // Output: acc['departmentType'] = []
          acc[field.name] = [];
  
        // Checks whethers the field is an autoComplete
        // Example: field = { name: 'campus', type: 'autoComplete' }
        } else if (field.type === 'autoComplete') {
          // Then initialize it with null
          // Output: acc['campus'] = null
          acc[field.name] = null;
  
        // For all other field types (text, email, dropdown, etc.)
        // Example: field = { name: 'departmentName', type: 'text' }
        } else {
          // Initialize with an empty string
          // Output: acc['departmentName'] = ''
          acc[field.name] = '';
        }
      });
  
      // Return the accumulated result object after processing this section
      // After first (and only) section: acc = { departmentType: [], campus: null, departmentName: '' ... }
      return acc;
  
    // Initialize with an empty object, so we build the initial values from scratch
    }, {});
  };
  

    // const initialValues = DepartmentDetailFields.reduce((acc, field) => {
    //   // generating initial values for each field based on its type
    //   if (field.type === 'multiselect' || field.type === 'selectChips') {
    //     acc[field.name] = []; // Set default empty array for multiselect fields
    //   } else if (field.type === 'autoComplete') {
    //     acc[field.name] = null; // Set null for autocomplete fields
    //   } else {
    //     acc[field.name] = ''; // Set empty string for all other fields
    //   }
    //   return acc; // Return accumulated object
    // }, {});