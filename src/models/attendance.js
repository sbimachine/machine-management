'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
    }
  }
  Attendance.init(
    {
      status: {
        type: DataTypes.ENUM,
        values: ['out', 'present', 'sick', 'leave'],
        allowNull: false,
        validate: {
          notNull: { msg: 'Attendance status is required' },
        },
      },
      clockOut: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Attendance',
      tableName: 'attendances',
      paranoid: true,
      underscored: true,
      indexes: [
        {
          fields: ['status'],
          unique: false,
          name: 'status',
        },
        {
          fields: ['user_id', 'created_at'],
          unique: false,
        },
      ],
    }
  );

  return Attendance;
};
