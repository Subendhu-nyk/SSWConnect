import * as XLSX from 'xlsx';

const rolePayloadMap = {
  Admin: ['department', 'date', 'year', 'section'],
  Teacher: ['department', 'subject', 'section', 'date'],
  Student: ['studentId', 'department', 'year', 'section'],
};

export const capitalizeWords = sentence =>
  sentence
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

/**
 * Parses Excel file and uploads data to backend via a given handler.
 * @param {File} file - Excel file to process.
 * @param {Function} uploader - Function to handle POST (e.g., a thunk or axios.post wrapper).
 * @param {Function} onSuccess - Callback on success.
 * @param {Function} onError - Callback on error.
 */
export const handleExcelUpload = async (file, uploader, onSuccess, onError) => {
  try {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

    const response = await uploader(jsonData); // uploader handles dispatch or axios call

    if (response?.status === 200 || response?.payload?.status === 200) {
      onSuccess(response?.data || response?.payload?.data);
    } else {
      onError(new Error('Upload failed.'));
    }
  } catch (error) {
    onError(error);
  }
};

export const buildPayloadByRole = (role, values) => {
  const keys = rolePayloadMap[role] || [];
  // Pick only the allowed keys
  const payload = keys.reduce((obj, key) => {
    if (values[key] !== undefined) obj[key] = values[key];
    return obj;
  }, {});

  payload.role = role;
  return payload;
};
