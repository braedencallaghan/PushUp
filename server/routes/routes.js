import express from 'express';
import "dotenv/config";
import {MongoClient, ObjectId} from 'mongodb';

const router = express.Router();

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db('PushUpShowdown');

router.use(express.static("client"));

router.post('/image', async (req, res) => {
    // Handle POST request to /api/users here
});

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



