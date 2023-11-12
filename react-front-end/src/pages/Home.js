import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/componentStyles.module.css';

function VideoStream() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function getMedia() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          let video = videoRef.current;
          video.srcObject = stream;
          await video.play();
        } catch (err) {
          console.error("Error accessing the webcam: ", err);
        }
      }
    }
    getMedia();
  }, []);

  return (
    <div>
      <video ref={videoRef}/>
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

export default Home
