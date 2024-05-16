const asyncErrorHandler = require('../asyncErrorHandler');
const { User, Sequelize } = require('../../models');
const getPagination = require('../../utils/getPagination');
const sendResponse = require('../../utils/sendResponse');

const getAllUserController = asyncErrorHandler(async (req, res, next) => {
  const { firstName, lastName, role, page = 1, limit = 10, sort, sortDirection = 'DESC' } = req.query;
  let sortBy = [['createdAt', sortDirection]];
  if (sort === 'firstName') sortBy = [['firstName', sortDirection]];
  if (sort === 'lastName') sortBy = [['lastName', sortDirection]];
  if (sort === 'role') sortBy = [['role', sortDirection]];
  const offset = (parseInt(page) - 1) * parseInt(limit || 10);

  const conditions = {
    ...(role ? { role } : {}),
    ...(firstName ? { firstName: { [Sequelize.Op.iLike]: `%${firstName.toLowerCase()}%` } } : {}),
    ...(lastName ? { lastName: { [Sequelize.Op.iLike]: `%${lastName.toLowerCase()}%` } } : {}),
  };

  const { count, rows: users } = await User.findAndCountAll({
    where: conditions,
    ...(!sortBy ? {} : { order: sortBy }),
    offset,
    limit: parseInt(limit || 10),
    attributes: ['firstName', 'lastName', 'role', 'imageUrl', 'email', 'username'],
  });
  const pagination = getPagination(count, page, limit);

  const data = { users: users && users.length > 0 ? users : [], pagination };

  sendResponse(res, 'User List', data);
});

module.exports = getAllUserController;
