import React, { useState } from 'react';
import WebcamComponent from '../components/WebcamComponent';
import styles from '../styles/componentStyles.module.css';

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
}

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>counter: {count}</h1>
            <br />
            <button
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block',
        }}
        onClick={() => setCount(count + 1)}
      >
        Click me
      </button>
        </div>
    );
}

function Home() {
  return (
    <div>
      <h1 className={styles['centered-heading']}>PushUp ShowDown</h1>
      <div className={styles['video-container']}><VideoStream /></div>
      <div className={styles['centered-element']}><Counter /></div>
    </div>
  )
}

export default Home;
