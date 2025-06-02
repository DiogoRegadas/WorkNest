const multer = require('multer');

// Armazena ficheiros na RAM (podemos guardar em buffer antes de passar para o GridFS)
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
