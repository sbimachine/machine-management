'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class machine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, Repairment }) {
      // define association here
      this.belongsTo(Category, { as: 'category', foreignKey: 'category_id' });
      this.hasMany(Repairment, { as: 'repairments', foreignKey: 'machine_id' });
    }
  }
  machine.init(
    {
      machineName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Machine name is required' },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
        validate: {
          notNull: {
            msg: 'Category id is required',
          },
        },
      },
      status: {
        type: DataTypes.ENUM,
        values: ['rusak', 'ready', 'perbaikan'],
        allowNull: false,
        defaultValue: 'ready',
        validate: {
          notNull: { msg: 'Machine status is required' },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Image url is required' },
          isUrl: { msg: 'Invalid image url' },
        },
      },

      buyDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: { msg: 'Buy date is required' },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: 'description is required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Machine',
      tableName: 'machines',
      underscored: true,
      paranoid: true,
    }
  );

  return machine;
};
