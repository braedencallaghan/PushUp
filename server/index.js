import dotenv from 'dotenv';
import express from 'express';
import router from './routes/routes.js';
import morgan from 'morgan';
import cors from 'cors';
import { spawn } from 'child_process';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

app.use('/', router);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
