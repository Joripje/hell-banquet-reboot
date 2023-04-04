import ABCam from "./ABCam";
import Phaser from "phaser";
import { Scene1 } from "./Scene1";
import { Scene2 } from "./Scene2";
import { Scene3 } from "./Scene3";
import { Scene4 } from "./Scene4";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const RunGame = () => {
  const game = useRef(null);
  const [ABCount, setABCount] = useState(0);

  const AB = () => {
    console.log("냠냠");
    setABCount((ABCount) => ABCount + 1);
  };

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: "phaser-container",
      scale: {
        mode: Phaser.Scale.HEIGHT_CONTROLS_HEIGHT,
        width: 600,
        height: 600,
      },
      backgroundColor: "#ffffff",
      scene: [Scene1, Scene2, Scene3, Scene4],
    };

    game.current = new Phaser.Game(config);
    // new Phaser.Game(config);
  }, []);

  return (
    <Container>
      <WebCamContainer>
        <ABCam AB={AB} />
      </WebCamContainer>
      <PhaserContainer ref={game} id="phaser-container" />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
`;

const WebCamContainer = styled.div`
  height: 50%;
  width: 100%;
`;

const PhaserContainer = styled.div`
  height: 50%;
`;

export default RunGame;
