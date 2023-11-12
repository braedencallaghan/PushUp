import dotenv from 'dotenv';
import express from 'express';
<<<<<<< HEAD
import {MongoClient} from 'mongodb';
import imageRouter from './routes/imageRouter.js';
import bodyParser from 'body-parser';
=======
import router from './routes/routes.js';
>>>>>>> main

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
<<<<<<< HEAD
app.use(bodyParser.json());

const imageRouter = imageRouter();

app.use('/api/users', imageRouter);
=======
app.use(router);
>>>>>>> main


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});