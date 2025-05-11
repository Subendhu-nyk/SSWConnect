module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define('department', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      departmentName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      departmentId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      departmentCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hodId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      contactNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      departmentType: {
        type: DataTypes.STRING, // will store comma-separated values like 'UG,PG'
        allowNull: true,
      },
      buildingLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      establishedYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          len: [4, 4],
        },
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      associatedCourses: {
        type: DataTypes.STRING, 
        allowNull: true,
      },      
    });
  
    // Optional Associations
    // Department.associate = (models) => {
    //   Department.belongsTo(models.user, {
    //     foreignKey: 'hodId',
    //     as: 'hod',
    //   });
    //   Department.belongsTo(models.user, {
    //     foreignKey: 'createdBy',
    //     as: 'creator',
    //   });
    // };
  
    return Department;
  };
  