const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config();

const storage = new GridFsStorage({
  url: process.env.MONGO_URI, // substitui pelo teu URI se necessário
  file: (req, file) => {
    const metadata = {
      tarefaId: req.params.id || null,
      iv: req.body.iv || null,
    };

    return {
      filename: file.originalname,
      metadata,
      bucketName: 'anexos' // opcional, usa 'fs' por defeito
    };
  }
});

const upload = multer({ storage });

module.exports = upload;
