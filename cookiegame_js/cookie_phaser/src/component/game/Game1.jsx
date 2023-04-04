import React, { useState } from "react";
import Phaser from "phaser";
import clearImage from "../../assets/clear.png";
import gameoverImage from "../../assets/gameover.png";

const Scene1 = () => {
  const [enterCount, setEnterCount] = useState(0);
  const [timeLimit, setTimeLimit] = useState(10);
  const [timer, setTimer] = useState(null);
  const [text, setText] = useState(null);
  const [gameoverImage, setGameoverImage] = useState(null);
  const [clearImage, setClearImage] = useState(null);

  const preload = (scene) => {
    // 리소스 로드
    scene.load.image("clear", clearImage);
    scene.load.image("gameover", gameoverImage);
  };

  const create = (scene) => {
    // 타이머 생성
    setTimeLimit(10);
    setTimer(
      scene.time.addEvent({
        delay: 1000,
        callback: onTimerTick,
        callbackScope: this,
        loop: true,
      })
    );

    // 텍스트 생성
    setText(
      scene.add.text(10, 10, `Time Left: ${timeLimit}`, {
        fontFamily: "Arial",
        fontSize: 32,
        color: "#ffffff",
      })
    );

    // 키보드 이벤트 등록
    scene.input.keyboard.on("keydown-ENTER", onEnterKeyDown);
  };

  const update = () => {
    // 게임 업데이트
  };

  const onEnterKeyDown = () => {
    setEnterCount((prevCount) => prevCount + 1);
    if (enterCount >= 2) {
      timer.remove(false);
      gameClear();
    }
  };

  const onTimerTick = () => {
    setTimeLimit((prevTime) => prevTime - 1);
    setText(text.setText(`Time Left: ${timeLimit}`));

    if (timeLimit <= 0) {
      timer.remove(false);
      gameOver();
    }
  };

  const gameOver = () => {
    // 게임 오버 처리
    setGameoverImage(
      this.add.image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "gameover"
      )
    );
    gameoverImage.setOrigin(0.5, 0.5);
    // 게임 오버 처리
  };

  const gameClear = () => {
    // 게임 클리어 처리
    setClearImage(
      this.add.sprite(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "clear"
      )
    );
    clearImage.setScale(0.5);

    this.time.delayedCall(3000, goToNextStage, [], this);
  };

  const goToNextStage = () => {
    // 다음 스테이지로 이동
    this.scene.start("Scene2");
  };

  const startGame = () => {
    const config = {
      type: Phaser.AUTO,
      scale: {
        parent: "ContainerGame",
        mode: Phaser.Scale.HEIGHT_CONTROLS_HEIGHT,
        width: 300,
        height: 700,
      },
      scene: [Scene1],
    };
    const game = new Phaser.Game(config);
  };

  return (
    <div>
      <div id="ContainerGame"></div>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default Game;
