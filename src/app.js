const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('./config/dotenv');
//const connectDB = require('./config/db');

//connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);

module.exports = app;