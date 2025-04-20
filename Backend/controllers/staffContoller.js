const bcrypt = require("bcrypt");
const { User, StaffProfile } = require("../models");

const addStaff = async (req, res) => {
  try {
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
      uploadPhoto,
      state,
      city,
      pinCode,
      department,
      designation,
      education,
      experience,
      roles,
    } = req.body;

    // Required field validation
    if (
      !user_id ||
      !firstName ||
      !lastName ||
      !emailId ||
      !password ||
      !designation ||
      !education ||
      !experience
    ) {
      return res
        .status(400)
        .json({ message: "One or more required fields are missing" });
    }

    // Try hashing the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 20);
    } catch (err) {
      console.error("Password hashing failed:", err);
      return res.status(500).json({ message: "Failed to encrypt password" });
    }

    // Create user
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
      uploadPhoto,
      state,
      city,
      pinCode,
      department,
      designation,
      roles,
      isActive: true,
    });

    // Creates staff profile
    const staffProfile = await StaffProfile.create({
      education,
      experience,
      designation,
      user_id: user.user_id,
    });

    return res.status(201).json({
      message: "Staff added successfully",
      user,
      staffProfile,
    });
  } catch (error) {
    console.error("Error adding staff:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { addStaff };
