module.exports = (sequelize, DataTypes) => {
  const StudentProfile = sequelize.define("StudentProfile", {
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fatherName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fatherMobileNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    certificates: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: { // defines FK column directly
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  StudentProfile.associate = (models) => {
     // This adds user_id FK to StudentProfile and links it to User.user_id
    StudentProfile.belongsTo(models.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
      targetKey: "user_id", // this assumes we're linking to User.user_id
    });
  };

  return StudentProfile;
};
