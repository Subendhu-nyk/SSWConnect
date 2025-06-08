const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const {
  sequelize,
  User,
  StaffProfile,
  TeacherProfile,
  StudentProfile,
  UserDocuments,
} = require("../models");
const { generateStoredFilename } = require("../util/fileHelper");
const { sanitizeExcelData } = require("../util/sanitizeExcelData");

// Returns correct MIME type based on file extension
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase(); // Extract file extension

  if (ext === ".pdf") return "application/pdf"; // For PDF documents
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg"; // For JPEG images
  if (ext === ".png") return "image/png"; // For PNG images

  // Fallback for unknown file types
  return "application/octet-stream"; // Generic binary stream
}

const addUser = async (req, res) => {
  // ==============================
  // 📥 BULK EXCEL UPLOAD HANDLING
  // ==============================
  if (Array.isArray(req.body)) {
    const cleanData = sanitizeExcelData(req.body);
    console.log("cleanData>>>>>>",cleanData)
    try {      
      // const userData = req.body;
      // 1️⃣ Prepare users with hashed passwords
      const usersToCreate = await Promise.all(
        cleanData.map(async (item) => {
          if (!item.password) {
            throw new Error(`Missing password for user_id: ${item.user_id}`);
          }

          if (!item.fatherMobileNo && item.roles === "Student") {
            throw new Error(`Missing fatherMobileNo for ${item.user_id}`);
          }

          return {
            user_id: item.user_id,
            firstName: item.firstName,
            lastName: item.lastName,
            displayName: item.displayName || "",
            emailId: item.emailId,
            alternateEmailID: item.alternateEmailID || "",
            dob: item.dob,
            gender: item.gender,
            phoneNumber: item.phoneNumber,
            password: await bcrypt.hash(item.password, 20),
            bloodGroup: item.bloodGroup || "",
            address: item.address,
            uploadPhoto: null,
            state: item.state,
            city: item.city || "",
            pinCode: item.pinCode,
            department: item.department || "",
            roles: item.roles,
            isActive: item.isActive,
          };
        })
      );

      // 2️⃣ Insert Users in one go
      await User.bulkCreate(usersToCreate);

      // 3️⃣ Prepare and insert role-specific profiles
      const studentProfiles = [];
      const staffProfiles = [];
      const teacherProfiles = [];

      for (const item of cleanData) {
        const base = { user_id: item.user_id };
        console.log("item>>", item)
        if (item.roles === "Student") {
          studentProfiles.push({
            ...base,
            registrationDate: item.registrationDate,
            fatherName: item.fatherName,
            fatherMobileNo: item.fatherMobileNo,
            year: item.year,
            section: item.section,
            education: JSON.stringify(item.education),
          });
        } else if (item.roles === "Staff") {
          staffProfiles.push({
            ...base,
            designation: item.designation,
            experience: item.experience,
            education: JSON.stringify(item.education),
          });
        } else if (item.roles === "Teacher") {
          teacherProfiles.push({
            ...base,
            designation: item.designation,
            experience: item.experience,
            joiningDate: item.joiningDate,
            education: JSON.stringify(item.education),
          });
        }
      }
console.log("studentProfiles to be inserted =>", studentProfiles);
      if (studentProfiles.length > 0)
        await StudentProfile.bulkCreate(studentProfiles);
      if (staffProfiles.length > 0)
        await StaffProfile.bulkCreate(staffProfiles);
      if (teacherProfiles.length > 0)
        await TeacherProfile.bulkCreate(teacherProfiles);
      return res.status(201).json({
        message: "Bulk users added successfully",
      });
    } catch (error) {
      console.error("Bulk insert error:", error);
      return res.status(500).json({ message: "Bulk insert failed", error });
    }
  }

  const t = await sequelize.transaction(); // Begin DB transaction

  try {
    // Extract incoming form-data fields from the request body
    const {
      user_id,
      firstName,
      lastName,
      displayName,
      emailId,
      alternateEmailID,
      dob,
      gender,
      phoneNumber,
      password,
      bloodGroup,
      address,
      state,
      city,
      pinCode,
      department,
      designation,
      education,
      experience,
      roles,
      joiningDate,
      registrationDate,
      fatherMobileNumber,
      fatherName,
      year,
      section
    } = req.body;

    //  Validate that all required fields are present
    if (
      !user_id ||
      !firstName ||
      !lastName ||
      !emailId ||
      !password
      // !designation ||
      // !education ||
      // !experience
    ) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    //  Hash the plain text password
    const hashedPassword = await bcrypt.hash(password, 20);

    // =============================================
    //  Profile Photo Upload Handling (Optional)
    // =============================================
    let uploadPhotoFilename = null; // Default value

    const photoFile = req.files?.uploadPhoto?.[0]; // Only 1 photo allowed
    if (photoFile) {
      // 🏷 Generate a safe, unique filename
      uploadPhotoFilename = generateStoredFilename(
        user_id,
        "profile_photo",
        photoFile.originalname
      );

      //  Folder path to store photo
      let folderPath;
      if (roles === "Staff") {
        folderPath = path.join(__dirname, "..", "uploads", "staffDocument");
      } else if (roles === "Teacher") {
        folderPath = path.join(__dirname, "..", "uploads", "teacherDocument");
      } else if (roles === "Student") {
        folderPath = path.join(__dirname, "..", "uploads", "teacherDocument");
      }
      if (!fs.existsSync(folderPath))
        fs.mkdirSync(folderPath, { recursive: true });

      // Write the image buffer to disk
      const savePath = path.join(folderPath, uploadPhotoFilename);
      fs.writeFileSync(savePath, photoFile.buffer);
    }

    // ========================
    // Step 1: Create User
    // ========================
    const user = await User.create(
      {
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
        roles,
        isActive,
      },
      { transaction: t }
    ); // 🔁 use transaction

    // ================================
    //  Step 2: Save photo metadata
    // ================================
    if (photoFile) {
      let savePath;
      if (roles === "Staff") {
        savePath = path.join(
          __dirname,
          "..",
          "uploads",
          "staffDocument",
          uploadPhotoFilename
        );
      } else if (roles === "Teacher") {
        savePath = path.join(
          __dirname,
          "..",
          "uploads",
          "teacherDocument",
          uploadPhotoFilename
        );
      } else if (roles === "Student") {
        savePath = path.join(
          __dirname,
          "..",
          "uploads",
          "studentDocument",
          uploadPhotoFilename
        );
      }

      await UserDocuments.create(
        {
          user_id: user.user_id, // FK relationship
          file_label: "profile_photo",
          original_filename: photoFile.originalname,
          stored_filename: uploadPhotoFilename,
          file_path: savePath,
          mimetype: photoFile.mimetype, // e.g., 'image/png'
          size: photoFile.size, // in bytes
        },
        { transaction: t }
      );
    }

    // =================================
    // Step 3: Create Staff Profile
    // =================================
    let staffProfile, teacherProfile, studentProfile;
    if (roles === "Staff") {
      staffProfile = await StaffProfile.create(
        {
          education: JSON.stringify(education), // Fix: convert objects to string!
          joiningDate,
          experience,
          designation,
          user_id: user.user_id, // FK reference
        },
        { transaction: t }
      );
    } else if (roles === "Teacher") {
      teacherProfile = await TeacherProfile.create(
        {
          education: JSON.stringify(education),
          joiningDate,
          experience,
          designation,
          user_id: user.user_id,
        },
        { transaction: t }
      );
    } else if (roles === "Student") {
      studentProfile = await StudentProfile.create(
        {
          fatherMobileNo: fatherMobileNumber,
          fatherName: fatherName,
          education: JSON.stringify(education),
          registrationDate,
          year,
          section,
          user_id: user.user_id,
        },
        { transaction: t }
      );
    }
    // =====================================
    // Step 4: Handle education documents
    // =====================================
    if (Array.isArray(req.files?.educationDocument)) {
      let savePath;
      for (const file of req.files.educationDocument) {
        const storedFilename = generateStoredFilename(
          user.user_id,
          "education_doc",
          file.originalname
        );
        if (roles === "Staff") {
          savePath = path.join(
            __dirname,
            "..",
            "uploads",
            "staffDocument",
            storedFilename
          );
        } else if (roles === "Teacher") {
          savePath = path.join(
            __dirname,
            "..",
            "uploads",
            "teacherDocument",
            storedFilename
          );
        } else if (roles === "Student") {
          savePath = path.join(
            __dirname,
            "..",
            "uploads",
            "studentDocument",
            storedFilename
          );
        }

        fs.writeFileSync(savePath, file.buffer); // Save file to disk

        await UserDocuments.create(
          {
            user_id: user.user_id,
            file_label: "education_doc",
            original_filename: file.originalname,
            stored_filename: storedFilename,
            file_path: savePath,
            mimetype: file.mimetype,
            size: file.size,
          },
          { transaction: t }
        );
      }
    } else if (Array.isArray(req.files?.experienceDocument)) {
      let savePath;
      for (const file of req.files.experienceDocument) {
        const storedFilename = generateStoredFilename(
          user.user_id,
          "experience_doc",
          file.originalname
        );
        if (roles === "Staff") {
          savePath = path.join(
            __dirname,
            "..",
            "uploads",
            "staffDocument",
            storedFilename
          );
        } else if (roles === "Teacher") {
          savePath = path.join(
            __dirname,
            "..",
            "uploads",
            "teacherDocument",
            storedFilename
          );
        } else if (roles === "Student") {
          savePath = path.join(
            __dirname,
            "..",
            "uploads",
            "studentDocument",
            storedFilename
          );
        }

        fs.writeFileSync(savePath, file.buffer); // Save file to disk

        await UserDocuments.create(
          {
            user_id: user.user_id,
            file_label: "education_doc",
            original_filename: file.originalname,
            stored_filename: storedFilename,
            file_path: savePath,
            mimetype: file.mimetype,
            size: file.size,
          },
          { transaction: t }
        );
      }
    } else if (Array.isArray(req.files?.certificationDocument)) {
      let savePath;
      for (const file of req.files.certificationDocument) {
        const storedFilename = generateStoredFilename(
          user.user_id,
          "certification_doc",
          file.originalname
        );
        if (roles === "Staff") {
          savePath = path.join(
            __dirname,
            "..",
            "uploads",
            "staffDocument",
            storedFilename
          );
        } else if (roles === "Teacher") {
          savePath = path.join(
            __dirname,
            "..",
            "uploads",
            "teacherDocument",
            storedFilename
          );
        } else if (roles === "Student") {
          savePath = path.join(
            __dirname,
            "..",
            "uploads",
            "studentDocument",
            storedFilename
          );
        }

        fs.writeFileSync(savePath, file.buffer); // Save file to disk

        await UserDocuments.create(
          {
            user_id: user.user_id,
            file_label: "education_doc",
            original_filename: file.originalname,
            stored_filename: storedFilename,
            file_path: savePath,
            mimetype: file.mimetype,
            size: file.size,
          },
          { transaction: t }
        );
      }
    }
    // All good! Save to DB
    await t.commit(); // Commit the transaction

    return res.status(201).json({
      message: "User added successfully",
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
    const { userId, filename } = req.params; // Extract from URL
    const { mode } = req.query; // View or download

    // Mock user authentication — replace with real JWT middleware in prod
    const loggedInUser = req.user || { user_id: userId, roles: "Admin" };

    // Security: allow admin or the file's owner only
    if (loggedInUser.roles !== "Admin" && loggedInUser.user_id !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Build full path to the file on disk
    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      "staffDocument",
      filename
    );
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    // Get MIME type so browser knows how to handle the file
    const mimeType = getMimeType(filePath);
    res.setHeader("Content-Type", mimeType);

    // Tell browser how to treat the file: view inline or download
    res.setHeader(
      "Content-Disposition",
      mode === "view"
        ? `inline; filename="${filename}"` // View in browser
        : `attachment; filename="${filename}"` // Download
    );

    // Stream the file to the browser
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (err) {
    console.error(" Download error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const generateAccessToken = (id, role) => {
  return jwt.sign({ userId: id, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const userLogin = async (req, res) => {
  try {
    const { emailId, password, user_id } = req.body;

    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required." });
    }

    if (!emailId && !user_id) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email or user ID." });
    }

    const whereCondition = emailId ? { emailId } : { user_id };
    const user = await User.findOne({ where: whereCondition });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password." });
    }

    const token = generateAccessToken(user.user_id, user.roles);
    res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const getStudentsByFilters = async (req, res) => {
  try {
    console.log("attendance data", req.body);
    const { department, year, section } = req.body;

    if (!department || !year) {
      return res.status(400).json({ message: "Missing required filters" });
    }

    const students = await User.findAll({
      where: {
        department,
        roles: "Student",
        isActive: true,
      },
      include: [
        {
          model: StudentProfile,
          where: { year, section },
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
      ],
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    const response = students.map((student) => {
      const profile = student.StudentProfile || {};
      return {
        userId: student.user_id,
        name: `${student.firstName}`,
        email: student.emailId,
        gender: student.gender,
        department: student.department,
        year: profile.year,
        section: profile.section,        
      };
    });

    console.log("response>>>>", response);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Export the controller functions
module.exports = {
  addUser,
  downloadDocument,
  userLogin,
  getStudentsByFilters,
};
