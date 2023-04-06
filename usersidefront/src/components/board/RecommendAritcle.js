import { useState, useEffect } from "react";
import { getTodayArticle } from "../../api/board";

import styled from "styled-components";

import { BoardListItem } from ".";

function RecommendAritcle() {
  const dummy = {
    writer: "manager",
    content: "아직 오늘 작성된 게시글이 없어요",
  };
  const [todayArticle, setTodayArticle] = useState(dummy);

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


  if (todayArticle !== "아직 오늘 작성된 게시글이 없어요") {
    return (
      <ContainerForNone>
        <Typo><span style={{color: "#950101"}}>{todayArticle.writer}</span>님의 메시지입니다.</Typo>
        <BoardListItem article={todayArticle} isChild={true}/>
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


export default RecommendAritcle;
