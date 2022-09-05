import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

const Classifier = () => {
  const canvasRef = useRef();
  const imageRef = useRef();
  const videoRef = useRef();
  const classifying = useRef(false);

  const [result, setResult] = useState('');

  useEffect(() => {
    async function getCameraStream() {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }

    getCameraStream();
  }, []);

  const captureImageFromCamera = useCallback(() => {
    const context = canvasRef.current.getContext('2d');
    const { videoWidth, videoHeight } = videoRef.current;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

    canvasRef.current.toBlob((blob) => {
      imageRef.current = blob;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (classifying.current) return;
      classifying.current = true;

      captureImageFromCamera();

      if (imageRef.current) {
        const formData = new FormData();
        formData.append('image', imageRef.current);
        try {
          const response = await fetch('http://localhost:5000/classify', {
            method: 'POST',
            body: formData,
          });

          if (response.status === 200) {
            const text = await response.text();
            setResult(`Currently seeing: ${text}`);
          } else {
            setResult('Error from API.');
          }
        } catch (error) {
          setResult(`Generic error: ${error}`);
        }
      }
      classifying.current = false;
    }, 2000);
    return () => clearInterval(interval);
  }, [captureImageFromCamera]);

  const playCameraStream = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <>
      <video ref={videoRef} onCanPlay={playCameraStream} id="video">
        <track kind="captions" />
      </video>
      <canvas ref={canvasRef} hidden />
      <p>{result}</p>
    </>
  );
};

export default Classifier;
