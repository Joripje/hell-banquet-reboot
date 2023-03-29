import React, { useRef, useState, useEffect } from 'react';

function Canvas(params) {
  const { isStarted, isFinished } = params
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // 캔버스 context 가져오기
  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    return canvas.getContext('2d');
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
    const context = canvas.getContext('2d');

    // 선 스타일 설정
    context.strokeStyle = '#000000'; // 검은색
    context.lineWidth = 10;
    context.lineJoin = 'round';
    context.lineCap = 'round';
  }, []);

  if (isStarted && !isFinished) {
    return (
      <canvas
        style={{background: '#E5E5E5'}}
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
      <canvas
        style={{background: '#E5E5E5'}}
        ref={canvasRef}
        width={390}
        height={390}
      />
    )
  }
}

export default Canvas;
