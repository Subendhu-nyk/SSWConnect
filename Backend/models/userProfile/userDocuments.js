// models/userDocuments.js
module.exports = (sequelize, DataTypes) => {
    const UserDocuments = sequelize.define("UserDocuments", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file_label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      original_filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stored_filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mimetype: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      uploaded_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  
    UserDocuments.associate = (models) => {
      UserDocuments.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "user_id",
      });
    };
  
    return UserDocuments;
  };
  