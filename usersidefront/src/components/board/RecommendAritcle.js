import { useState, useEffect } from "react";
import staticJanban from "../../assets/images/janban.png";
import { getTodayArticle } from "../../api/board";

import styled from "styled-components";
import { Grid } from "@mui/material";

function RecommendAritcle() {
  const dummy = {
    writer: "관리자",
    content: "아직 오늘 작성된 게시글이 없어요",
  };
  const [todayArticle, setTodayArticle] = useState(dummy);

  const date = new Date().toISOString().split("T")[0];

  useEffect(() => {
    getTodayArticle(
      date,
      (data) => {
        return data.data;
      },
      (err) => console.log(err)
    ).then((data) => setTodayArticle(data));
  }, [date]);

  if (todayArticle !== "아직 오늘 작성된 게시글이 없어요") {
    return (
      <ContainerForNone>
        <Grid container>
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <Typo fontSize={24} style={{ marginTop: "15px" }}>
              {todayArticle?.writer}
            </Typo>
            <StaticJanbanImg src={staticJanban} alt='잔반이' />
          </Grid>
          <Grid
            item
            xs={6}
            style={{ textAlign: "center", alignSelf: "center" }}
          >
            <Typo fontSize={24}>{todayArticle.content}</Typo>
          </Grid>
        </Grid>
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
  font-size: 24px;
  text-align: center;
`;

const StaticJanbanImg = styled.img`
  width: 100%;
  margin-top: 15px;
`;

export default RecommendAritcle;
