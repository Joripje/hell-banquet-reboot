import "../../assets/DotFont.css";
import Phaser from "phaser";
import clearImage from "../../assets/clear.png";
import gameoverImage from "../../assets/gameover.png";
import image10 from "../../assets/stage_1_0.png";
import image11 from "../../assets/stage_1_1.png";
import image12 from "../../assets/stage_1_2.png";
import image13 from "../../assets/stage_1_3.png";
import image20 from "../../assets/stage_2_0.png";
import image21 from "../../assets/stage_2_1.png";
import image22 from "../../assets/stage_2_2.png";
import image23 from "../../assets/stage_2_3.png";
import image24 from "../../assets/stage_2_4.png";
import image25 from "../../assets/stage_2_5.png";
import image30 from "../../assets/stage_3_0.png";
import image31 from "../../assets/stage_3_1.png";
import image32 from "../../assets/stage_3_2.png";
import image33 from "../../assets/stage_3_3.png";
import image34 from "../../assets/stage_3_4.png";
import image35 from "../../assets/stage_3_5.png";
import image36 from "../../assets/stage_3_6.png";
import image40 from "../../assets/stage_4_0.png";
import image41 from "../../assets/stage_4_1.png";
import image42 from "../../assets/stage_4_2.png";
import image43 from "../../assets/stage_4_3.png";
import image44 from "../../assets/stage_4_4.png";
import image45 from "../../assets/stage_4_5.png";
import image46 from "../../assets/stage_4_6.png";
import image47 from "../../assets/stage_4_7.png";

export class Scenes extends Phaser.Scene {
  constructor(props) {
    super("Scenes");
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
    this.load.image("image20", image20);
    this.load.image("image21", image21);
    this.load.image("image22", image22);
    this.load.image("image23", image23);
    this.load.image("image24", image24);
    this.load.image("image25", image25);
    this.load.image("image30", image30);
    this.load.image("image31", image31);
    this.load.image("image32", image32);
    this.load.image("image33", image33);
    this.load.image("image34", image34);
    this.load.image("image35", image35);
    this.load.image("image36", image36);
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
    this.timeLimit = 5;
    this.enterCount = 0;
    this.timer = this.time.addEvent({
      delay: 1000,
      callback: this.onTimerTick.bind(this),
      callbackScope: this,
      loop: true,
    });

    // 텍스트 생성
    this.text = this.add.text(10, 10, `Byungsin: ${this.timeLimit}`, {
      fontFamily: "DotFont",
      fontSize: 32,
      color: "#000000",
    });
    this.enterCountText = this.add.text(10, 50, `Score: ${this.enterCount}`, {
      fontFamily: "DotFont",
      fontSize: 32,
      color: "#000000",
    });

    this.image = this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "image10"
      )
      .setScale(0.2);

    this.game.events.on("ABC", this.ABC.bind(this));
  }

  ABC() {
    this.enterCount++;
    if (this.enterCount === 1) {
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
    } else if (this.enterCount === 3) {
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image13"
        )
        .setScale(0.2);
      this.timeLimit += 5;
    } else if (this.enterCount === 4) {
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image21"
        )
        .setScale(0.2);
    } else if (this.enterCount === 5) {
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image22"
        )
        .setScale(0.2);
    } else if (this.enterCount === 6) {
      // 이미지 변경
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image23"
        )
        .setScale(0.2);
    } else if (this.enterCount === 7) {
      // 이미지 변경
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image24"
        )
        .setScale(0.2);
      this.timeLimit += 5;
    } else if (this.enterCount === 8) {
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image31"
        )
        .setScale(0.2);
    } else if (this.enterCount === 9) {
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image32"
        )
        .setScale(0.2);
    } else if (this.enterCount === 10) {
      // 이미지 변경
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image33"
        )
        .setScale(0.2);
    } else if (this.enterCount === 11) {
      // 이미지 변경
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image34"
        )
        .setScale(0.2);
    } else if (this.enterCount === 12) {
      // 이미지 변경
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image36"
        )
        .setScale(0.2);
      this.timeLimit += 5;
    } else if (this.enterCount === 13) {
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image41"
        )
        .setScale(0.2);
    } else if (this.enterCount === 14) {
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image42"
        )
        .setScale(0.2);
    } else if (this.enterCount === 15) {
      // 이미지 변경
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image43"
        )
        .setScale(0.2);
    } else if (this.enterCount === 16) {
      // 이미지 변경
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image44"
        )
        .setScale(0.2);
    } else if (this.enterCount === 17) {
      // 이미지 변경
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image45"
        )
        .setScale(0.2);
    } else if (this.enterCount === 18) {
      // 이미지 변경
      this.image.destroy();
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image46"
        )
        .setScale(0.2);
    } else if (this.enterCount === 19) {
      // 이미지 변경
      this.image.destroy();
      this.timer.remove(false);
      this.image = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "image47"
        )
        .setScale(0.2);
      this.gameClear();
    }

    this.enterCountText.setText(`Score: ${this.enterCount}`);
  }

  onTimerTick() {
    this.timeLimit--;
    this.text.setText(`Byungsin: ${this.timeLimit}`);

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
        console.log("hi");
      },
    });
  }
}
