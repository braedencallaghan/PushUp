import React, { useState, useEffect, useRef } from 'react';

function VideoStream() {
  const videoRef = useRef(null);

    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    let video = videoRef.current;
                    video.srcObject = stream;
                    video.play();
                })
                .catch(err => {
                    console.error("Error accessing the webcam: ", err);
                });
        }
    }, []);

    return (
        <div>
            <video ref={videoRef} />
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