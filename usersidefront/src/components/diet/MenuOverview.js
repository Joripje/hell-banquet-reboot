import { useState, useEffect } from "react";

import { getMenusByDate } from "../../api/menu";
import MenuBox from "./MenuBox";
import styled from "styled-components";

function MenuOverview(params) {
  const { date } = params
  const [result, setResult] = useState([]);

  useEffect(() => {
    const handleGetMenuByDate = async () => {
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
    handleGetMenuByDate();
  }, [date]);

  return (
    <Container style={params?.style}>
      {result.map((menu, index) => {
        return <MenuBox menu={menu} key={index} />;
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: 40%;
`;
export default MenuOverview;
