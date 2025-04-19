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
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
      targetKey: "user_id",
    });
  };

  return TeacherProfile;
};
