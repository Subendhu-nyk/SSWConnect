const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Generates unique and clean file name: user_id_label_uuid.ext
function generateStoredFilename(userId, label, originalName) {
  const ext = path.extname(originalName);               // Get file extension: ".pdf"
  const safeLabel = label.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase(); // Sanitize label: "resume"
  return `${userId}_${safeLabel}_${uuidv4()}${ext}`;    // Example: "ANJ123_resume_b78c9...pdf"
}

module.exports = {
  generateStoredFilename
};
