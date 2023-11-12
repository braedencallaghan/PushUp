// require('dotenv').config();

import dotenv from 'dotenv';
import express from 'express';
import {MongoClient} from 'mongodb';
import imageRouter from './routes/imageRouter.js';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

async function startServer() {
    // Use process.env.MONGODB_URI to access the MongoDB connection string
    const client = new MongoClient(process.env.MONGODB_URL);

    
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    // Your routes and other application logic go here

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

startServer();

app.use(express.json());
app.use(bodyParser.json());

const imageRouter = imageRouter();

app.use('/api/users', imageRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});