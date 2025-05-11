const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authenticate');
const { authorizeRoles } = require('../middleware/authorization');
const {
  viewDesignations,
  addDesignation,
  updateDesignation,
  deleteDesignation,
} = require('../controllers/designationController');

router.get('/', authenticate, viewDesignations);
router.post('/add-designation', authenticate, authorizeRoles('Admin', 'Staff'), addDesignation);
router.put('/edit-designation/:id', authenticate, authorizeRoles('Admin', 'Staff'), updateDesignation);
router.delete('/delete-designation/:id', authenticate, authorizeRoles('Admin'), deleteDesignation);

module.exports = router;
