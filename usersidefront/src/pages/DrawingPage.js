import { useState, useEffect, useRef } from "react";

import { Canvas, DrawSubject } from "../components/draw";
import { LogedPageTemplate } from "../components/common";

import styled from "styled-components";
import { Button } from "@mui/material";

function DrawingPage() {
  const [isStarted, setIsStarted] = useState(false); 
  const [isFinished, setIsFinished] = useState(false); 
  const [remainingTime, setRemainingTime] = useState(10); 
  const timerRef = useRef(null); // 타이머 참조

  // 그리기 시작 버튼 클릭 핸들러
  const handleStartDrawing = () => {
    setIsStarted(true);
  };

  useEffect(() => {
    // 그리기 종료 여부 감시
    if (isStarted && !isFinished) {
      timerRef.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timerRef.current);
            setIsFinished(true);
            setIsStarted(false);
          }
          return prevTime - 1;
        });
      }, remainingTime * 100);
    }
    // 컴포넌트 언마운트 시 타이머 종료
    return () => {
      clearInterval(timerRef.current);
    };
  }, [isStarted, isFinished]);

  return (
    <>
      <LogedPageTemplate />
      <DrawSubject />
      <CanvasWrapper>
        <Canvas isStarted={isStarted} isFinished={isFinished} />
        {!isStarted && (
          <StartButton>
            {isFinished 
              ? <Button variant="contained" color="error">여기까지입니다!!</Button>
              : <Button variant="contained" onClick={handleStartDrawing}>그리기 시작</Button>
            }
          </StartButton>
        )}
      </CanvasWrapper>
      <TimerWrapper>
        {isStarted
          ? isFinished
            ? <Button variant="contained">결과를 알아볼까요?!</Button>
            : <p>남은 시간: {remainingTime}초</p>
          : <></>
        }
      </TimerWrapper>
    </>
  );
}

const CanvasWrapper = styled.div`
  position: relative;

  margin: 5% 5% 5% 5%;
  border-radius: 20px;
`

const StartButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`

const TimerWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  background-color: white;
  padding: 10px;
  border-radius: 5px;
`


export default DrawingPage;
