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
  return (
    <h1>counter: 1</h1>
  )
}

function App() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <VideoStream />
      <Counter />
    </div>
  )
}

export default App