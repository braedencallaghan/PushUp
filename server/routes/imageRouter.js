import express from 'express';
const imageRouter = express.Router();

imageRouter.post('/', async (req, res) => {
  const { image } = req.body;

  // Process the image using your PyTorch model
  // You may want to use a Python script, a separate server, or a library like TensorFlow.js

  // For demonstration, let's log the image URL and send a response
  console.log('Received image:', image);
  res.json({ message: 'Image received and processed successfully.' });
});

module.exports = imageRouter;



