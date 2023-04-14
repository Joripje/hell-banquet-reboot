import React, { useState } from "react";
import styled from "styled-components";

interface Problem {
  id: number;
  items: Array<Array<number>>;
  answer: number;
}

interface DestinationProps {
  attribute: number;
  xIndex: number;
  yIndex: number;
}

const GameBoard: React.FC = () => {
  const initialProblem: Problem = {
    id: 1,
    items: [
      [-1, 1, -1, 3, 2, -1, -1],
      [-1, 0, 0, 0, 0, 0, 1],
      [-1, 0, 0, 0, 0, 0, -1],
      [-1, 0, 0, 0, 0, 0, 2],
      [-1, 0, 0, 0, 0, 0, -1],
      [-1, 0, 0, 0, 0, 0, 3],
      [-1, -1, -1, -1, -1, -1, -1],
    ],
    answer: 3,
  };
  const [boardState, setBoardState] = useState(initialProblem);

  const getRandomNumber = (): [number, number] => {
    const numbers = [1, 2, 3, 4, 5];
    const sections = [1, 2, 3, 4];
    const numIndex = Math.floor(Math.random() * numbers.length);
    const sectionIndex = Math.floor(Math.random() * sections.length);
    const selectedNumber = numbers.splice(numIndex, 1)[0];
    const selectedSection = sections.splice(sectionIndex, 1)[0];
    if (selectedSection === 1) {
      return [selectedNumber, 0];
    } else if (selectedSection === 2) {
      return [selectedNumber, 6];
    } else if (selectedSection === 3) {
      return [6, selectedNumber];
    } else if (selectedSection === 4) {
      return [0, selectedNumber];
    }
  };

  const generateProblem = (): void => {
    const problem: Array<Array<number>> = Array(7)
      .fill(0)
      .map((_, i) =>
        Array(7)
          .fill(0)
          .map((_, j) => {
            if (i === 0 || i === 6 || j === 0 || j === 6) {
              return -1;
            }
            return 0;
          })
      );

    const destinations = [1, 2, 3, 1, 2, 3];

    while (destinations.length > 0) {
      const [x, y] = getRandomNumber();
      if (problem[y][x] === -1) {
        problem[y][x] = destinations.pop()!;
      }
    }

    const newProblem: Problem = {
      id: boardState.id + 1,
      items: problem,
      answer: 25,
    };
    setBoardState(newProblem);
  };

  const onClickHandler = (
    event: MouseEvent,
    xIndex: number,
    yIndex: number,
    rotate: number
  ) => {
    event.preventDefault();
    const itemValue = boardState.items[yIndex][xIndex];
    const newBoardState = boardState.items.map((row, rowIndex) =>
      rowIndex === yIndex
        ? row.map((value, columnIndex) =>
            columnIndex === xIndex ? (itemValue === 0 ? rotate : 0) : value
          )
        : row
    );
    setBoardState({ ...boardState, items: newBoardState });
  };

  return (
    <RowFlexBox>
      <div>
        {boardState.items.map((item, yIndex) => {
          return (
            <RowFlexBox key={yIndex}>
              {item.map((rowValue, xIndex) => {
                if (rowValue === 0 || rowValue === 4 || rowValue === 5) {
                  return (
                    <EmptyBox attribute={rowValue} key={xIndex}>
                      <LeftTopDiagonal
                        attribute={rowValue}
                        xIndex={xIndex}
                        yIndex={yIndex}
                        onClick={(event: MouseEvent) =>
                          onClickHandler(event, xIndex, yIndex, 4)
                        }
                      />
                      <RightTopDiagonal
                        attribute={rowValue}
                        xIndex={xIndex}
                        yIndex={yIndex}
                        onClick={(event: MouseEvent) =>
                          onClickHandler(event, xIndex, yIndex, 5)
                        }
                      />
                    </EmptyBox>
                  );
                } else {
                  return (
                    <EmptyBox
                      attribute={rowValue}
                      xIndex={xIndex}
                      yIndex={yIndex}
                      key={xIndex}
                    />
                  );
                }
              })}
            </RowFlexBox>
          );
        })}
      </div>
      <button style={{ height: "3rem" }} onClick={generateProblem}>
        새 문제
      </button>
    </RowFlexBox>
  );
};

// function painterFunc(params:number) {
//     if (params === 1) return "red";
//     else if (params === 2) return "blue";
//     else if (params === 3) return "gray";
//     else if (params === -1) return "white";
//     else return "black";
// }

const EmptyBox = styled.div`
  position: relative;
  width: 100px;
  height: 100px;

  background: ${(props: DestinationProps) => {
    const { attribute } = props;
    if (attribute === 1) return "red";
    else if (attribute === 2) return "blue";
    else if (attribute === 3) return "gray";
  }};

  border: solid 1px
    ${(props: DestinationProps) => {
      const { attribute } = props;
      if (attribute === 1) return "red";
      else if (attribute === 2) return "blue";
      else if (attribute === 3) return "gray";
      else if (attribute === -1) return "white";
      else return "black";
    }};
`;

const styleForDiagonal = `
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    bottom: 0;

    height: 10px;
    background: black;
    `;

const LeftTopDiagonal = styled.div`
  ${styleForDiagonal}
  transform: rotate(45deg);
  background: ${(props: DestinationProps) => {
    const { attribute } = props;
    if (attribute === 4) return "green";
    else if (attribute === 5) return "white";
    else return "black";
  }};

  z-index: ${(props: DestinationProps) => {
    const { attribute } = props;
    if (attribute === 4) return 1;
    else return 0;
  }};
`;

const RightTopDiagonal = styled.div`
  ${styleForDiagonal}
  transform: rotate(-45deg);
  background: ${(props: DestinationProps) => {
    const { attribute } = props;
    if (attribute === 5) return "green";
    else if (attribute === 4) return "white";
    else return "black";
  }};

  z-index: ${(props: DestinationProps) => {
    const { attribute } = props;
    if (attribute === 5) return 1;
    else return 0;
  }};
`;

const RowFlexBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export default GameBoard;
