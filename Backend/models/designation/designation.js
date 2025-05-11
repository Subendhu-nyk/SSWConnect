module.exports = (sequelize, DataTypes) => {
    const Designation = sequelize.define('designation', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      designationName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      designationCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      applicableRoles: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    });
  
    return Designation;
  };
  