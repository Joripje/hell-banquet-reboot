// function CookieGame() {
//   return <div>안녕</div>;
// }

// export default CookieGame;

// import Phaser from "phaser";
// import { Scene1 } from "./Scene1";
// import { Scene2 } from "./Scene2";
// const config = {
//   type: Phaser.AUTO,
//   parent: "phaser-container",
//   scale: {
//     mode: Phaser.Scale.HEIGHT_CONTROLS_HEIGHT,
//     width: 300,
//     height: 700,
//   },
//   backgroundColor: "#ffffff",
//   scene: [Scene1, Scene2],
// };

// export default new Phaser.Game(config);

// import React, { useEffect, useRef } from "react";
// import Phaser from "phaser";
// import { Scene1 } from "./Scene1";

// const CookieGame = () => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const config = {
//       type: Phaser.AUTO,
//       parent: containerRef.current,
//       scale: {
//         mode: Phaser.Scale.FIT,
//         autoCenter: Phaser.Scale.CENTER_BOTH,
//         width: 300,
//         height: 600,
//       },
//       backgroundColor: "#ffffff",
//       scene: [Scene1],
//     };

//     new Phaser.Game(config);
//   }, []);

//   return <div ref={containerRef}></div>;
// };

// export default CookieGame;
