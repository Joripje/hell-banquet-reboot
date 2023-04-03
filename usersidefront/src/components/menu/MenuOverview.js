import { useState, useEffect } from "react";

import { getMenusByDate } from "../../api/menu";
import MenuBox from "./MenuBox";
import styled from "styled-components";

function MenuOverview() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const handleGetMenuByDate = async () => {
      await getMenusByDate(
        { date: "2020-03-01", managerId: "mmy789" },
        (data) => {
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
    <Container>
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

  width: 100%;
`;
export default MenuOverview;
