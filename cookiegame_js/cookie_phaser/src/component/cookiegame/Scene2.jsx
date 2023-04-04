import "../../assets/DotFont.css";
import Phaser from "phaser";
import clearImage from "../../assets/clear.png";
import gameoverImage from "../../assets/gameover.png";
import image20 from "../../assets/stage_2_0.png";
import image21 from "../../assets/stage_2_1.png";
import image22 from "../../assets/stage_2_2.png";
import image23 from "../../assets/stage_2_3.png";
import image24 from "../../assets/stage_2_4.png";
import image25 from "../../assets/stage_2_5.png";

export class Scene2 extends Phaser.Scene {
  constructor(props) {
    super("Scene2");
    this.props = props;
  }

  preload() {
    // 리소스 로드
    this.load.image("clear", clearImage);
    this.load.image("gameover", gameoverImage);
    this.load.image("image20", image20);
    this.load.image("image21", image21);
    this.load.image("image22", image22);
    this.load.image("image23", image23);
    this.load.image("image24", image24);
    this.load.image("image25", image25);
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
      `남은횟수: ${4 - this.enterCount}`,
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
        "image20"
      )
      .setScale(0.2);

    // 키보드 이벤트 등록
    this.input.keyboard.on("keydown-ENTER", this.ABC.bind(this));
    this.game.events.on("ABC", this.ABC.bind(this));
  }

  update() {
    // 게임 업데이트
  }

  ABC() {
    this.enterCount++;
    if (this.enterCount >= 4) {
      this.timer.remove(false);
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image24"
        )
        .setScale(0.2);
      this.gameClear();
    } else if (this.enterCount === 1) {
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image21"
        )
        .setScale(0.2);
    } else if (this.enterCount === 2) {
      // 이미지 변경
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image22"
        )
        .setScale(0.2);
    } else if (this.enterCount === 3) {
      // 이미지 변경
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image23"
        )
        .setScale(0.2);
    }
    this.enterCountText.setText(`남은횟수: ${4 - this.enterCount}`);
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
    // 다음 스테이지로 이동
    this.scene.start("Scene3");
  }
}
