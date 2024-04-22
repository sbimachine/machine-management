const asyncErrorHandler = require('../asyncErrorHandler');
const { Machine, Sequelize } = require('../../models');
const sendResponse = require('../../utils/sendResponse');
const getPagination = require('../../utils/getPagination');

const getAllMachinesController = asyncErrorHandler(async (req, res, next) => {
  const { sort = 'newest', status, page = 1, limit = 10, machineName, category, buyDate, categoryId } = req.query;
  let sortBy = null;
  if (sort === 'oldest') sortBy = [['buyDate', 'ASC']];
  if (sort === 'newest') sortBy = [['buyDate', 'DESC']];
  if (sort === 'category') sortBy = [['categoryName', 'ASC']]; // Corrected sort logic
  const offset = (parseInt(page) - 1) * parseInt(limit || 10);

  const conditions = {
    ...(status ? { status } : {}),
    ...(categoryId ? { categoryId: parseInt(categoryId) } : {}),
    ...(machineName ? { machineName: { [Sequelize.Op.iLike]: `%${machineName.toLowerCase()}%` } } : {}),
    ...(buyDate ? { buyDate } : {}),
  };
  const { count, rows: machines } = await Machine.findAndCountAll({
    where: conditions,
    ...(!sortBy ? {} : { order: sortBy }),
    offset,
    limit: parseInt(limit || 10),
    attributes: ['id', 'machineName', 'status', 'categoryId', 'categoryName', 'buyDate','imageUrl','description'],
  });
  const pagination = getPagination(count, page, limit);

  const data = {
    machines: !machines || machines.length == 0 ? [] : machines,
    pagination,
  };

  sendResponse(res, 'Machine list', data);
});

module.exports = getAllMachinesController;
