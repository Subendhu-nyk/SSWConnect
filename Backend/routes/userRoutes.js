const express = require("express");
const router = express.Router();

// Import multer middleware we created earlier
const upload = require("../middleware/fileUpload");
const authenticatemiddleware = require("../middleware/auth");

// Import the controller that handles logic for adding staff
const userController = require("../controllers/userController");


router.post("/auth/login", userController.userLogin);

//Route to add a staff member
router.post(
  "/add/staff",
  // This middleware tells multer to expect:
  // - 1 file under "uploadPhoto"
  // - up to 5 files under "educationDocument"
  upload.fields([
    { name: "uploadPhoto", maxCount: 1 }, // one profile image
    { name: "educationDocument", maxCount: 5 }, // multiple supporting docs
  ]),

  // Future enhancement: Enable auth once JWT is set up
  // authenticatemiddleware.authenticate,

  // After files are parsed, control goes to the controller
  userController.addUser
);

router.get(
  "/download/:userId/:filename",
  authenticatemiddleware.authenticate,
  userController.downloadDocument
);

//Export router to be used in your app
module.exports = router;
