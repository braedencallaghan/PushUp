import express from 'express';
import "dotenv/config";
import {MongoClient, ObjectId} from 'mongodb';
import { spawn } from 'child_process';

const router = express.Router();

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db('PushUpShowdown');

router.use(express.static("client"));

router.post('/process-image', async (req, res) => {
    // // Handle POST request to /api/users here
    // const body = req.body;

    // const pythonProcess = spawn('python',["./predictor/predictor.py", body.image]);

    // pythonProcess.stdout.on('data', async (data) => {
    //   console.log(data.toString());
    //   res.json({class: data.toString()})
    // })
    const response = await fetch('http://localhost:8080/predictions/pushup-detector', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {data: req.body.image},
    })
    const json = await response.json();
    res.json(json);
  })

router.post('/register', async (req, res) => {
    const user = req.body;
    let collection = db.collection("Users");
    if(user.username === '' || user.password === '') {
        res.status(404).send();
    }
    
    let result = await collection.updateOne(
        {
            username: user.username
        },
        {
            $setOnInsert: user
        },
        {upsert: true}
  );
  
  if(result.upsertedId === null) {
    res.status(404).send();
  }

  else {
    res.status(200).send();
  }
});

export default router;



