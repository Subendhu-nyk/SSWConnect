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
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
    },
    section: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'attendances',
    timestamps: true,
  });

  Attendance.associate = models => {
    Attendance.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return Attendance;
};
