const dataUriParser = require('datauri/parser');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const cloudinary = require('../../../config/cloudinary');
const CustomError = require('../../utils/CustomError');

const cloudinaryUpload = (folderName, random) => async (req, res, next) => {
  const { file, files, userPayload } = req;

  if (!file && !files) {
    next();
  }

  if (file) {
    console.log('start uploading image to cloudinary');

    try {
      const parser = new dataUriParser();
      const buffer = file.buffer;
      const ext = path.extname(file.originalname).toString();
      const datauri = parser.format(ext, buffer);

      const upload = await cloudinary.uploader.upload(datauri.content, {
        public_id: random ? uuidv4() : userPayload.id,
        folder: folderName,
      });

      const uploadedImage = `https${upload.url.slice(4)}`;
      req.image = uploadedImage;

      console.log('image uploaded');

      next();
    } catch (err) {
      console.log('upload cloudinary error', err);

      return next(new CustomError('error uploading image', 500));
    }
  } else if (files) {
    console.log('start uploading images to cloudinary');
    req.images = [];

    const uploadPromises = files.map(async (file) => {
      const parser = new dataUriParser();
      const buffer = file.buffer;
      const ext = path.extname(file.originalname).toString();
      const datauri = parser.format(ext, buffer);

      const upload = await cloudinary.uploader.upload(datauri.content, {
        public_id: uuidv4(),
        folder: folderName,
      });

      return `https${upload.url.slice(4)}`;
    });

    try {
      const uploadedImages = await Promise.all(uploadPromises);
      req.images = uploadedImages;

      console.log('images uploaded');

      next();
    } catch (err) {
      console.log('upload cloudinary error', err);

      return next(new CustomError('error uploading image', 500));
    }
  }
};

module.exports = cloudinaryUpload;
