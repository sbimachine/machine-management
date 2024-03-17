'use strict';
const { Model } = require('sequelize');
const { checkPassword, checkPhoneNumber } = require('../utils/validation');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: { msg: 'Email already taken', name: 'email' },
        allowNull: false,
        validate: {
          notNull: { msg: 'Email is required' },
          isEmail: { msg: 'Invalid email format' },
        },
      },
      username: {
        type: DataTypes.STRING,
        unique: { msg: 'Username already taken', name: 'username' },
        allowNull: false,
        validate: {
          notNull: { msg: 'Username is required' },
          isLowercase: { msg: 'All username charcacter must be lowercase' },
          len: {
            args: [6, 20],
            msg: 'Username must be 6-20 character',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Password is required' },
          checkPassword,
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'First name is required' },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Last name is required' },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: 'Phone number already taken', name: 'phone' },
        validate: {
          checkPhoneNumber,
          notNull: { msg: 'Phone number is required' },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: { msg: 'invalid url format' },
        },
      },
      role: {
        type: DataTypes.ENUM,
        values: ['supervisior', 'leader', 'teknisi', 'produksi'],
        allowNull: false,
        validate: {
          notNull: { msg: 'role need to be specified' },
        },
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
      paranoid: true,
    }
  );

  User.beforeCreate(async (user, _) => {
    const password = await bcrypt.hash(user.password, 10);
    user.password = password;
  });

  User.prototype.comparePassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      console.log(error);
      throw new Error('error comparing password');
    }
  };

  User.beforeUpdate(async (user) => {});
  return User;
};
