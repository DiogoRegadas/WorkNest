const multer = require('multer');

// Armazena ficheiros na memória
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
