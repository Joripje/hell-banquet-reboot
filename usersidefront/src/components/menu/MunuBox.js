import { useEffect } from "react";
import styled from "styled-components";

function MunuBox(params) {
  const { menu, select } = params;

  useEffect(() => {}, []);

  return (
    <Box isTarget={select === 1 ? true : false}>
      <p>
        {menu.type}: {menu.category === "KOREAN" ? "한식" : "일품"}
      </p>
      <hr style={{ marginBottom: 25 }} />
      {menu?.menuItems.map((item) => {
        return <TypoForMenus key={item}>{item}</TypoForMenus>;
      })}
    </Box>
  );
}

const Box = styled.div`
  width: 40%;
  height: 80%;
  text-align: center;
  background: ${(props) =>
    props.isTarget ? "rgb(255, 255, 255, 0.9)" : "rgb(255, 255, 255, 0.3)"};
  border-radius: 20px;
`;

const TypoForMenus = styled.p`
  margin: 0;
`;

export default MunuBox;
