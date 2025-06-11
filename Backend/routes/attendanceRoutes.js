// routes/attendance.js

const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });


router.post('/upload-attendance', upload.single('file'), attendanceController.uploadAttendanceSheet);
router.post('/add-attendance', attendanceController.createAttendance);
router.get('/all-attendance', attendanceController.getAttendance);
router.get('/attendance-summary', attendanceController.getAttendanceSummary);
router.put('/update-attendance/', attendanceController.updateAttendance);
router.delete('/delete-attendance/', attendanceController.deleteAttendance);
router.get('/getAll-attendance',attendanceController.getAllAttendance);
module.exports = router;

