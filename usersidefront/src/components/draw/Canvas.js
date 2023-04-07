import React, { useRef, useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import { putDrawingGameInfo } from "../../api/leftover";
import blank from "../../assets/images/blank.png";
function Canvas(params) {
  const { isStarted, isFinished, subjectIndex, endDraw } = params;
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
  const subjectsKorean = [
    "나비넥타이",
    "케이크",
    "캠프파이어",
    "고양이",
    "꽃",
    "기타",
    "헬멧",
    "콧수영",
    "낙하산",
    "총",
    "삽",
    "스노클",
    "눈사람",
    "트럼펫",
    "우산",
  ];
  // 캔버스 context 가져오기
  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    return canvas.getContext("2d");
  };
  const putDrawResult = async (c) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    const todayString = `${year}-${month}-${day}`;
    await putDrawingGameInfo(
      {
        propName: c,
        today: todayString,
        userId: localStorage.userId,
      },
      (data) => {
        // console.log(data);
      },
      (err) => {
        // console.log(err);
        // console.log(c);
        // console.log(localStorage.userId);
        // console.log(todayString);
      }
    );
  };
  const checkCorrect = async () => {
    try {
      const canvas = canvasRef.current;
      // canvas.style.background = "#FFFFFF";
      // console.log(canvas.toDataURL());
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("image", blob);
        formData.append("category", subjects[subjectIndex]);
        const response = await axios.post(
          // "http://127.0.0.1:8000/ai/draw/",
          "https://j8a802.p.ssafy.io:5000/ai/draw/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(response);
        // console.log(subjects[subjectIndex]);
        if (response.data.success) {
          putDrawResult(subjectsKorean[subjectIndex]);
          endDraw(true, canvas.toDataURL());
        } else {
          putDrawResult("None");
          endDraw(false, canvas.toDataURL());
        }
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

  const getMousePosition = (touch) => {
    const canvas = canvasRef.current;
    const { left, top } = canvas.getBoundingClientRect();
    const x = touch.clientX - left;
    const y = touch.clientY - top;
    return { x, y };
  };

  // 그리기 시작
  const startDrawing = (event) => {
    const context = getCanvasContext();
    // const { x, y } = getTouchPosition(event.touches[0]);
    const { x, y } = event.type.startsWith("touch")
      ? getTouchPosition(event.touches[0])
      : getMousePosition(event);
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  // 그리기 중
  const draw = (event) => {
    if (!isDrawing) return;
    const context = getCanvasContext();
    // const { x, y } = getTouchPosition(event.touches[0]);
    const { x, y } = event.type.startsWith("touch")
      ? getTouchPosition(event.touches[0])
      : getMousePosition(event);
    // context.beginPath();
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
    context.lineWidth = 12;
    context.lineJoin = "round";
    context.lineCap = "round";

    const img = new Image();
    img.onload = () => {
      context.drawImage(img, 0, 0);
    };
    img.src = blank;
  }, []);

  if (isStarted && !isFinished) {
    return (
      <canvas
        style={{
          background: "#FFFFFF",

          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
        ref={canvasRef}
        width={300}
        height={300}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
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
          style={{
            background: "#FFFFFF",

            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
          ref={canvasRef}
          width={300}
          height={300}
        />

        {isFinished && (
          <ParentWrapper>
            <Button
              variant="contained"
              onClick={checkCorrect}
              color="secondary"
            >
              잔반이는
              <br />
              {subjectsKorean[subjectIndex]}를 <br />
              얻을 수 있을까요?
            </Button>
          </ParentWrapper>
        )}
      </>
    );
  }
}
const ParentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
export default Canvas;
