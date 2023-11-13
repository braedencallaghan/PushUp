import React, { useState } from 'react';
import WebcamComponent from '../components/WebcamComponent';
import styles from '../styles/componentStyles.module.css';

function Counter({ count, setCount }) {
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

function State({ pushupState }) {
  return (
    <div>
      <h1>State: {JSON.stringify(pushupState)}</h1>
    </div>
  );
}

function Home(){
  const [capturedImage, setCapturedImage] = useState(null);
  const [count, setCount] = useState(0);
  const [pushupState, setPushupState] = useState({})

  const handleCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
  };

  return (
    <div>
      <h1 className={styles['centered-heading']}>PushUp ShowDown</h1>
      <WebcamComponent onCapture={handleCapture} setPushupState={setPushupState} pushupState={pushupState} count={count} setCount={setCount}/>
      {capturedImage && (
        <div>
          <img src={capturedImage} alt="Captured" />
          {/* <button onClick={handleSendToServer}>Send to Server</button> */}
        </div>
      )}
      <div className={styles['centered-element']}><Counter count={count} setCount={setCount} /></div>
      <div className={styles['centered-element']}><State pushupState={pushupState} /></div>
    </div>
  );
}

export default Home;
