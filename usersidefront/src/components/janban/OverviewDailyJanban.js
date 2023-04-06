import { useState, useEffect } from "react";

import staticJanban from "../../assets/images/janban.png";
import { LinkDecoNone } from "../common";
import { getJanbanImg } from "../../api/janbani";

import styled from "styled-components";
import { Button, Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function OverviewDailyJanban() {
  const [isLoading, setIsLoading] = useState(true);
  const [janbanImg, setJanbanImg] = useState(staticJanban);
  const [janbanCode, setJanbanCode] = useState("GRD_001");
  const date = new Date().getHours();
  // const janbanCode = "GRD_002";
  const janbanOption =
    date < 14
      ? { url: `/record-meal`, message: "식사하러 가기" }
      : { url: `/janban`, message: "잔반이 확인하기" };

  useEffect(() => {
    const handleGetJanban = async () => {
      await getJanbanImg(
        { janbanCode: janbanCode },
        (data) => {
          console.log(data.data);
          return data.data;
        },
        (err) => console.log(err)
      ).then((res) => {
        setJanbanImg(res);
        setIsLoading(false);
      });
    };
    handleGetJanban();
  }, []);

  useEffect(() => {}, [janbanImg]);

  return (
    <OverviewBox>
      <Container style={{ position: "relative", height: "100%" }}>
        {isLoading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <JanbanImg src={janbanImg} alt="잔반이" />
        )}
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
