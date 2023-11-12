import React, { useState } from 'react';
import WebcamComponent from '../components/WebcamComponent';
import styles from '../styles/componentStyles.module.css';

function Counter() {
    const [count, setCount] = useState(0);
    const [pushupState, setPushupState] = useState({})

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

function State() {
  const [pushupState, setPushupState] = useState({})
  
  return (
    <div>
      <h1>State: {pushupState}</h1>
    </div>
  );
}

function Home(){
  const [capturedImage, setCapturedImage] = useState(null);

  const handleCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
  };

  async function handleSendToServer() {
    const res = await fetch('http://localhost:5000/process-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: capturedImage }),
    })
  };

  return (
    <div>
      <h1 className={styles['centered-heading']}>PushUp ShowDown</h1>
      <WebcamComponent onCapture={handleCapture} setPushupState={setPushupState} pushupState={pushupState} count={count} setCount={setCount}/>
      {capturedImage && (
        <div>
          <img src={capturedImage} alt="Captured" />
          <button onClick={handleSendToServer}>Send to Server</button>
        </div>
      )}
      <div className={styles['centered-element']}><Counter /></div>
      <div className={styles['centered-element']}><State/></div>
    </div>
  );
}

export default Home;
