// routes/department.routes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authenticate');
const { authorizeRoles } = require('../middleware/authorization');
const {
  addDepartment,
  viewDepartments,
  updateDepartment,
  deleteDepartment,
} = require('../controllers/departmentController');

router.get('/get-department', authenticate, viewDepartments); 
router.post('/add-department', authenticate, authorizeRoles('Admin'), addDepartment); 
router.put('edit-department/:id', authenticate, authorizeRoles('Admin', 'Staff'), updateDepartment); 
router.delete('delete-department/:id', authenticate, authorizeRoles('Admin'), deleteDepartment); 

module.exports = router;
