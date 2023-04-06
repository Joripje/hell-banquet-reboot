import { useState, useEffect } from "react";
import staticJanban from "../../assets/images/staticJanban.png";

import { LinkDecoNone } from "../common";
import { getUserImg } from "../../api/janbani";

import styled from "styled-components";
import { Button, Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import HellLivingPoint from "./HellLivingPoint";

function OverviewDailyJanban() {
  const [isLoading, setIsLoading] = useState(true);
  const [janbanImg, setJanbanImg] = useState(staticJanban);
  const date = new Date().getHours();
  // const janbanCode = "GRD_002";
  const janbanOption =
    date < 14
      ? { url: `/record-meal`, message: "식사하러 가기" }
      : { url: `/record-meal/janban`, message: "잔반이 확인하기" };

  useEffect(() => {
    const handleGetJanban = async () => {
      await getUserImg(
        { userId: localStorage.getItem("userId") },
        (data) => {
          console.log(data)
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

  return (
      <Container style={styleForContainer}>
        <Box>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <JanbanImg
                src={janbanImg ? janbanImg : staticJanban}
                alt="잔반이"
              />
              <HellLivingPoint />
            </>
          )}
        </Box>
        {isLoading ? <></> : (
          <TypoJanban>
          {janbanImg ? janbanImg : "... 잔반이가 아직 자고있네요 zZ"}
        </TypoJanban>
        )}
        {!janbanImg && (
          <LinkDecoNone to="/record-meal">
            <Button variant="contained" style={{ backgroundColor: "#492369", margin: 10 }}>
              잔반이 깨우러 가기
            </Button>
          </LinkDecoNone>
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
  );
}

const styleForContainer = {
  display: 'flex',
  flexDirection: 'column',
  height: "100%",
  alignItems: 'center',

}

const JanbanImg = styled.img`
  width: auto;
  height: auto;
  max-width: 200px;
  max-height: 200px;
  // margin-top: 5%;
  // margin-left: 10%;
`;

const TypoJanban = styled.p`
  margin: 0;
  text-align: center;
  font-family: CookieRun-Regular;
  font-size: 20px;
`;

export default OverviewDailyJanban;
