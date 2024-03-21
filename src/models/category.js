'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Machine }) {
      // define association here
      this.hasMany(Machine, { as: 'machine', foreignKey: 'category_id' });
    }
  }
  category.init(
    {
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { name: 'categoryName', msg: 'Category name already exist' },
        validate: {
          notNull: { msg: 'Category name is required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
      underscored: true,
    }
  );
  return category;
};
