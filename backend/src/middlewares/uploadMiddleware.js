const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: `${Date.now()}-${file.originalname}`,
        bucketName: 'anexos',
        metadata: {
          originalname: file.originalname,
          mimetype: file.mimetype
        }
      };
      resolve(fileInfo);
    });
  }
});

const upload = multer({ storage });

module.exports = upload;
