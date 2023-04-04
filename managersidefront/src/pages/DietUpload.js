import { useEffect, useState } from "react";

import { HeaderBar, SideBar } from "../components/navbar";
import { DateSelector, ExcelButton } from "../components/common";
import { DietField } from "../components/diet";

import styled from "styled-components";
import { Button, ButtonGroup } from "@mui/material";

function DietUpload() {
  const emptyFood = { name: "", category: "", isChild: true };
  const [foodList, setFoodList] = useState([
    [{ ...emptyFood, isChild: false }],
    [{ ...emptyFood, isChild: false }],
  ]);
  const [selectedButton, setSelectedButton] = useState(0);

  useEffect(() => {}, [foodList]);

  const addFood = () => {
    const newFoodList = { ...foodList };
    newFoodList[selectedButton] = [
      ...newFoodList[selectedButton],
      { ...emptyFood },
    ];
    setFoodList(newFoodList);
  };

  const deleteFood = (index) => {
    const newFoodList = { ...foodList };
    newFoodList[selectedButton] = [...newFoodList[selectedButton]];
    newFoodList[selectedButton].splice(index, 1);
    setFoodList(newFoodList);
  };

  const styleForButton = {
    color: "#000000",
    fontWeight: 1000,
    border: "2px solid black",
  };

  return (
    <>
      <HeaderBar />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar />
        <Container>
          <ExcelButton buttonName={"식단 일괄 등록"} />
          <FlexBox style={{ display: "flex" }}>
            <DateSelector />
            <ButtonGroup style={{ marginLeft: 20 }}>
              <Button
                onClick={() => setSelectedButton("A")}
                variant={selectedButton === "A" ? "contained" : "outlined"}
              >
                A : 한식
              </Button>
              <Button
                onClick={() => setSelectedButton("B")}
                variant={selectedButton === "B" ? "contained" : "outlined"}
              >
                B : 일품
              </Button>
            </ButtonGroup>
          </FlexBox>
          <br />
          {foodList[selectedButton].map((food, index) => {
            return (
              <DietField
                food={food}
                key={index}
                index={index}
                addFood={addFood}
                deleteFood={deleteFood}
              />
            );
          })}
          <br />
          <hr />
          <Button variant='outlined' style={styleForButton}>
            등록
          </Button>
        </Container>
        {/* <Container style={{ display: "flex", justifyContent: "center" }}>
        </Container> */}
      </div>
    </>
  );
}

const Container = styled.div`
  margin: 30px calc(5%) 0px calc(5%);
`;

const FlexBox = styled.div`
  display: flex;
`;

export default DietUpload;
