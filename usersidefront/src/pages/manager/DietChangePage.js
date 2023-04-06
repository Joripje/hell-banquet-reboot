import { useEffect, useState } from "react";

import { DateSelector } from "../../components/common";
import { HeaderBar, SideBar } from "../../components/navbar";
import { DietField, ExcelButton } from "../../components/diet";
import { getMenusByDate } from "../../api/menu";

import styled from "styled-components";
import { Button, ButtonGroup } from "@mui/material";

function DietChange() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const emptyFood = { name: "", category: "", isChild: true };
  const dummyDiet = [
    [
      { name: "", category: "", isChild: false },
      { name: "", category: "", isChild: true },
      { name: "", category: "", isChild: true },
      { name: "", category: "", isChild: true },
      { name: "", category: "", isChild: true },
      { name: "", category: "", isChild: true },
    ],
    [
      { name: "", category: "", isChild: false },
      { name: "", category: "", isChild: true },
      { name: "", category: "", isChild: true },
      { name: "", category: "", isChild: true },
      { name: "", category: "", isChild: true },
      { name: "", category: "", isChild: true },
    ],
  ];
  const [foodList, setFoodList] = useState(dummyDiet);
  const [selectedButton, setSelectedButton] = useState("A");

  useEffect(() => {
    getMenusByDate(
      // { date: date, managerId: localStorage.getItem("userId") },
      { date: date, managerId: "manager" },
      (data) => {
        return data.data;
      },
      (err) => console.log(err)
    ).then((data) => {
      if (data.length !== 0) {
        const newFoodList = data.map((d) => {
          const { menuItems, menuTypes } = d;
          const response = { menuItems: menuItems, menuTypes: menuTypes };
          const formattedList = response.menuItems.map((name, index) => {
            const category = response.menuTypes[index];
            const isChild = index > 0;
            return { name, category, isChild };
          });
          return formattedList;
        });
        setFoodList(newFoodList);
      }
    });
  }, [date]);

  const addFood = (target) => {
    setFoodList({ ...foodList[target], emptyFood });
  };

  const deleteFood = (index) => {
    const newFoodList = [...foodList];
    newFoodList.splice(index, 1);
    setFoodList(newFoodList);
  };

  const styleForButton = {
    color: "#000000",
    fontWeight: 1000,
    border: "2px solid black",
  };

  useEffect(() => {}, [foodList]);

  return (
    <>
      <HeaderBar />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar />
        <Container>
          <ExcelButton buttonName={"식단 일괄 수정"} />
          <FlexBox style={{ display: "flex" }}>
            <DateSelector setDate={setDate} date={date} />
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
          {foodList[selectedButton === "A" ? 0 : 1].map((food, index) => {
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
        {/* <Container
          style={{ display: "flex", justifyContent: "center" }}
        ></Container> */}
      </div>
    </>
  );
}

// const Container = styled.div`
//   width: 100vh;
// `;
const Container = styled.div`
  width: 100%;
  margin: 30px 5% 0px 5%;
`;
const FlexBox = styled.div`
  display: flex;
`;

export default DietChange;
