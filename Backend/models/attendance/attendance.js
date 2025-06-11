module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('attendance', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      // references: {
      //   model: 'users',       // must match the table name (not model file name)
      //   key: 'user_id',       // the target key in users model
      // },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Present', 'Absent', 'Leave'),
      allowNull: false,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Student-specific
    year: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    section: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Teacher-specific
    subjectCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lectureType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    period: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Staff-specific
    dutyType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'attendances',
    timestamps: true,
  });

  // Attendance.associate = (models) => {
  //   Attendance.belongsTo(models.User, {
  //     foreignKey: 'user_id',    // refers to attendance.user_id
  //     targetKey: 'user_id',     // refers to users.user_id
  //     as: 'user',
  //   });
  // };

  return Attendance;
};
