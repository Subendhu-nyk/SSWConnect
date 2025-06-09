// controllers/attendanceController.js
const { Attendance, User } = require('../models');
const { Op, fn, col, literal } = require('sequelize');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

exports.createAttendance = async (req, res) => {
  try {
    const { user_id, date, status, remarks, role, department, year, section } = req.body;

    const attendance = await Attendance.create({
      user_id,
      date,
      status,
      remarks,
      role,
      department,
      year,
      section,
    });

    return res.status(201).json(attendance);
  } catch (error) {
    console.error('Create Attendance Error:', error);
    return res.status(500).json({ error: 'Failed to create attendance.' });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const { user_id, role, department, year, section, status, date, fromDate, toDate } = req.query;
    const where = {};

    if (user_id) where.user_id = user_id;
    if (role) where.role = role;
    if (department) where.department = department;
    if (year) where.year = year;
    if (section) where.section = section;
    if (status) where.status = status;
    if (date) where.date = date;
    if (fromDate && toDate) where.date = { [Op.between]: [fromDate, toDate] };

    const records = await Attendance.findAll({
      where,
      include: [{ model: User, as: 'user' }],
      order: [['date', 'DESC']],
    });

    return res.json(records);
  } catch (error) {
    console.error('Get Attendance Error:', error);
    return res.status(500).json({ error: 'Failed to fetch attendance.' });
  }
};

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
      include: [{ model: User, as: 'user', attributes: ['name'] }],
      group: ['user_id', 'user.name', 'role'],
    });

    res.json(results);
  } catch (error) {
    console.error('Attendance Summary Error:', error);
    res.status(500).json({ error: 'Failed to fetch summary.' });
  }
};

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
      year: row.year,
      section: row.section,
    }));

    await Attendance.bulkCreate(attendanceData);

    fs.unlinkSync(filePath); // Clean up

    res.json({ message: 'Attendance uploaded successfully' });
  } catch (error) {
    console.error('Upload Attendance Error:', error);
    res.status(500).json({ error: 'Failed to upload attendance sheet.' });
  }
};