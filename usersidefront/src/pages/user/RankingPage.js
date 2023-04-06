import { useState, useEffect } from "react";

import { LogedPageTemplate } from "../../components/common";
import { OverviewRanking, DailyRanking } from "../../components/analytics";
import { getDailyRank } from "../../api/leftover";

import styled from "styled-components";

function RankingPage() {
  const [result, setResult] = useState(["user1", "user3", "user2"]);

  useEffect(() => {
    getDailyRank(
      { userId: localStorage.getItem("userId") },
      (data) => {
        return data.data;
      },
      (err) => console.log(err)
    ).then((data) => setResult(data));
  }, []);

  return (
      <LogedPageTemplate>

      <Container>
        <OverviewRanking />
        {result.length > 4 ? (
          result.slice(4).map((info, index) => {
            return <DailyRanking info={info} king={result[0]} key={index} />;
          })
        ) : (
          <RankBox> 오늘은 참여자가 별로 없네요ㅠ</RankBox>
        )}
      </Container>
      </LogedPageTemplate>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RankBox = styled.div`
  color: black;
  margin: 10px 0px 10px 0px;
  background: #e5e5e5;
  width: 80%;
`;

export default RankingPage;
