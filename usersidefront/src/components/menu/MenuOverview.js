import { useState, useEffect } from "react";

import { getMenusByDate } from "../../api/menu";
import MenuBox from "./MenuBox";
import styled from "styled-components";

function MenuOverview(params) {
  const date = new Date().toISOString().split("T")[0];
  const {onClick, target} = params
  const [result, setResult] = useState();

  useEffect(() => {
    const handleGetMenuByDate = async (date) => {
      await getMenusByDate(
        { date: date, managerId: "manager" },
        (data) => {
          return data.data;
        },
        (err) => console.log(err)
      ).then((data) => {
        setResult(data);
      });
    };

    handleGetMenuByDate(date);
  }, [date]);

  return (
    <Container>
      {result?.map((menu, index) => {
        return (
          <MenuBox menu={menu} key={index} target={target} onClick={onClick} />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: 100%;
`;
export default MenuOverview;
