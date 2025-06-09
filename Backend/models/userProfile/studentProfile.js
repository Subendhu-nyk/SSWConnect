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
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    section: {
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
    user_id: {
      // defines FK column directly
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  StudentProfile.associate = (models) => {
    StudentProfile.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "user_id",
      as: "User",
    });
  };

  return StudentProfile;
};
