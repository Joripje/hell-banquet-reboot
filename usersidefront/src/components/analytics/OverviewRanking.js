import { useState, useEffect } from "react";
import { getDailyRank } from "../../api/leftover";
import staticJanban from "../../assets/images/janban.png";
import styled from "styled-components";
import RankingItem from "./RankingItem";

function OverviewRanking() {
  const [result, setResult] = useState(["user1", "user3", "user2"]);
  const [janbanImg, setJanbanImg ] = useState(staticJanban)
  const rankingIndex = [2, 1, 3];

  useEffect(() => {
    getDailyRank(
      { userId: localStorage.getItem("userId") },
      (data) => {
        return data.data;
      },
      (err) => console.log(err)
    ).then((data) => setResult(data));
  }, [])



  return (
    <Container>
      {rankingIndex.map((rankIndex, index) => {
        if (result.length > index) {
          const { userId } = result[rankIndex - 1];
          return (
            <RankingItem userId={userId} rankIndex={rankIndex} ></RankingItem>
          );
        } else {
          return <div key={index}>왜 아무도 밥을 안먹어!ㅠㅠㅠ</div>;
        }
      })}
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;


export default OverviewRanking;
