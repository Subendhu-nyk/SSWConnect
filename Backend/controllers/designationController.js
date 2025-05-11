const { Op } = require('sequelize');
const { Designation } = require('../models');

// GET /designations
const viewDesignations = async (req, res) => {
  try {
    const list = await Designation.findAll();
    res.status(200).json({ success: true, data: list });
  } catch (err) {
    console.error('Error fetching designations:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch designations' });
  }
};

// POST /add-designation
const addDesignation = async (req, res) => {
  try {
    const { designationName, designationCode, applicableRoles, status, description } = req.body;

    const conflictFields = [];

    const checks = await Promise.all([
      Designation.findOne({ where: { designationName } }),
      Designation.findOne({ where: { designationCode } }),
    ]);

    if (checks[0]) conflictFields.push('designationName');
    if (checks[1]) conflictFields.push('designationCode');

    if (conflictFields.length > 0) {
      return res.status(409).json({
        success: false,
        message: `Conflict in: ${conflictFields.join(', ')}`,
        fields: conflictFields,
      });
    }

    const newDesignation = await Designation.create({
      designationName,
      designationCode,
      applicableRoles: Array.isArray(applicableRoles) ? applicableRoles.join(',') : applicableRoles,
      status,
      description,
    });

    res.status(201).json({ success: true, message: 'Designation added', data: newDesignation });
  } catch (err) {
    console.error('Error adding designation:', err);
    res.status(500).json({ success: false, message: 'Failed to add designation' });
  }
};

// PUT /edit-designation/:id
const updateDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const { designationName, designationCode, applicableRoles, status, description } = req.body;

    const designation = await Designation.findByPk(id);
    if (!designation) {
      return res.status(404).json({ success: false, message: 'Designation not found' });
    }

    const conflictFields = [];

    const checks = await Promise.all([
      Designation.findOne({ where: { designationName, id: { [Op.ne]: id } } }),
      Designation.findOne({ where: { designationCode, id: { [Op.ne]: id } } }),
    ]);

    if (checks[0]) conflictFields.push('designationName');
    if (checks[1]) conflictFields.push('designationCode');

    if (conflictFields.length > 0) {
      return res.status(409).json({
        success: false,
        message: `Conflict in: ${conflictFields.join(', ')}`,
        fields: conflictFields,
      });
    }

    await designation.update({
      designationName,
      designationCode,
      applicableRoles: Array.isArray(applicableRoles) ? applicableRoles.join(',') : applicableRoles,
      status,
      description,
    });

    res.status(200).json({ success: true, message: 'Designation updated', data: designation });
  } catch (err) {
    console.error('Error updating designation:', err);
    res.status(500).json({ success: false, message: 'Failed to update designation' });
  }
};

// DELETE /delete-designation/:id
const deleteDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const designation = await Designation.findByPk(id);
    if (!designation) {
      return res.status(404).json({ success: false, message: 'Designation not found' });
    }

    await designation.destroy();
    res.status(200).json({ success: true, message: 'Designation deleted' });
  } catch (err) {
    console.error('Error deleting designation:', err);
    res.status(500).json({ success: false, message: 'Failed to delete designation' });
  }
};

module.exports = {
  viewDesignations,
  addDesignation,
  updateDesignation,
  deleteDesignation,
};
