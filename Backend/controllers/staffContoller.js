
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const { sequelize, User, StaffProfile, UserDocuments } = require("../models");
const { generateStoredFilename } = require("../util/fileHelper");

// Returns correct MIME type based on file extension
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase(); // Extract file extension

  if (ext === ".pdf") return "application/pdf";      // For PDF documents
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg"; // For JPEG images
  if (ext === ".png") return "image/png";            // For PNG images

  // Fallback for unknown file types
  return "application/octet-stream"; // Generic binary stream
}


const addStaff = async (req, res) => {
  const t = await sequelize.transaction(); // Begin DB transaction

  try {
    // 📨 Extract incoming form-data fields from the request body
    const {
      user_id, firstName, lastName, displayName, emailId,
      alternateEmailID, dob, gender, phoneNumber, password,
      bloodGroup, address, state, city, pinCode,
      department, designation, education, experience, roles,
    } = req.body;

    // 🚨 Validate that all required fields are present
    if (
      !user_id || !firstName || !lastName || !emailId ||
      !password || !designation || !education || !experience
    ) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // 🔐 Hash the plain text password
    const hashedPassword = await bcrypt.hash(password, 20);

    // =============================================
    // 📷 Profile Photo Upload Handling (Optional)
    // =============================================
    let uploadPhotoFilename = null; // Default value

    const photoFile = req.files?.uploadPhoto?.[0]; // Only 1 photo allowed
    if (photoFile) {
      // 🏷 Generate a safe, unique filename
      uploadPhotoFilename = generateStoredFilename(user_id, 'profile_photo', photoFile.originalname);

      // 📁 Folder path to store photo
      const folderPath = path.join(__dirname, '..', 'uploads', 'staffDocument');
      if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });

      // 💾 Write the image buffer to disk
      const savePath = path.join(folderPath, uploadPhotoFilename);
      fs.writeFileSync(savePath, photoFile.buffer);
    }

    // ========================
    // 👤 Step 1: Create User
    // ========================
    const user = await User.create({
      user_id,
      firstName,
      lastName,
      displayName,
      emailId,
      alternateEmailID,
      dob,
      gender,
      phoneNumber,
      password: hashedPassword,
      bloodGroup,
      address,
      uploadPhoto: uploadPhotoFilename,
      state,
      city,
      pinCode,
      department,
      designation,
      roles,
      isActive: true,
    }, { transaction: t }); // 🔁 use transaction

    // ================================
    // 📝 Step 2: Save photo metadata
    // ================================
    if (photoFile) {
      const savePath = path.join(__dirname, '..', 'uploads', 'staffDocument', uploadPhotoFilename);

      await UserDocuments.create({
        user_id: user.user_id,  // FK relationship
        file_label: 'profile_photo',
        original_filename: photoFile.originalname,
        stored_filename: uploadPhotoFilename,
        file_path: savePath,
        mimetype: photoFile.mimetype, // e.g., 'image/png'
        size: photoFile.size,         // in bytes
      }, { transaction: t });
    }

    // =================================
    // 🎓 Step 3: Create Staff Profile
    // =================================
    const staffProfile = await StaffProfile.create({
      education: JSON.stringify(education), // 🧠 Fix: convert objects to string!
      experience,
      designation,
      user_id: user.user_id, // FK reference
    }, { transaction: t });

    // =====================================
    // 📚 Step 4: Handle education documents
    // =====================================
    if (Array.isArray(req.files?.educationDocument)) {
      for (const file of req.files.educationDocument) {
        const storedFilename = generateStoredFilename(user.user_id, 'education_doc', file.originalname);
        const savePath = path.join(__dirname, '..', 'uploads', 'staffDocument', storedFilename);
        fs.writeFileSync(savePath, file.buffer); // 💾 Save file to disk

        await UserDocuments.create({
          user_id: user.user_id,
          file_label: 'education_doc',
          original_filename: file.originalname,
          stored_filename: storedFilename,
          file_path: savePath,
          mimetype: file.mimetype,
          size: file.size,
        }, { transaction: t });
      }
    }

    // All good! Save to DB
    await t.commit(); // Commit the transaction

    return res.status(201).json({
      message: "Staff added successfully",
      user,
      staffProfile,
    });
  } catch (error) {
    await t.rollback(); // Rollback on error
    console.error(" Error adding staff:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};


const downloadDocument = async (req, res) => {
  try {
    const { userId, filename } = req.params;   // Extract from URL
    const { mode } = req.query;                // View or download

    // Mock user authentication — replace with real JWT middleware in prod
    const loggedInUser = req.user || { user_id: userId, roles: 'Admin' };

    // Security: allow admin or the file's owner only
    if (loggedInUser.roles !== 'Admin' && loggedInUser.user_id !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Build full path to the file on disk
    const filePath = path.join(__dirname, '..', 'uploads', 'staffDocument', filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    // Get MIME type so browser knows how to handle the file
    const mimeType = getMimeType(filePath);
    res.setHeader("Content-Type", mimeType);

    // Tell browser how to treat the file: view inline or download
    res.setHeader(
      "Content-Disposition",
      mode === 'view'
        ? `inline; filename="${filename}"`      // View in browser
        : `attachment; filename="${filename}"`  // Download
    );

    // Stream the file to the browser
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (err) {
    console.error(" Download error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Export the controller functions
module.exports = {
  addStaff,
  downloadDocument,
};
