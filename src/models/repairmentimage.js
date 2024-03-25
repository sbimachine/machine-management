'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class repairmentImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Repairment }) {
      // define association here
      this.belongsTo(Repairment, { as: 'repairment', foreignKey: 'repairment_id' });
    }
  }
  repairmentImage.init(
    {
      repairmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'repairment id is required' },
        },
        references: {
          key: 'id',
          model: 'repairments',
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: 'Invalid url image' },
          notNull: { msg: 'Image URL is required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'RepairmentImage',
      underscored: true,
      tableName: 'repairment_image',
    }
  );
  return repairmentImage;
};
