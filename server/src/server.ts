const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import mongoose from 'mongoose'; // Import mongoose for MongoDB connection

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

// Connect to MongoDB
const mongoUsername = process.env.DB_USERNAME; // Get username from .env
const mongoPassword = process.env.DB_PASSWORD; // Get password from .env
const mongoURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@your-cluster.mongodb.net/your-database?retryWrites=true&w=majority`;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected successfully');
    // Sync Sequelize and start the server after MongoDB connection is established
    return sequelize.sync({ force: forceDatabaseRefresh });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error('MongoDB connection error:', err);
  });
