const { Template } = require("../models");

// POST /api/templates
const createTemplate = async (req, res) => {
  try {
    const { templateName, fields, createdBy } = req.body;
     const existingTemplate = await Template.findOne({ where: { templateName } });
     if (existingTemplate) {
      return res.status(409).json({
        success: false,
        message: 'Template with this name already exists.',
      });
    }
    const template = await Template.create({ templateName, fields, createdBy });
    res.status(201).json({ success: true, data: template });
  } catch (error) {
    console.error("Error creating template:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create template" });
  }
};

// GET /api/templates
// const getTemplates = async (_req, res) => {
//   try {
//     const templates = await Template.findAll();
//     res.status(200).json({ success: true, data: templates });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to fetch templates' });
//   }
// };

// GET /api/templates/:id
const getTemplateById = async (req, res) => {
  const { templateName } = req.query;
  try {
    const template = await Template.findOne({ where: { templateName } });
    if (!template)
      return res.status(404).json({ message: "Template not found" });
    res.status(200).json({ success: true, data: template });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error retrieving template" });
  }
};

const updateTemplate = async (req, res) => {  
  try {     
    const { templateName, fields } = req.body;

    const template = await Template.findOne({ where: { templateName } });
    if (!template) {
      return res
        .status(404)
        .json({ success: false, message: "Template not found" });
    }

    await template.update({ templateName, fields });
    res
      .status(200)
      .json({ success: true, message: "Template updated", data: template });
  } catch (error) {
    console.error("Error updating template:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update template" });
  }
};

// DELETE /api/templates/:id
const deleteTemplate = async (req, res) => {
  try {
    const deleted = await Template.destroy({ where: { id: req.params.id } });
    if (!deleted)
      return res.status(404).json({ message: "Template not found" });
    res.status(200).json({ success: true, message: "Template deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting template" });
  }
};

module.exports = {
  createTemplate,
  //   getTemplates,
  updateTemplate,
  getTemplateById,
  deleteTemplate,
};
