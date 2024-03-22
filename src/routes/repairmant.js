const createRepairmentController = require('../controllers/repairment/createRepairment');
const { verifyToken, allowRole } = require('../middlewares/auth');

const routes = require('express').Router();

routes.post('/create', verifyToken, allowRole('produksi'), createRepairmentController);

module.exports = routes;
