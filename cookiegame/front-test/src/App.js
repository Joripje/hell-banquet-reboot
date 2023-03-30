// import React, { useState } from "react";
// import Webcam from "react-webcam";

// const App = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const webcamRef = React.useRef(null);

//   const handleToggleRecording = () => {
//     setIsRecording(!isRecording);
//   };

//   const videoConstraints = {
//     facingMode: "user",
//   };

//   return (
//     <>
//       <button onClick={handleToggleRecording}>
//         {isRecording ? "Stop Recording" : "Start Recording"}
//       </button>
//       {isRecording && (
//         <Webcam
//           audio={false}
//           height={720}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           width={1280}
//           videoConstraints={videoConstraints}
//           onUserMedia={() => {
//             const videoSrc = window.URL.createObjectURL(webcamRef.current.stream);
//             const videoEl = document.getElementById("video");
//             videoEl.srcObject = webcamRef.current.stream;
//             videoEl.play();
//           }}
//         />
//       )}
//       <video id="video" width="1280" height="720"></video>
//     </>
//   );
// };

// export default App;

import React, { useState } from "react";
import Webcam from "react-webcam";
import cv from "opencv.js";

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const videoConstraints = {
    facingMode: "user",
  };

  const onUserMedia = () => {
    const videoEl = document.getElementById("video");
    videoEl.srcObject = webcamRef.current.stream;
    videoEl.play();

    const context = canvasRef.current.getContext("2d");

    const onFrame = () => {
      const video = webcamRef.current.video;
      const mat = cv.imread(video);
      const grayMat = new cv.Mat();
      const faceCascade = new cv.CascadeClassifier();
      const mouths = new cv.RectVector();

      cv.cvtColor(mat, grayMat, cv.COLOR_RGBA2GRAY);
      cv.equalizeHist(grayMat, grayMat);

      faceCascade.load("./haarcascade_frontalface_default.xml");
      faceCascade.detectMultiScale(grayMat, mouths, 1.1, 3, 0);

      for (let i = 0; i < mouths.size(); i++) {
        const mouth = mouths.get(i);

        const x = mouth.x;
        const y = mouth.y;
        const w = mouth.width;
        const h = mouth.height;

        const mar = calculateMAR(mouth, grayMat);

        const text = `MAR: ${mar.toFixed(2)}`;
        const fontFace = cv.FONT_HERSHEY_SIMPLEX;
        const fontScale = 1.5;
        const thickness = 2;
        const color = new cv.Scalar(0, 255, 0);

        if (mar > 0.5) {
          cv.putText(
            mat,
            text,
            new cv.Point(x, y - 5),
            fontFace,
            fontScale,
            color,
            thickness
          );
          cv.rectangle(
            mat,
            new cv.Point(x, y),
            new cv.Point(x + w, y + h),
            color,
            thickness
          );
        }
      }

      cv.imshow(canvasRef.current, mat);
      mat.delete();
      grayMat.delete();
      mouths.delete();
      requestAnimationFrame(onFrame);
    };

    requestAnimationFrame(onFrame);
  };

  const calculateMAR = (mouth, grayMat) => {
    const A = cv.norm(
      new cv.Point(mouth.x + (mouth.width * 1) / 8, mouth.y + mouth.height / 2),
      new cv.Point(mouth.x + (mouth.width * 2) / 8, mouth.y + mouth.height / 2),
      cv.NORM_L2
    );
    const B = cv.norm(
      new cv.Point(mouth.x + (mouth.width * 6) / 8, mouth.y + mouth.height / 2),
      new cv.Point(mouth.x + (mouth.width * 7) / 8, mouth.y + mouth.height / 2),
      cv.NORM_L2
    );
    const C = cv.norm(
      new cv.Point(mouth.x + mouth.width / 2, mouth.y + (mouth.height * 2) / 3),
      new cv.Point(mouth.x + mouth.width / 2, mouth.y + (mouth.height * 2) / 3),
      cv.NORM_L2
    );
    const mar = (A + B) / (2 * C);
    return mar;
  };
  const stopCamera = () => {
    const video = webcamRef.current.video;
    const stream = video.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <>
      <button onClick={handleToggleRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {isRecording && (
        <>
          <Webcam
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
            onUserMedia={onUserMedia}
          />
          <canvas ref={canvasRef} width="1280" height="720"></canvas>
        </>
      )}
      <video id="video" width="1280" height="720"></video>
    </>
  );
};

export default App;
