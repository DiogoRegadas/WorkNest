// backend/src/middlewares/uploadMiddleware.js
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: 'anexos'
    };
  }
});

const upload = multer({ storage });

module.exports = upload;
