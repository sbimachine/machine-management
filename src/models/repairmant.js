'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class repairment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Machine, RepairmentImage, ReportedImage }) {
      // define association here
      this.belongsTo(Machine, { as: 'machine', foreignKey: 'machine_id' });
      this.belongsTo(User, { as: 'technician', foreignKey: 'user_id' });
      this.belongsTo(User, { as: 'leader', foreignKey: 'leader_id' });
      this.hasMany(RepairmentImage, { as: 'images', foreignKey: 'repairment_id', onDelete: 'CASCADE' });
      this.hasMany(ReportedImage, { as: 'reportedImages', foreignKey: 'repairment_id', onDelete: 'CASCADE' });
    }
  }
  repairment.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      repairmentDate: {
        type: DataTypes.DATE,
      },
      machineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'machines',
          key: 'id',
        },
        validate: {
          notNull: { msg: 'machine id cannot be empty' },
        },
      },
      category: {
        type: DataTypes.ENUM,
        values: ['Ringan', 'Berat'],
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: [
          'Menunggu Konfirmasi',
          'Proses Perbaikan',
          'Indent Sparepart',
          'Tidak Bisa Diperbaiki',
          'Selesai Diperbaiki',
        ],
        allowNull: false,
        defaultValue: 'Menunggu Konfirmasi',
        validate: {
          notNull: { msg: 'Repairement status is required' },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'description is required' },
        },
      },
      isReported: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Repairment',
      underscored: true,
      tableName: 'repairments',
    }
  );
  return repairment;
};
