const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
require('dotenv').config();

let gfsBucket = null;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB conectado com sucesso!');

    if (mongoose.connection.readyState === 1) {
      try {
        gfsBucket = new GridFSBucket(mongoose.connection.db, {
          bucketName: 'uploads'
        });
        console.log('✅ GridFSBucket inicializado imediatamente após ligação!');
      } catch (erroBucket) {
        console.error('❌ Erro ao inicializar o GridFSBucket:', erroBucket);
      }
    } else {
      console.warn('⚠️ Conexão não está em estado 1 (ready)');
    }

  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  gfsBucket: () => gfsBucket
};
