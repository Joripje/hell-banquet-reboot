import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import styled from "styled-components";
import staticJanban from "../../assets/images/janban.png";
import { LinkDecoNone } from "../common";
import { useEffect } from "react";
import { getJanbanImg } from "../../api/janbani";
import { useState } from "react";

function OverviewDailyJanban() {
  const [jabanImg, setJanbanImg] = useState(staticJanban);
  const date = new Date().getHours();
  const janbanCode = "GRD_002";
  const janbanOption =
    date < 14
      ? { url: `/record-meal`, message: "식사하러 가기" }
      : { url: `/janban`, message: "잔반이 확인하기" };

  useEffect(() => {
    const handleGetJanban = async () => {
      await getJanbanImg(
        { janbanCode: janbanCode },
        (data) => {
          console.log(data);
          //   return data.data;
        },
        (err) => console.log(err)
      ).then((data) => setJanbanImg(data));
    };
    handleGetJanban();
  }, []);

  useEffect(() => {}, [jabanImg]);

  return (
    <OverviewBox>
      <JanbanImg src={jabanImg} alt='잔반이' />
      <Container style={{ position: "relative", height: "100%" }}>
        {/* <Typography style={{ position: "absolute", bottom: "50%" }}>
          아직 안나옴!
        </Typography> */}
        <LinkDecoNone
          to={janbanOption.url}
          style={{ position: "absolute", bottom: "10%", right: "15%" }}
        >
          <Button variant='contained' color='warning'>
            {janbanOption.message}
          </Button>
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
  width: 200px;
  height: 200px;
`;

export default OverviewDailyJanban;
