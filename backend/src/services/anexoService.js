// backend/src/services/anexoService.js
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs;

mongoose.connection.once('open', () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('anexos');
});

const obterAnexoPorNome = (nomeFicheiro) => {
  return new Promise((resolve, reject) => {
    gfs.files.findOne({ filename: nomeFicheiro }, (err, file) => {
      if (err || !file) return reject('Ficheiro não encontrado');
      const readstream = gfs.createReadStream({ filename: nomeFicheiro });
      resolve({ file, readstream });
    });
  });
};

module.exports = {
  obterAnexoPorNome
};
