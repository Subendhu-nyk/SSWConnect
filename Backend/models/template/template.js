module.exports = (sequelize, DataTypes) => {
  const Template = sequelize.define('template', {
    templateName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fields: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING, // or FK to user
      allowNull: true,
    },
  });

  return Template;
};
