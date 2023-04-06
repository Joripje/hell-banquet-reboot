import { useState, useEffect } from "react";

import { getMenusByDate } from "../../api/menu";
import { getLeftover } from "../../api/leftover";
import MunuBox from "./MunuBox";
import styled from "styled-components";

function SelectMunu(params) {
  const date = new Date().toISOString().split("T")[0];
  const onClick = params?.onClick;
  const target = params?.target;
  const [result, setResult] = useState();
  const [selectedMenu, setSelectedMenu] = useState(0);
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
    const getUserSelect = async () => {
      await getLeftover(
        { date: date, userId: localStorage.userId },
        (data) => {
          setSelectedMenu(data.data.course);
        },
        (err) => {
          console.log(err);
        }
      );
    };
    handleGetMenuByDate();
    getUserSelect();
  }, []);

  // useEffect(() => {}, [result, localStorage]);

  return (
    <Container>
      {result?.map((menu, index) => {
        return index === selectedMenu ? (
          <MunuBox
            menu={menu}
            key={index}
            target={target}
            onClick={onClick}
            select={1}
          />
        ) : (
          <MunuBox
            menu={menu}
            key={index}
            target={target}
            onClick={onClick}
            select={0}
          />
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
export default SelectMunu;
