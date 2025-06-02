const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose'); // para gerar ObjectId

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: () => {
    return new Promise((resolve, reject) => {
      const _id = new mongoose.Types.ObjectId(); // ✅ gera ID único manualmente
      const fileInfo = {
        _id, // 👈 este é o campo que a lib espera
        filename: `${Date.now()}-upload`,
        bucketName: 'anexos',
        metadata: {
          enviadoPor: 'worknest'
        }
      };
      resolve(fileInfo);
    });
  }
});

const upload = multer({ storage });

module.exports = upload;
