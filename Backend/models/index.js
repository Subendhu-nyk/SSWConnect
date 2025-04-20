// 1. Import Sequelize ORM
const Sequelize = require('sequelize');

// 2. Import database connection 
const sequelize = require('../util/sswconnectDatabase');

// 3. Creates a blank object to hold all models and Sequelize config
const db = {};

// 4. Add Sequelize library and connected instance into db 
db.Sequelize = Sequelize;       // Sequelize class itself (for access to DataTypes, etc.)
db.sequelize = sequelize;       // connected Sequelize instance

// 5. Import models and inject sequelize instance + DataTypes

// Example: import model and attach it to db.User
db.User = require('./userProfile')(sequelize, Sequelize.DataTypes);
db.StudentProfile = require('./studentProfile')(sequelize, Sequelize.DataTypes);
db.TeacherProfile = require('./TeacherProfile')(sequelize, Sequelize.DataTypes);
db.StaffProfile = require('./StaffProfile')(sequelize, Sequelize.DataTypes);

// For academic structure
// db.Department = require('./Department')(sequelize, Sequelize.DataTypes);
// db.Course = require('./Course')(sequelize, Sequelize.DataTypes);

// 6. Loop through all loaded models and if they define `.associate()` method, call it.
// This is where relationships like hasOne, belongsTo, hasMany are initialized.
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    // Call associate function of each model with the full db object
    // This allows models to define associations like:
    //    User.hasOne(models.StudentProfile)
    //    StudentProfile.belongsTo(models.User)
    db[modelName].associate(db);
  }
});

// 7. Export the full db object containing all models + Sequelize connection
// We can now use: const db = require('../models') anywhere in our app
module.exports = db;
