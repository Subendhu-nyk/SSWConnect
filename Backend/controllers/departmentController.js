const { Op } = require('sequelize');
const { Department } = require('../models');

// GET /api/departments
const viewDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.status(200).json({ success: true, data: departments });
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch departments' });
  }
};

// POST /api/departments
const addDepartment = async (req, res) => {
  try {
    const {
      departmentName,
      departmentId,
      departmentCode,
      hodId,
      email,
      contactNumber,
      departmentType,
      buildingLocation,
      establishedYear,
      status,
      description,
      associatedCourses,
    } = req.body;

    const conflictFields = [];

    const checks = await Promise.all([
      Department.findOne({ where: { departmentName } }),
      Department.findOne({ where: { departmentId } }),
      Department.findOne({ where: { departmentCode } }),
      Department.findOne({ where: { email } }),
      hodId ? Department.findOne({ where: { hodId } }) : null,
    ]);

    if (checks[0]) conflictFields.push('departmentName');
    if (checks[1]) conflictFields.push('departmentId');
    if (checks[2]) conflictFields.push('departmentCode');
    if (checks[3]) conflictFields.push('email');
    if (checks[4]) conflictFields.push('hodId');

    if (conflictFields.length > 0) {
      return res.status(409).json({
        success: false,
        message: `Conflict in: ${conflictFields.join(', ')}`,
        fields: conflictFields,
      });
    }

    const newDept = await Department.create({
      departmentName,
      departmentId,
      departmentCode,
      hodId,
      email,
      contactNumber,
      departmentType: Array.isArray(departmentType) ? departmentType.join(',') : departmentType,
      buildingLocation,
      establishedYear,
      status,
      description,
      associatedCourses: Array.isArray(associatedCourses) ? associatedCourses.join(',') : associatedCourses,
    });

    res.status(201).json({ success: true, message: 'Department added', data: newDept });
  } catch (error) {
    console.error('Error adding department:', error);
    res.status(500).json({ success: false, message: 'Failed to add department' });
  }
};

// PUT /api/departments/:id
const updateDepartment = async (req, res) => {
  try {
    const deptId = req.params.id;
    const {
      departmentName,
      departmentId,
      departmentCode,
      hodId,
      email,
      contactNumber,
      departmentType,
      buildingLocation,
      establishedYear,
      status,
      description,
      associatedCourses,
    } = req.body;

    const department = await Department.findByPk(deptId);
    if (!department) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }

    const conflictFields = [];

    const checks = await Promise.all([
      Department.findOne({ where: { departmentName, id: { [Op.ne]: deptId } } }),
      Department.findOne({ where: { departmentId, id: { [Op.ne]: deptId } } }),
      Department.findOne({ where: { departmentCode, id: { [Op.ne]: deptId } } }),
      Department.findOne({ where: { email, id: { [Op.ne]: deptId } } }),
      hodId ? Department.findOne({ where: { hodId, id: { [Op.ne]: deptId } } }) : null,
    ]);

    if (checks[0]) conflictFields.push('departmentName');
    if (checks[1]) conflictFields.push('departmentId');
    if (checks[2]) conflictFields.push('departmentCode');
    if (checks[3]) conflictFields.push('email');
    if (checks[4]) conflictFields.push('hodId');

    if (conflictFields.length > 0) {
      return res.status(409).json({
        success: false,
        message: `Conflict in: ${conflictFields.join(', ')}`,
        fields: conflictFields,
      });
    }

    await department.update({
      departmentName,
      departmentId,
      departmentCode,
      hodId,
      email,
      contactNumber,
      departmentType: Array.isArray(departmentType) ? departmentType.join(',') : departmentType,
      buildingLocation,
      establishedYear,
      status,
      description,
      associatedCourses: Array.isArray(associatedCourses) ? associatedCourses.join(',') : associatedCourses,
    });

    res.status(200).json({ success: true, message: 'Department updated', data: department });
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ success: false, message: 'Failed to update department' });
  }
};

// DELETE /api/departments/:id
const deleteDepartment = async (req, res) => {
  try {
    const deptId = req.params.id;
    const department = await Department.findByPk(deptId);
    if (!department) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }

    await department.destroy();
    res.status(200).json({ success: true, message: 'Department deleted' });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ success: false, message: 'Failed to delete department' });
  }
};

module.exports = {
  viewDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
