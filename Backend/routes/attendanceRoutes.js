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

router.post('/create', attendanceController.createAttendance);
router.get('/', attendanceController.getAttendance);
router.get('/summary', attendanceController.getAttendanceSummary);
router.post('/upload', upload.single('file'), attendanceController.uploadAttendanceSheet);

module.exports = router;

