import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

async function handleSendToServer(img) {
  const res = await fetch('http://localhost:5000/process-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: img }),
  })
  return await res.json();
};

const WebcamComponent = ({ onCapture, setPushupState }) => {
  const webcamRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc);

        try {
          const res = await handleSendToServer(imageSrc);
          setPushupState(res);
        } catch (err) {
          console.log(err);
        }
      }
    }, 1000); // Capture every 200 milliseconds (5 times a second)

    return () => clearInterval(interval);
}, [onCapture, setPushupState]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
    </div>
  );
};

export default WebcamComponent;
