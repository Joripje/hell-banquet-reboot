// import Phaser from "phaser";
// import clearImage from "../../../assets/clear.png";
// import gameoverImage from "../../../assets/gameover.png";
// class Scene3 extends Phaser.Scene {
//   constructor() {
//     super("Scene3");
//   }

//   preload() {
//     // 리소스 로드
//     this.load.image("clear", clearImage);
//     this.load.image("gameover", gameoverImage);
//   }

//   create() {
//     // 타이머 생성
//     this.timeLimit = 10;
//     this.timer = this.time.addEvent({
//       delay: 1000,
//       callback: this.onTimerTick,
//       callbackScope: this,
//       loop: true,
//     });

//     // 텍스트 생성
//     this.text = this.add.text(10, 10, `Time Left: ${this.timeLimit}`, {
//       fontFamily: "Arial",
//       fontSize: 32,
//       color: "#ffffff",
//     });

//     // 키보드 이벤트 등록
//     this.input.keyboard.on("keydown-ENTER", this.onEnterKeyDown, this);
//   }

//   update() {
//     // 게임 업데이트
//   }

//   onEnterKeyDown() {
//     this.enterCount++;
//     if (this.enterCount >= 3) {
//       this.timer.remove(false);
//       this.gameClear();
//     }
//   }

//   onTimerTick() {
//     this.timeLimit--;
//     this.text.setText(`Time Left: ${this.timeLimit}`);

//     if (this.timeLimit <= 0) {
//       this.timer.remove(false);
//       this.gameOver();
//     }
//   }

//   gameOver() {
//     this.gameoverImage = this.add.image(
//       this.cameras.main.width / 2,
//       this.cameras.main.height / 2,
//       "gameover"
//     );
//     this.gameoverImage.setOrigin(0.5, 0.5);
//     // 게임 오버 처리
//   }

//   gameClear() {
//     // 게임 클리어 처리
//     this.clearImage = this.add.sprite(
//       this.cameras.main.width / 2,
//       this.cameras.main.height / 2,
//       "clear"
//     );
//     this.clearImage.setScale(0.5);

//     this.time.delayedCall(3000, this.goToNextStage, [], this);
//   }

//   goToNextStage() {
//     // 다음 스테이지로 이동
//     this.scene.start("Scene4");
//   }
// }
// export default Scene3;

import Phaser from "phaser";
import clearImage from "../../../assets/clear.png";
import gameoverImage from "../../../assets/gameover.png";

class Scene3 extends Phaser.Scene {
  constructor() {
    super("Scene3");
    this.enterCount = 0;
  }

  preload() {
    // 리소스 로드
    this.load.image("clear", clearImage);
    this.load.image("gameover", gameoverImage);
  }

  create() {
    // 타이머 생성
    this.timeLimit = 10;
    this.timer = this.time.addEvent({
      delay: 1000,
      callback: this.onTimerTick.bind(this),
      callbackScope: this,
      loop: true,
    });

    // 텍스트 생성
    this.text = this.add.text(10, 10, `Time Left: ${this.timeLimit}`, {
      fontFamily: "Arial",
      fontSize: 32,
      color: "#ffffff",
    });

    // 키보드 이벤트 등록
    this.input.keyboard.on("keydown-ENTER", this.onEnterKeyDown.bind(this));
  }

  update() {
    // 게임 업데이트
  }

  onEnterKeyDown() {
    this.enterCount++;
    if (this.enterCount >= 3) {
      this.timer.remove(false);
      this.gameClear();
    }
  }

  onTimerTick() {
    this.timeLimit--;
    this.text.setText(`Time Left: ${this.timeLimit}`);

    if (this.timeLimit <= 0) {
      this.timer.remove(false);
      this.gameOver();
    }
  }

  gameOver() {
    // 게임 오버 처리
    this.gameoverImage = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "gameover"
    );
    this.gameoverImage.setOrigin(0.5, 0.5);
  }

  gameClear() {
    // 게임 클리어 처리
    this.clearImage = this.add.sprite(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "clear"
    );
    this.clearImage.setScale(0.5);

    this.time.delayedCall(3000, this.goToNextStage.bind(this));
  }

  goToNextStage() {
    // 다음 스테이지로 이동
    this.scene.start("Scene4");
  }
}

export default Scene3;
