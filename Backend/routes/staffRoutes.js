const express = require('express');
const router = express.Router();
const staffContoller = require('../controllers/staffContoller');

router.post('/add/staff', staffContoller.addStaff);

module.exports = router;
