import "../../assets/DotFont.css";
import Phaser from "phaser";
import clearImage from "../../assets/clear.png";
import gameoverImage from "../../assets/gameover.png";
import image30 from "../../assets/stage_3_0.png";
import image31 from "../../assets/stage_3_1.png";
import image32 from "../../assets/stage_3_2.png";
import image33 from "../../assets/stage_3_3.png";
import image34 from "../../assets/stage_3_4.png";
import image35 from "../../assets/stage_3_5.png";
import image36 from "../../assets/stage_3_6.png";

export class Scene3 extends Phaser.Scene {
  constructor(props) {
    super("Scene3");
    this.props = props;
  }

  preload() {
    // 리소스 로드
    this.load.image("clear", clearImage);
    this.load.image("gameover", gameoverImage);
    this.load.image("image30", image30);
    this.load.image("image31", image31);
    this.load.image("image32", image32);
    this.load.image("image33", image33);
    this.load.image("image34", image34);
    this.load.image("image35", image35);
    this.load.image("image36", image36);
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
      `남은횟수: ${5 - this.enterCount}`,
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
        "image30"
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
    // onEnterKeyDown() {
    this.enterCount++;
    if (this.enterCount >= 5) {
      this.timer.remove(false);
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image35"
        )
        .setScale(0.2);
      this.gameClear();
    } else if (this.enterCount === 1) {
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image31"
        )
        .setScale(0.2);
    } else if (this.enterCount === 2) {
      // 이미지 변경
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image32"
        )
        .setScale(0.2);
    } else if (this.enterCount === 3) {
      // 이미지 변경
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image33"
        )
        .setScale(0.2);
    } else if (this.enterCount === 4) {
      // 이미지 변경
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image34"
        )
        .setScale(0.2);
    }
    this.enterCountText.setText(`남은횟수: ${5 - this.enterCount}`);
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
    this.scene.start("Scene4");
  }
}
