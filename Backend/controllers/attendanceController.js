const { Attendance, User } = require('../models');
const { Op, fn, col, literal } = require('sequelize');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

// CREATE attendance
exports.createAttendance = async (req, res) => {
  try {
    const data = req.body;

    // Case 1: Handle bulk array of attendance records
    if (Array.isArray(data)) {
      const processed = data.map(entry => ({
        user_id: entry.user_id,
        date: entry.date,
        status: entry.status,
        remarks: entry.remarks || '',
        role: entry.role,
        department: entry.department,
        year: entry.role === 'Student' ? entry.year : null,
        section: entry.role === 'Student' ? entry.section : null,
        subjectCode: entry.role === 'Teacher' ? entry.subjectCode : null,
        lectureType: entry.role === 'Teacher' ? entry.lectureType : null,
        period: entry.role === 'Teacher' ? entry.period : null,
        dutyType: entry.role === 'Staff' ? entry.dutyType : null,
      }));

      const created = await Attendance.bulkCreate(processed);
      return res.status(201).json({ message: 'Bulk attendance added', data: created });
    }

    // Case 2: Handle single object
    const {
      user_id, date, status, remarks, role, department,
      year, section, subjectCode, lectureType, period, dutyType
    } = data;

    const created = await Attendance.create({
      user_id,
      date,
      status,
      remarks,
      role,
      department,
      year: role === 'Student' ? year : null,
      section: role === 'Student' ? section : null,
      subjectCode: role === 'Teacher' ? subjectCode : null,
      lectureType: role === 'Teacher' ? lectureType : null,
      period: role === 'Teacher' ? period : null,
      dutyType: role === 'Staff' ? dutyType : null,
    });

    return res.status(201).json({ message: 'Attendance added', data: created });
  } catch (error) {
    console.error('Create Attendance Error:', error);
    return res.status(500).json({ error: 'Failed to create attendance.', details: error.errors });
  }
};

// GET attendance (with filters)
exports.getAttendance = async (req, res) => {
  try {
    const {
      user_id, role, department, year, section,
      subjectCode, lectureType, period, dutyType,
      status, date, fromDate, toDate
    } = req.query;

    const where = {};

    if (user_id) where.user_id = user_id;
    if (role) where.role = role;
    if (department) where.department = department;
    if (year) where.year = year;
    if (section) where.section = section;
    if (subjectCode) where.subjectCode = subjectCode;
    if (lectureType) where.lectureType = lectureType;
    if (period) where.period = period;
    if (dutyType) where.dutyType = dutyType;
    if (status) where.status = status;
    if (date) where.date = date;
    if (fromDate && toDate) where.date = { [Op.between]: [fromDate, toDate] };

    const records = await Attendance.findAll({
      where,
      include: [{ model: User, as: 'user', attributes: ['firstName', 'lastName', 'user_id'] }],
      order: [['date', 'DESC']],
    });

    return res.json(records);
  } catch (error) {
    console.error('Get Attendance Error:', error);
    return res.status(500).json({ error: 'Failed to fetch attendance.' });
  }
};

// GET attendance summary
exports.getAttendanceSummary = async (req, res) => {
  try {
    const { month, year, role } = req.query;
    if (!month || !year) return res.status(400).json({ error: 'Month and year are required' });

    const startDate = `${year}-${month}-01`;
    const endDate = `${year}-${month}-31`;

    const results = await Attendance.findAll({
      attributes: [
        'user_id',
        'role',
        [fn('SUM', literal("CASE WHEN status = 'Present' THEN 1 ELSE 0 END")), 'Present'],
        [fn('SUM', literal("CASE WHEN status = 'Absent' THEN 1 ELSE 0 END")), 'Absent'],
        [fn('SUM', literal("CASE WHEN status = 'Leave' THEN 1 ELSE 0 END")), 'Leave'],
      ],
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
        ...(role && { role }),
      },
      include: [{ model: User, as: 'user', attributes: ['firstName', 'lastName'] }],
      group: ['user_id', 'user.firstName', 'user.lastName', 'role'],
    });

    res.json(results);
  } catch (error) {
    console.error('Attendance Summary Error:', error);
    res.status(500).json({ error: 'Failed to fetch summary.' });
  }
};

// BULK UPLOAD attendance from Excel
exports.uploadAttendanceSheet = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const filePath = path.resolve(__dirname, '../uploads', req.file.filename);
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const attendanceData = rows.map(row => ({
      user_id: row.user_id,
      date: row.date,
      status: row.status,
      remarks: row.remarks || '',
      role: row.role,
      department: row.department,
      year: row.role === 'Student' ? row.year : null,
      section: row.role === 'Student' ? row.section : null,
      subjectCode: row.role === 'Teacher' ? row.subjectCode : null,
      lectureType: row.role === 'Teacher' ? row.lectureType : null,
      period: row.role === 'Teacher' ? row.period : null,
      dutyType: row.role === 'Staff' ? row.dutyType : null,
    }));

    await Attendance.bulkCreate(attendanceData);

    fs.unlinkSync(filePath); // Clean up uploaded file

    res.status(200).json({ message: 'Attendance uploaded successfully' });
  } catch (error) {
    console.error('Upload Attendance Error:', error);
    res.status(500).json({ error: 'Failed to upload attendance sheet.' });
  }
};

// UPDATE attendance by ID
exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const [updated] = await Attendance.update(updateData, { where: { id } });

    if (!updated) return res.status(404).json({ error: 'Attendance not found' });

    const updatedRecord = await Attendance.findByPk(id);
    return res.json(updatedRecord);
  } catch (error) {
    console.error('Update Attendance Error:', error);
    return res.status(500).json({ error: 'Failed to update attendance.' });
  }
};

// DELETE attendance by ID
exports.deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Attendance.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ error: 'Attendance not found' });

    return res.json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    console.error('Delete Attendance Error:', error);
    return res.status(500).json({ error: 'Failed to delete attendance.' });
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.findAll({
      order: [['date', 'DESC']],
    });

    return res.status(200).json({ success: true, data: attendanceRecords });
  } catch (error) {
    console.error('Fetch All Attendance Error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch attendance records.' });
  }
};
