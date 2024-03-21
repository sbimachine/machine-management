const createMachine = require('../controllers/machine/createMachine');
const editMachineController = require('../controllers/machine/editMachine');
const getAllMachinesController = require('../controllers/machine/getAllMachines');
const getMachineByIdController = require('../controllers/machine/getMachineById');
const { verifyToken, allowRole } = require('../middlewares/auth/');
const { cloudinaryUpload, upload } = require('../middlewares/upload');
const routes = require('express').Router();

routes.post(
  '/create',
  verifyToken,
  allowRole('supervisior'),
  upload.single,
  cloudinaryUpload('machine', true),
  createMachine
);

routes.get('/all', verifyToken, getAllMachinesController);
routes.patch(
  '/edit/:id',
  verifyToken,
  allowRole('supervisior'),
  upload.single,
  cloudinaryUpload('machine', true),
  editMachineController
);
routes.get('/:id', verifyToken, getMachineByIdController);

module.exports = routes;
