const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: async (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: 'anexos',
      metadata: {
        originalname: file.originalname,
        mimetype: file.mimetype
      }
    };
  }
});

const upload = multer({ storage });

module.exports = upload;
