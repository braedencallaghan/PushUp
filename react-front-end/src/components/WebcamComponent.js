import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

const WebcamComponent = ({ onCapture }) => {
  const webcamRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc);
      }
    }, 200); // Capture every 200 milliseconds (5 times a second)

    return () => clearInterval(interval);
  }, [onCapture]);

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
