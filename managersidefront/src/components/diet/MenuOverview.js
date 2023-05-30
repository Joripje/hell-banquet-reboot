import { useState, useEffect } from "react";

import { getMenuByDate } from "../../api/menu";
import MenuBox from "./MenuBox";
import styled from "styled-components";

function MenuOverview(params) {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const handleGetMenuByDate = async () => {
      await getMenuByDate(
        { date: "2023-04-03", managerId: "manager" },
        (data) => {
          console.log(data.data);
          return data.data;
        },
        (err) => console.log(err)
      ).then((data) => {
        setResult(data);
      });
    };
    handleGetMenuByDate();
  }, []);

  //   useEffect(() => {}, [result]);

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
