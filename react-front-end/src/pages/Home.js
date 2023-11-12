import React, { useState, useEffect, useRef } from 'react';

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
    <><h1>counter: {count}</h1><button onClick={() => setCount(count + 1)}>
      Click me
    </button></>
  )
}

function Home() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <VideoStream />
      <Counter />
    </div>
  )
}

export default Home
