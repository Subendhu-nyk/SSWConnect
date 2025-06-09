module.exports = (sequelize, DataTypes) => {
  const TeacherProfile = sequelize.define("TeacherProfile", {
    education: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    workshop: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  TeacherProfile.associate = (models) => {
    TeacherProfile.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "user_id",
      as: "User",
    });
  };

  return TeacherProfile;
};
