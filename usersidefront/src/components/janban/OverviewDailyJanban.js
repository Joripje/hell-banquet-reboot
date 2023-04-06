import { useState, useEffect } from "react";
import staticJanban from "../../assets/images/staticJanban.png";

import { LinkDecoNone } from "../common";
import { getUserImg } from "../../api/janbani";

import styled from "styled-components";
import { Container } from "@mui/material";

function OverviewDailyJanban() {
  const [janbanImg, setJanbanImg] = useState(staticJanban);
  const date = new Date().getHours();
  const janbanOption =
    date < 14
      ? { url: `/record-meal`, message: "식사하러 가기" }
      : { url: `/record-meal/janban`, message: "잔반이 확인하기" };

  useEffect(() => {
    const handleGetJanban = async () => {
      await getUserImg(
        { userId: localStorage.getItem("userId") },
        (data) => {
          console.log(data.data);
          return data.data;
        },
        (err) => console.log(err)
      ).then((res) => {
        setJanbanImg(res);
      });
    };
    handleGetJanban();
  }, []);

  useEffect(() => {}, [janbanImg]);

  return (
    <OverviewBox>
      <JanbanImg src={janbanImg} alt='잔반이' />
      <Container style={{ position: "relative", height: "100%" }}>
        <LinkDecoNone
          to={janbanOption.url}
          style={{ position: "absolute", bottom: "10%", right: "15%" }}
        >
          {/* <Button variant='contained' color='warning'>
            {janbanOption.message}
          </Button> */}
        </LinkDecoNone>
      </Container>
    </OverviewBox>
  );
}

const OverviewBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const JanbanImg = styled.img`
  width: auto;
  height: auto;
  max-width: 200px;
  max-height: 200px;
`;

export default OverviewDailyJanban;
