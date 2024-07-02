'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reportedImage extends Model {
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
  reportedImage.init(
    {
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
      modelName: 'ReportedImage',
      tableName: 'reported_image',
    }
  );
  return reportedImage;
};
