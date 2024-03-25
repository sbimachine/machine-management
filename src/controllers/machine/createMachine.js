const asyncErrorHandler = require('../asyncErrorHandler');
const { Machine } = require('../../models');
const sendResponse = require('../../utils/sendResponse');

const createMachine = asyncErrorHandler(async (req, res, next) => {
  const {
    body: { machineName, buyDate, description, categoryId, categoryName },
    image: imageUrl,
  } = req;

  const machine = await Machine.create({ machineName, buyDate, description, categoryId, imageUrl, categoryName });
  sendResponse(res, 'Machine created', machine, 201);
});

module.exports = createMachine;
