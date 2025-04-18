import * as Yup from 'yup';
// used Yup to define validation rules for each form field and makes things reusable and clean.

// function that takes an array of field configs and returns Yup schema object
const generateValidationSchema = config => {
  return Yup.object().shape(
    // creating the overall validation schema using Yup
    // this ensures each form field follows rules like required, maxLength, valid type etc.
    config.reduce((acc, section) => {
      section.fields.forEach(field => {
        let schema;
        // schema will hold the Yup validation rule for each field
        switch (field.type) {
          case 'email':
            schema = Yup.string().email('Invalid email address');
            // if user types something like "abc" → error: "Invalid email address"
            // valid: abc@domain.com | invalid: abc
            break;

          case 'number':
            schema = Yup.string().matches(/^[0-9]+$/, `${field.name} must be a number`);
            // makes sure user only types numbers
            // valid: 12345 | invalid: abc123 or 12.5
            if (field.maxLength) {
              schema = schema.max(
                field.maxLength,
                `${field.name} must be at most ${field.maxLength} digits`
              );
              // restricts number of digits
              // Example: maxLength = 4 → "2023" , "20235"
            }
            break;

          case 'multiselect':
          case 'selectChips':
            schema = Yup.array().of(
              Yup.object().shape({
                label: Yup.string().required('Label is required'),
                value: Yup.string().required('Value is required'),
              })
            );
            // expects an array of objects like: [{ label: "UG", value: "UG" }]
            //  invalid: null, empty string
            // valid: [{ label: "PG", value: "PG" }]
            break;

          case 'autoComplete':
            schema = Yup.object({
              label: Yup.string().required('Label is required'),
              value: Yup.string().required('Value is required'),
            }).nullable();
            // accepts null initially but if selected, both label and value are required
            // valid: { label: "ECE", value: "ECE" } |  invalid: null or { label: "", value: "ECE" }
            break;

          case 'dropdown':
          case 'select-radio':
            schema = Yup.string();
            // dropdowns just return a string like "active" or "inactive"
            // valid: "active" | invalid: empty string if required is true
            break;

          default:
            schema = Yup.string();
            // for text/textarea fields, validate as string
            if (field.maxLength) {
              schema = schema.max(
                field.maxLength,
                `${field.name} must be at most ${field.maxLength} characters`
              );
              // Example: maxLength = 10 → "abcdef" , "abcdefghijk"
            }
            break;
        }

        if (field.required) {
          schema = schema.required(`${field.name} is required`);
          // apply required only if it's marked true in config
          //  invalid: empty input |  valid: any non-empty input
        }

        acc[field.name] = schema;
        // store this schema using the field name as key
        // e.g., acc['email'] = Yup.string().email().required()
      });
      return acc;
    }, {})
  );
};

export default generateValidationSchema;

// Sample output of validationSchema:
// console.log(generateValidationSchema(fields));
// {
//   email: StringSchema { tests: [ 'email', 'required' ] },
//   establishedYear: StringSchema { tests: [ 'matches', 'max' ] },
//   departmentType: ArraySchema { tests: [ 'required' ] },
//   description: StringSchema { tests: [ 'max' ] },
//   associatedCourses: ArraySchema { tests: [ 'required' ] }
// }
