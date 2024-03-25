const assignRepairmentController = require('../controllers/repairment/assignRepairment');
const createRepairmentController = require('../controllers/repairment/createRepairment');
const getRepairmentDetailController = require('../controllers/repairment/getRepairmentDetail');
const getUserRepairmentJob = require('../controllers/repairment/getUserRepairmentJob');
const { verifyToken, allowRole } = require('../middlewares/auth');

const routes = require('express').Router();

routes.post('/create', verifyToken, allowRole('produksi'), createRepairmentController);
routes.patch('/assign/:id', verifyToken, assignRepairmentController);
routes.get('/', verifyToken, getUserRepairmentJob);
routes.get('/:id', verifyToken, getRepairmentDetailController);

module.exports = routes;
