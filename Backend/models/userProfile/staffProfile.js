module.exports = (sequelize, DataTypes) => {
  const StaffProfile = sequelize.define("StaffProfile", {
    education: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience: {
      type: DataTypes.STRING,
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

  StaffProfile.associate = (models) => {
    StaffProfile.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "user_id",
      as: "User",
    });
  };

  return StaffProfile;
};
