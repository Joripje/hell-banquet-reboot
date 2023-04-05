import React, { useRef, useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import styled from "styled-components";

function Canvas(params) {
  const { isStarted, isFinished, subjectIndex } = params;
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  // const [imageFile, setImageFile] = useState(null);
  const subjects = [
    "bowtie",
    "cake",
    "campfire",
    "cat",
    "flower",
    "guitar",
    "helmet",
    "moustache",
    "parachute",
    "rifle",
    "shovel",
    "snorkel",
    "snowman",
    "trumpet",
    "umbrella",
  ];

  // 캔버스 context 가져오기
  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    return canvas.getContext("2d");
  };

  const checkCorrect = async () => {
    try {
      const canvas = canvasRef.current;
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("image", blob);
        formData.append("category", subjects[subjectIndex]);
        const response = await axios.post(
          // "http://127.0.0.1:8000/ai/draw/",
          "http://j8a802.p.ssafy.io:5000/ai/draw/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        console.log(subjects[subjectIndex]);
      }, "image/png");
    } catch (error) {
      alert(error.message);
    }
  };

  // 마우스 좌표 계산 함수
  const getTouchPosition = (touch) => {
    const canvas = canvasRef.current;
    const { left, top } = canvas.getBoundingClientRect();
    const x = touch.clientX - left;
    const y = touch.clientY - top;
    return { x, y };
  };

  // 그리기 시작
  const startDrawing = (event) => {
    const context = getCanvasContext();
    const { x, y } = getTouchPosition(event.touches[0]);
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  // 그리기 중
  const draw = (event) => {
    if (!isDrawing) return;
    const context = getCanvasContext();
    const { x, y } = getTouchPosition(event.touches[0]);
    context.lineTo(x, y);
    context.stroke();
  };

  // 그리기 종료
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // 선 스타일 설정
    context.strokeStyle = "#000000"; // 검은색
    context.lineWidth = 10;
    context.lineJoin = "round";
    context.lineCap = "round";
  }, []);

  if (isStarted && !isFinished) {
    return (
      <canvas
        style={{ background: "#E5E5E5" }}
        ref={canvasRef}
        width={390}
        height={390}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        onTouchCancel={stopDrawing}
      />
    );
  } else {
    return (
      <>
        <canvas
          style={{ background: "#E5E5E5" }}
          ref={canvasRef}
          width={390}
          height={390}
        />
        {isFinished && (
          <Button variant="contained" onClick={checkCorrect}>
            결과를 알아볼까요?!
          </Button>
        )}
      </>
    );
  }
}

export default Canvas;
