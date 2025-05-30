const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authenticate');
const { authorizeRoles } = require('../middleware/authorization');
const {
  createTemplate,
  // getTemplates,
  getTemplateById,
  deleteTemplate,
  updateTemplate
} = require('../controllers/templateController');

router.post('/add-template', authenticate, authorizeRoles('Admin'), createTemplate);
// router.get('/', authenticate, getTemplates);
router.post('/edit-template/', authenticate, authorizeRoles('Admin'), updateTemplate);
router.get('/get-template/', authenticate, getTemplateById);
router.delete('/delete-template/:templateName', authenticate, authorizeRoles('Admin'), deleteTemplate);

module.exports = router;
