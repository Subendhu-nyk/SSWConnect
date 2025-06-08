const parseExcelDate = (excelDate) => {
  if (typeof excelDate === 'number') {
    const jsDate = new Date((excelDate - 25569) * 86400 * 1000);
    return jsDate.toISOString().split('T')[0];
  }
  return excelDate;
};

const sanitizeExcelRow = (row) => {
  const map = {
    user_id: 'user_id',
    firstName: 'firstName',
    lastName: 'lastName',
    displayName: 'displayName',
    fatherName: 'fatherName',
    fatherMobileNo: 'fatherMobileNo',
    emailId: 'emailId',
    alternateEmailID: 'alternateEmailID',
    dob: 'dob',
    registrationDate: 'registrationDate',
    gender: 'gender',
    phoneNumber: 'phoneNumber',
    password: 'password',
    bloodGroup: 'bloodGroup',
    state: 'state',
    city: 'city',
    pinCode: 'pinCode',
    address: 'address',
    department: 'department',
    roles: 'roles',
    year: 'year',
    section:'section',
    education: 'education',
    joiningDate: 'joiningDate',
    experience: 'experience',
    designation: 'designation',
    isActive: 'isActive',
  };

  const sanitized = {};
  for (const [excelKey, targetKey] of Object.entries(map)) {
    let val = row[excelKey] ?? row[excelKey.trim()] ?? '';
    if (
      (targetKey === 'dob' || targetKey === 'registrationDate') &&
      typeof val === 'number'
    ) {
      val = parseExcelDate(val);
    }
    if (targetKey === 'isActive') {
      val = String(val).toLowerCase() === 'active';
    }
    sanitized[targetKey] = val;
  }
  return sanitized;
};

const sanitizeExcelData = (rawRows) => rawRows.map(sanitizeExcelRow);

module.exports = { sanitizeExcelData };
