const multer = require('multer');
const CustomError = require('../../utils/CustomError');

const options = {
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
    const errorMessage = 'Only jpg, png, jpeg, and webp are allowed';
    if (!allowedTypes.includes(file.mimetype)) return cb(new Error(errorMessage), false);
    cb(null, true);
  },
  limits: 2 * 1024 * 1024,
};

const uploadSingle = multer(options).single('image');
const single = (req, res, next) => {
  uploadSingle(req, res, (err) => {
    if (err) {
      console.log('single upload error', err);
      return next(new CustomError(err.message, 400));
    }
    next();
  });
};

const uploadMultiple = multer(options).array('images');

const multiple = (req, res, next) => {
  uploadMultiple(req, res, (err) => {
    if (err) {
      console.log('multiple upload error', err);
      return next(new CustomError(err.message, 400));
    }
    next();
  });
};

module.exports = { single, multiple };
