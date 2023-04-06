import { useState, useEffect, useRef } from "react";

function Timer() {
  const [isStarted, setIsStarted] = useState(false); // 그리기 시작 여부
  const [isFinished, setIsFinished] = useState(false); // 그리기 종료 여부
  const [remainingTime, setRemainingTime] = useState(10); // 남은 시간
  const timerRef = useRef(null); // 타이머 참조

  // 그리기 시작 버튼 클릭 핸들러
  const handleStartDrawing = () => {
    setIsStarted(true);
  };

  // 타이머 새로고침 함수
  const refreshTimer = () => {
    setRemainingTime(10);
  };

  useEffect(() => {
    // 타이머 초기화
    refreshTimer();

    // 그리기 종료 여부 감시
    if (isStarted && !isFinished) {
      timerRef.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timerRef.current);
            setIsFinished(true);
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
      <div className={`drawing-page ${!isStarted && "blur"}`}>
        <div className="start-button">
          {!isStarted && (
            <button onClick={handleStartDrawing}>그리기 시작</button>
          )}
          {isFinished && <p>그리기가 종료되었습니다.</p>}
        </div>
      </div>
      {isStarted && (
        <div className="timer">
          <p>남은 시간: {remainingTime}초</p>
        </div>
      )}
      <style jsx>{`
        .drawing-page {
          position: absolute;
          top: 300px;
          right: 100px;
        }
        .blur {
          filter: blur(5px);
        }
        .start-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }
        .timer {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background-color: white;
          padding: 10px;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
}

export default Timer;
