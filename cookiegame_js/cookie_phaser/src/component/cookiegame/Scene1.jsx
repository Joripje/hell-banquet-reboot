// // import Phaser from "phaser";
// // import clearImage from "../../assets/clear.png";
// // import gameoverImage from "../../assets/gameover.png";

// // export class Scene1 extends Phaser.Scene {
// //   constructor() {
// //     super("Scene1");
// //   }

// //   preload() {
// //     // 리소스 로드
// //     this.load.image("clear", clearImage);
// //     this.load.image("gameover", gameoverImage);
// //   }

// //   create() {
// //     // 타이머 생성
// //     this.timeLimit = 10;
// //     this.timer = this.time.addEvent({
// //       delay: 1000,
// //       callback: this.onTimerTick.bind(this),
// //       callbackScope: this,
// //       loop: true,
// //     });

// //     // 텍스트 생성
// //     this.text = this.add.text(10, 10, `Time Left: ${this.timeLimit}`, {
// //       fontFamily: "Arial",
// //       fontSize: 32,
// //       color: "#ffffff",
// //     });

// //     // 키보드 이벤트 등록
// //     this.input.keyboard.on("keydown-ENTER", this.onEnterKeyDown.bind(this));
// //   }

// //   update() {
// //     // 게임 업데이트
// //   }

// //   onEnterKeyDown() {
// //     this.enterCount++;
// //     if (this.enterCount >= 3) {
// //       this.timer.remove(false);
// //       this.gameClear();
// //     }
// //   }

// //   onTimerTick() {
// //     this.timeLimit--;
// //     this.text.setText(`Time Left: ${this.timeLimit}`);

// //     if (this.timeLimit <= 0) {
// //       this.timer.remove(false);
// //       this.gameOver();
// //     }
// //   }

// //   gameOver() {
// //     // 게임 오버 처리
// //     this.gameoverImage = this.add.image(
// //       this.cameras.main.width / 2,
// //       this.cameras.main.height / 2,
// //       "gameover"
// //     );
// //     this.gameoverImage.setOrigin(0.5, 0.5);
// //   }

// //   gameClear() {
// //     // 게임 클리어 처리
// //     this.clearImage = this.add.sprite(
// //       this.cameras.main.width / 2,
// //       this.cameras.main.height / 2,
// //       "clear"
// //     );
// //     this.clearImage.setScale(0.5);
// //   }
// // }
// import "../../assets/DotFont.css";
// import Phaser from "phaser";
// import clearImage from "../../assets/clear.png";
// import gameoverImage from "../../assets/gameover.png";
// import image10 from "../../assets/stage_1_0.png";
// import image11 from "../../assets/stage_1_1.png";
// import image12 from "../../assets/stage_1_2.png";
// import image13 from "../../assets/stage_1_3.png";

// export class Scene1 extends Phaser.Scene {
//   constructor(props) {
//     super("Scene1");
//     this.props = props;
//   }

//   preload() {
//     // 리소스 로드
//     this.load.image("clear", clearImage);
//     this.load.image("gameover", gameoverImage);
//     this.load.image("image10", image10);
//     this.load.image("image11", image11);
//     this.load.image("image12", image12);
//     this.load.image("image13", image13);
//   }

//   create() {
//     // 타이머 생성
//     this.timeLimit = 10;
//     this.enterCount = 0;
//     this.timer = this.time.addEvent({
//       delay: 1000,
//       callback: this.onTimerTick.bind(this),
//       callbackScope: this,
//       loop: true,
//     });

//     // 텍스트 생성
//     this.text = this.add.text(10, 10, `남은시간: ${this.timeLimit}`, {
//       fontFamily: "DotFont",
//       fontSize: 32,
//       color: "#000000",
//     });
//     this.enterCountText = this.add.text(
//       10,
//       50,
//       `남은횟수: ${3 - this.enterCount}`,
//       // `남은횟수: ${3 - this.ABCount}`,
//       {
//         fontFamily: "DotFont",
//         fontSize: 32,
//         color: "#000000",
//       }
//     );

//     // if (this.enterCount === 0) {
//     //   this.add
//     //     .image(
//     //       this.cameras.main.width / 2,
//     //       this.cameras.main.height / 2,
//     //       "image1"
//     //     )
//     //     .setScale(0.5);
//     // } else if (this.enterCount === 1) {
//     //   this.add
//     //     .image(
//     //       this.cameras.main.width / 2,
//     //       this.cameras.main.height / 2,
//     //       "image2"
//     //     )
//     //     .setScale(0.5);
//     // } else if (this.enterCount === 2) {
//     //   this.add
//     //     .image(
//     //       this.cameras.main.width / 2,
//     //       this.cameras.main.height / 2,
//     //       "image3"
//     //     )
//     //     .setScale(0.5);
//     // }
//     // 이전 이미지 저장 변수 초기화
//     this.image = this.add
//       .image(
//         this.cameras.main.width / 2,
//         this.cameras.main.height / 2,
//         "image10"
//       )
//       .setScale(0.2);

//     // 키보드 이벤트 등록
//     // this.input.keyboard.on("keydown-ENTER", this.ABC.bind(this));
//     this.game.events.on("ABC", this.ABC.bind(this));
//   }

//   // addImage() {
//   //   // 이전 이미지가 있다면 삭제
//   //   if (this.previousImage) {

//   //     this.previousImage.destroy();
//   //   }

//   //   // 새 이미지 추가
//   //   if (this.enterCount === 0) {
//   //     this.previousImage = this.add
//   //       .image(
//   //         this.cameras.main.width / 2,
//   //         this.cameras.main.height / 2,
//   //         "image1"
//   //       )
//   //       .setScale(0.5);
//   //   } else if (this.enterCount === 1) {
//   //     this.previousImage = this.add
//   //       .image(
//   //         this.cameras.main.width / 2,
//   //         this.cameras.main.height / 2,
//   //         "image2"
//   //       )
//   //       .setScale(0.5);
//   //   } else if (this.enterCount === 2) {
//   //     this.previousImage = this.add
//   //       .image(
//   //         this.cameras.main.width / 2,
//   //         this.cameras.main.height / 2,
//   //         "image3"
//   //       )
//   //       .setScale(0.5);
//   //   }
//   // }
//   update() {
//     // 게임 업데이트
//   }

//   // onEnterKeyDown() {
//   ABC() {
//     this.enterCount++;
//     if (this.enterCount >= 3) {
//       this.timer.remove(false);
//       this.image.destroy();
//       this.image = this.add
//         .image(
//           this.cameras.main.width / 2,
//           this.cameras.main.height / 2,
//           "image13"
//         )
//         .setScale(0.2);
//       this.gameClear();
//     } else if (this.enterCount === 1) {
//       this.image.destroy();
//       this.image = this.add
//         .image(
//           this.cameras.main.width / 2,
//           this.cameras.main.height / 2,
//           "image11"
//         )
//         .setScale(0.2);
//     } else if (this.enterCount === 2) {
//       // 이미지 변경
//       this.image.destroy();
//       this.image = this.add
//         .image(
//           this.cameras.main.width / 2,
//           this.cameras.main.height / 2,
//           "image12"
//         )
//         .setScale(0.2);
//     }
//     this.enterCountText.setText(`남은횟수: ${3 - this.enterCount}`);
//     console.log(this.enterCount);
//     console.log("asdf");
//   }

//   onTimerTick() {
//     this.timeLimit--;
//     this.text.setText(`남은시간: ${this.timeLimit}`);

//     if (this.timeLimit <= 0) {
//       this.timer.remove(false);
//       this.gameOver();
//     }
//   }

//   gameOver() {
//     // 게임 오버 처리
//     this.gameoverImage = this.add.image(
//       this.cameras.main.width / 2,
//       this.cameras.main.height / 2,
//       "gameover"
//     );
//     this.gameoverImage.setOrigin(0.5, 0.5);
//   }

//   // gameClear() {
//   //   // 게임 클리어 처리
//   //   this.clearImage = this.add.sprite(
//   //     this.cameras.main.width / 2,
//   //     this.cameras.main.height / 2,
//   //     "clear"
//   //   );
//   //   this.clearImage.setScale(0.5);

//   //   this.time.delayedCall(3000, this.goToNextStage.bind(this));
//   // }

//   gameClear() {
//     // 게임 클리어 처리
//     this.clearImage = this.add.image(this.cameras.main.width / 2, 0, "clear");
//     this.clearImage.setScale(0.5);

//     this.tweens.add({
//       targets: this.clearImage,
//       y: this.cameras.main.height * 0.5,
//       duration: 300,
//       onComplete: () => {
//         //         // 먼지 애니메이션 추가
//         // const dust = this.add.sprite(
//         //   this.clearImage.x,
//         //   this.clearImage.y,
//         //   "dust"
//         // );
//         // const anim = this.anims.create({
//         //   key: "dust",
//         //   frames: this.anims.generateFrameNumbers("dust"),
//         //   frameRate: 30,
//         // });
//         // dust.play("dust", true);
//         // anim.on("complete", () => {
//         //   dust.destroy();
//         // });

//         this.time.delayedCall(3000, this.goToNextStage.bind(this));
//       },
//     });
//   }

//   goToNextStage() {
//     // 다음 스테이지로 이동
//     this.scene.start("Scene2");
//   }
// }
import "../../assets/DotFont.css";
import Phaser from "phaser";
import clearImage from "../../assets/clear.png";
import gameoverImage from "../../assets/gameover.png";
import image10 from "../../assets/stage_1_0.png";
import image11 from "../../assets/stage_1_1.png";
import image12 from "../../assets/stage_1_2.png";
import image13 from "../../assets/stage_1_3.png";

export class Scene1 extends Phaser.Scene {
  constructor(props) {
    super("Scene1");
    this.props = props;
  }

  preload() {
    // 리소스 로드
    this.load.image("clear", clearImage);
    this.load.image("gameover", gameoverImage);
    this.load.image("image10", image10);
    this.load.image("image11", image11);
    this.load.image("image12", image12);
    this.load.image("image13", image13);
  }

  create() {
    // 타이머 생성
    this.timeLimit = 10;
    this.enterCount = 0;
    this.timer = this.time.addEvent({
      delay: 1000,
      callback: this.onTimerTick.bind(this),
      callbackScope: this,
      loop: true,
    });

    // 텍스트 생성
    this.text = this.add.text(10, 10, `남은시간: ${this.timeLimit}`, {
      fontFamily: "DotFont",
      fontSize: 32,
      color: "#000000",
    });
    this.enterCountText = this.add.text(
      10,
      50,
      `남은횟수: ${3 - this.enterCount}`,
      // `남은횟수: ${3 - this.ABCount}`,
      {
        fontFamily: "DotFont",
        fontSize: 32,
        color: "#000000",
      }
    );

    this.image = this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "image10"
      )
      .setScale(0.2);

    this.input.keyboard.on("keydown-ENTER", this.ABC.bind(this));
    this.game.events.on("ABC", this.ABC.bind(this));
  }

  ABC() {
    this.enterCount++;
    if (this.enterCount >= 3) {
      this.timer.remove(false);
      this.image.destroy();
      this.image = this.add

        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image13"
        )
        .setScale(0.2);
      this.gameClear();
    } else if (this.enterCount === 1) {
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image11"
        )
        .setScale(0.2);
    } else if (this.enterCount === 2) {
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image12"
        )
        .setScale(0.2);
    }
    this.enterCountText.setText(`남은횟수: ${3 - this.enterCount}`);
    console.log(this.enterCount);
    console.log("asdf");
  }

  onTimerTick() {
    this.timeLimit--;
    this.text.setText(`남은시간: ${this.timeLimit}`);

    if (this.timeLimit <= 0) {
      this.timer.remove(false);
      this.gameOver();
    }
  }

  gameOver() {
    this.gameoverImage = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "gameover"
    );
    this.gameoverImage.setOrigin(0.5, 0.5);
  }

  gameClear() {
    this.clearImage = this.add.image(this.cameras.main.width / 2, 0, "clear");
    this.clearImage.setScale(0.5);

    this.tweens.add({
      targets: this.clearImage,
      y: this.cameras.main.height * 0.5,
      duration: 300,
      onComplete: () => {
        this.time.delayedCall(3000, this.goToNextStage.bind(this));
      },
    });
  }

  goToNextStage() {
    this.scene.start("Scene2");
  }
}
