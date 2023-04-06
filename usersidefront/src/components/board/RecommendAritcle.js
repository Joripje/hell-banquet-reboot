import { useState, useEffect } from "react";
import staticJanban from "../../assets/images/staticJanban.png";
import { getTodayArticle } from "../../api/board";
import { getUserImg } from "../../api/janbani";

import styled from "styled-components";
import { Grid } from "@mui/material";

import { BoardListItem } from ".";

function RecommendAritcle() {
  const dummy = {
    writer: "manager",
    content: "아직 오늘 작성된 게시글이 없어요",
  };
  const [todayArticle, setTodayArticle] = useState(dummy);
  const [janbanImg, setJanbanImg] = useState();

  const date = new Date().toISOString().split("T")[0];

  useEffect(() => {
    getTodayArticle(
      date,
      (data) => {
        console.log(data);
        return data.data;
      },
      (err) => console.log(err)
    ).then((data) => {
      if (data) setTodayArticle(data);
    });
  }, [date]);
  useEffect(() => {
    const handleGetJanban = async () => {
      await getUserImg(
        { userId: todayArticle.writer },
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
  }, [todayArticle]);

  if (todayArticle !== "아직 오늘 작성된 게시글이 없어요") {
    return (
      <ContainerForNone>
        <Typo><span style={{color: "#950101"}}>{todayArticle.writer}</span>님의 메시지입니다.</Typo>
        <BoardListItem article={todayArticle} isChild={true}/>
        {/* <Grid container>
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <Typo fontSize={24} style={{ marginTop: "15px" }}>
              {todayArticle?.writer}
            </Typo>
            <StaticJanbanImg
              src={janbanImg ? janbanImg : staticJanban}
              alt='잔반이'
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{ textAlign: "center", alignSelf: "center" }}
          >
            <Typo fontSize={24}>{todayArticle.content}</Typo>
          </Grid>
        </Grid> */}
      </ContainerForNone>
    );
  } else {
    return (
      <div>
        {todayArticle === []
          ? todayArticle.content
          : "아직 추천할만한 게시글이 없네요..."}
      </div>
    );
  }
}

const ContainerForNone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Typo = styled.div`
  font-size: 18px;
  text-align: center;
  font-family: KimjungchulMyungjo-Bold;
`;

const StaticJanbanImg = styled.img`
  width: 100%;
  margin-top: 15px;
`;

export default RecommendAritcle;
