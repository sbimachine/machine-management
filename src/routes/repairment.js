const assignRepairmentController = require('../controllers/repairment/assignRepairment');
const createRepairmentController = require('../controllers/repairment/createRepairment');
const deleteRepairmentController = require('../controllers/repairment/deleteRepairment');
const editRepairmentController = require('../controllers/repairment/editRepairment');
const getRepairmentDetailController = require('../controllers/repairment/getRepairmentDetail');
const getUserRepairmentJob = require('../controllers/repairment/getUserRepairmentJob');
const reportRepairmentController = require('../controllers/repairment/reportRepairment');
const { verifyToken, allowRole } = require('../middlewares/auth');
const { upload, cloudinaryUpload } = require('../middlewares/upload');

const routes = require('express').Router();

routes.post('/create', verifyToken, allowRole('produksi'), createRepairmentController);
routes.patch(
  '/report/:id',
  verifyToken,
  allowRole('teknisi'),
  upload.multiple,
  cloudinaryUpload('repairment', true),
  reportRepairmentController
);
routes.patch('/edit/:id', verifyToken, allowRole('produksi'), editRepairmentController);
routes.patch('/assign/:id', verifyToken, allowRole('leader'), assignRepairmentController);
routes.get('/', verifyToken, getUserRepairmentJob);
routes.delete('/:id', verifyToken, allowRole('leader'), deleteRepairmentController);
routes.get('/:id', verifyToken, getRepairmentDetailController);

module.exports = routes;
