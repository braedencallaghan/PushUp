import React, { useState } from 'react';
import WebcamComponent from '../components/WebcamComponent';

const Home = () => {
  const [capturedImage, setCapturedImage] = useState(null);

  const handleCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
  };

  const handleSendToServer = () => {
    fetch('http://localhost:3000/process-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: capturedImage }),
    })
      .then(response => response.json())
    .then(response => {
      // Handle the response from the server
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error sending image to server:', error);
    });
  };

  return (
    <div>
      <WebcamComponent onCapture={handleCapture} />
      {capturedImage && (
        <div>
          <img src={capturedImage} alt="Captured" />
          <button onClick={handleSendToServer}>Send to Server</button>
        </div>
      )}
    </div>
  );
};

export default Home;
