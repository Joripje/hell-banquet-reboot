import "../../assets/DotFont.css";
import Phaser from "phaser";
import clearImage from "../../assets/clear.png";
import gameoverImage from "../../assets/gameover.png";
import image40 from "../../assets/stage_4_0.png";
import image41 from "../../assets/stage_4_1.png";
import image42 from "../../assets/stage_4_2.png";
import image43 from "../../assets/stage_4_3.png";
import image44 from "../../assets/stage_4_4.png";
import image45 from "../../assets/stage_4_5.png";
import image46 from "../../assets/stage_4_6.png";
import image47 from "../../assets/stage_4_7.png";

export class Scene4 extends Phaser.Scene {
  constructor(props) {
    super("Scene4");
    this.props = props;
  }

  preload() {
    // 리소스 로드
    this.load.image("clear", clearImage);
    this.load.image("gameover", gameoverImage);
    this.load.image("image40", image40);
    this.load.image("image41", image41);
    this.load.image("image42", image42);
    this.load.image("image43", image43);
    this.load.image("image44", image44);
    this.load.image("image45", image45);
    this.load.image("image46", image46);
    this.load.image("image47", image47);
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
      `남은횟수: ${7 - this.enterCount}`,
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
        "image40"
      )
      .setScale(0.2);

    // 키보드 이벤트 등록
    this.input.keyboard.on("keydown-ENTER", this.ABC.bind(this));
    this.game.events.on("ABC", this.ABC.bind(this));
  }

  ABC() {
    this.enterCount++;
    if (this.enterCount >= 7) {
      this.timer.remove(false);
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image47"
        )
        .setScale(0.2);
      this.gameClear();
    } else if (this.enterCount === 1) {
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image41"
        )
        .setScale(0.2);
    } else if (this.enterCount === 2) {
      // 이미지 변경
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image42"
        )
        .setScale(0.2);
    } else if (this.enterCount === 3) {
      // 이미지 변경
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image43"
        )
        .setScale(0.2);
    } else if (this.enterCount === 4) {
      // 이미지 변경
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image44"
        )
        .setScale(0.2);
    } else if (this.enterCount === 5) {
      // 이미지 변경
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image45"
        )
        .setScale(0.2);
    } else if (this.enterCount === 6) {
      // 이미지 변경
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image46"
        )
        .setScale(0.2);
    }
    this.enterCountText.setText(`남은횟수: ${7 - this.enterCount}`);
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
      onComplete: () => {},
    });
  }
}
