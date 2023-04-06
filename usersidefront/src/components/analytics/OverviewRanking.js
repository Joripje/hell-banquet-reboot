import { useState, useEffect } from "react";
import { getDailyRank } from "../../api/leftover";
import staticJanban from "../../assets/images/janban.png";
import styled from "styled-components";

function OverviewRanking() {
  const [result, setResult] = useState(["user1", "user3", "user2"]);
  const rankingIndex = [2, 1, 3];

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
    <Container>
      {rankingIndex.map((rankIndex, index) => {
        if (result.length > index) {
          const { userId } = result[rankIndex - 1];
          return (
            <RankBox key={rankIndex}>
              <StaticJanbanImg src={staticJanban} rank={rankIndex} alt='잔반이' />
              <div>
                {rankIndex}등 {userId}
              </div>
            </RankBox>
          );
        } else {
          return( <div key={index}>왜 아무도 밥을 안먹어!ㅠㅠㅠ</div>)
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
const RankBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  text-align: center;
`;

const StaticJanbanImg = styled.img`
  width: ${(props) => (4 - props.rank) * 60}px;
  margin-top: 15px;
`;
export default OverviewRanking;
