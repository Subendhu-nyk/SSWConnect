const multer = require('multer');

// Use memoryStorage to access file buffer directly in controller
const storage = multer.memoryStorage();

// Configure multer to use memory storage
const upload = multer({ storage });

module.exports = upload;
