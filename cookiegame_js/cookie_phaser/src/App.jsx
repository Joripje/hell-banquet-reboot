import "./assets/DotFont.css";
import styled from "styled-components";
import GameMain from "./assets/game_main.gif";
import { useState } from "react";
import ABCGame from "./component/cookiegame/ABCGame";
import Gameover from "./assets/gameover.png";
import GameClear from "./assets/gameclear.png";

function App() {
  const [gameState, setGameState] = useState(0); // 0: 대기중, 1: 게임중, 2:게임오버, 3: 게임 클리어
  const [gameScore, setGameScore] = useState(0);

  const setGameWait = () => {
    setGameState(0);
  };
  const setGameStart = () => {
    setGameState(1);
  };

  const setGameover = () => {
    setGameState(2);
  };

  const setGameClear = (data) => {
    setGameScore(data);
    setGameState(3);
  };

  switch (gameState) {
    case 0:
      return (
        <ContainerGame>
          <MainImage src={GameMain} />

          <TitleContainer>
            <div>즐거운</div>
            <div>쿠키게임^^</div>
          </TitleContainer>

          <ContainerButton>
            <GameButton onClick={setGameStart}>게임 시작</GameButton>
          </ContainerButton>
        </ContainerGame>
      );
    case 1:
      return (
        <ContainerGame>
          <ABCGame setGameover={setGameover} setGameClear={setGameClear} />
        </ContainerGame>
      );
    case 2: // 게임오버
      return (
        <ContainerGame>
          <MainImage src={Gameover} />
          <ContainerButton>
            <GameButton
              onClick={setGameStart}
              backgroundColor="black"
              textColor="white"
            >
              다시하기
            </GameButton>
          </ContainerButton>
        </ContainerGame>
      );
    case 3: // 게임 클리어
      return (
        <ContainerGame>
          <MainImage src={GameClear} />

          <TimeLimitText>남은 시간: {gameScore}</TimeLimitText>
          <ContainerButton>
            <GameButton
              onClick={setGameWait}
              backgroundColor="black"
              textColor="white"
            >
              메인으로
            </GameButton>
          </ContainerButton>
        </ContainerGame>
      );
    default:
      return null;
  }
  // return (
  //   <ContainerGame>
  //     {!isGameStart && <MainImage src={GameMain} />}
  //     {!isGameStart && (
  //       <TitleContainer>
  //         <div>즐거운</div>
  //         <div>쿠키게임^^</div>
  //       </TitleContainer>
  //     )}
  //     {isGameStart ? (
  //       <ABCGame setGameover={setGameover} setGameClear={setGameClear} />
  //     ) : (
  //       <ContainerButton>
  //         <GameButton onClick={setGameStart}>게임 시작</GameButton>
  //       </ContainerButton>
  //     )}
  //   </ContainerGame>
  // );
}

// function App() {
//   const [isGameStart, setIsGameStart] = useState(false);

//   const handlesetIsGameStart = () => {
//     setIsGameStart(true);
//   };

//   return (
//     <ContainerGame>
//       {!isGameStart && <MainImage src={GameMain} />}
//       {!isGameStart && (
//         <TitleContainer>
//           <div>즐거운</div>
//           <div>쿠키게임^^</div>
//         </TitleContainer>
//       )}
//       {isGameStart ? (
//         <div id="phaser-container"></div>
//       ) : (
//         <ContainerButton>
//           <GameButton onClick={handlesetIsGameStart}>게임 시작</GameButton>
//         </ContainerButton>
//       )}
//     </ContainerGame>
//   );
// }

const ContainerGame = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;

const MainImage = styled.img`
  width: 100%;
`;

const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TitleContainer = styled.div`
  font-family: "DotFont";
  font-size: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 18%;
  left: 52%;
  transform: translate(-50%, -50%);
  background: linear-gradient(
    to right,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: black;
`;

const GameButton = styled.button`
  font-family: "DotFont";
  font-size: 50px;
  background-color: ${(props) => props.backgroundColor || "red"};
  color: ${(props) => props.textColor || "black"};
`;

const TimeLimitText = styled.div`
  font-family: "DotFont";
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  font-weight: bold;
`;
export default App;
