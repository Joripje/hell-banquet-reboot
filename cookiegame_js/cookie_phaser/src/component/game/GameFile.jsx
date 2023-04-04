// import Phaser from "phaser";
// import Scene1 from "./scenes/Scene1";
// import Scene2 from "./scenes/Scene2";
// import Scene3 from "./scenes/Scene3";
// import Scene4 from "./scenes/Scene4";

// function GameFile() {
//   const config = {
//     type: Phaser.AUTO,
//     scale: {
//       parent: "ContainerGame",
//       mode: Phaser.Scale.HEIGHT_CONTROLS_HEIGHT,
//       width: 300,
//       height: 700,
//     },

//     scene: [Scene1],
//   };

//   return <Phaser.Game {...config} />;
// }

// export default GameFile;

import Phaser from "phaser";
import Scene1 from "./scenes/Scene1";
import Scene2 from "./scenes/Scene2";
import Scene3 from "./scenes/Scene3";
import Scene4 from "./scenes/Scene4";

function GameFile() {
  const config = {
    type: Phaser.AUTO,
    scale: {
      parent: "ContainerGame",
      mode: Phaser.Scale.HEIGHT_CONTROLS_HEIGHT,
      width: 300,
      height: 700,
    },
    scene: [Scene1, Scene2, Scene3, Scene4],
  };

  return <Phaser.Game {...config} />;
}

export default GameFile;
