import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import styled from "styled-components";
import { Button } from "@mui/material";

const Camera = forwardRef(({ onCapture }, ref) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const streamRef = useRef();
  const [isRecording, setIsRecording] = useState(false);

  useImperativeHandle(ref, () => ({
    startStream: startStream,
  }));

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setIsRecording(true);
    } catch (err) {
      console.error(err);
    }
  };

  const takePicture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const stream = streamRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      onCapture(blob);
    }, "image/jpeg");

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <>
      <VideoContainer>
        <Video ref={videoRef} autoPlay />
        {isRecording ? <Rectangle /> : <></>}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </VideoContainer>
      <Container>
        <Button onClick={takePicture} variant="contained">
          ㅜ
        </Button>
      </Container>
    </>
  );
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5% 0 5% 0;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 400px;
  height: 300px;
  margin: 0 0 5% 0;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Rectangle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
  border: 10px solid blue;
`;

export default Camera;
