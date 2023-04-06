import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, DrawSubject } from "../../components/draw";
import { LogedPageTemplate } from "../../components/common";
import {
  getLeftover,
  putDrawingGameInfo,
  getDrawingGameInfo,
} from "../../api/leftover";

import styled from "styled-components";
import { Button } from "@mui/material";
// import { draw } from "face-api.js";

function DrawingPage() {
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [remainingTime, setRemainingTime] = useState(10);
  const [isDrawed, setIsDrawed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isCheck, setIsCheck] = useState(1); // 0: 밥 안먹음, 1: 게임가능, 2: 이미함
  const [subjectIndex, setSubjectIndex] = useState(0);
  const timerRef = useRef(null); // 타이머 참조
  const navigate = useNavigate();
  // 그리기 시작 버튼 클릭 핸들러

  const endDraw = (data) => {
    setIsDrawed(true);
    setIsCorrect(data);
  };
  const handleStartDrawing = () => {
    setIsStarted(true);
  };
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    const todayString = `${year}-${month}-${day}`;
    console.log(todayString); // 예시 출력: 2023-04-05

    const checkLeftover = async () => {
      await getDrawingGameInfo(
        {
          today: todayString,
          userId: localStorage.userId,
          // today: "2023-04-04",
          // userId: "string",
        },
        (data) => {
          if (data === "true") {
            console.log("그림아직");
          } else {
            setIsCheck(2);
            // alert("오늘은 이미 그림을 그렸어요.");
            // navigate(-1);
          }
        },
        (err) => {
          // alert("밥먹고 오세요.");
          // navigate(-1);
        }
      );
    };
    checkLeftover();

    const putSubject = async () => {
      await putDrawingGameInfo(
        {
          propName: "꽃",
          // today: "2023-04-04",
          // userId: "string",
          today: todayString,
          userId: localStorage.userId,
        },
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
          console.log(localStorage.subject);
        }
      );
    };
    const checkIsAssigned = async () => {
      await getLeftover(
        {
          date: todayString,
          userId: localStorage.userId,
          // date: "2023-04-04",
          // userId: "string",
        },
        (data) => {
          if (data.data.propStatus === "not assigned") {
            const randomIndex = Math.floor(Math.random() * 15);
            setSubjectIndex(randomIndex);
            // console.log(randomIndex);
            localStorage.setItem("subjectIndex", randomIndex);
            // console.log("낫사인드");
            // console.log(localStorage.subjectIndex);
            putSubject();
          } else if (data.data.propStatus === "assigned") {
            if (localStorage.subjectIndex) {
              setSubjectIndex(localStorage.subjectIndex);
            } else {
              const randomIndex = Math.floor(Math.random() * 15);
              setSubjectIndex(randomIndex);
              localStorage.setItem("subjectIndex", randomIndex);
            }

            // console.log("어사인드");
            // console.log(localStorage.subjectIndex);
          } else {
            // console.log("asdfasdf");
          }
        },
        (err) => {
          console.log(err);
          console.log("말도안됨");
        }
      );
    };
    checkIsAssigned();
  }, []);
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
      }, 1000);
    }
    // 컴포넌트 언마운트 시 타이머 종료
    return () => {
      clearInterval(timerRef.current);
    };
  }, [isStarted, isFinished]);

  return (
    <>
      <LogedPageTemplate />
      {/* <Container> */}
      {isDrawed ? (
        <>
          {isCorrect ? (
            <div style={{ fontWeight: "bold", color: "green" }}>
              맞았습니다!!
            </div>
          ) : (
            <div style={{ color: "red" }}>틀렸습니다</div>
          )}
        </>
      ) : (
        <>
          <DrawSubject subjectIndex={subjectIndex} />
          <CanvasWrapper>
            <Canvas
              isStarted={isStarted}
              isFinished={isFinished}
              subjectIndex={subjectIndex}
              endDraw={endDraw}
            />
            {!isStarted && (
              <StartButton>
                {isFinished ? (
                  <Button variant="contained" color="error">
                    여기까지입니다!!
                  </Button>
                ) : (
                  <Button variant="contained" onClick={handleStartDrawing}>
                    그리기 시작
                  </Button>
                )}
              </StartButton>
            )}
          </CanvasWrapper>
          <TimerWrapper>
            {isStarted ? (
              isFinished ? (
                <Button variant="contained">결과를 알아볼까요?!</Button>
              ) : (
                <p>남은 시간: {remainingTime}초</p>
              )
            ) : (
              <></>
            )}
          </TimerWrapper>
        </>
      )}
      {/* </Container> */}
    </>
  );
}
const Container = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CanvasWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5% 5% 5% 5%;
  border-radius: 20px;
  width: 90%;
`;

const StartButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const TimerWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  background-color: white;
  padding: 10px;
  border-radius: 5px;
`;

export default DrawingPage;