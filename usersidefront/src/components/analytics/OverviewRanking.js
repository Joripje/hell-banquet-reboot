import { useState, useEffect } from "react";
import { getDailyRank } from "../../api/leftover";
import styled from "styled-components";

function OverviewRanking() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    getDailyRank(
      { userId: "ssafy" },
      (data) => {
        return data.data;
      },
      (err) => console.log(err)
    ).then((data) => setResult(data));
  }, []);
  return (
    <Container>
      {result.slice(0, 3).map((data, index) => {
        const { userId, leftPercentage } = data;
        const integerPercent = Math.floor(100 * leftPercentage);
        return (
          <div key={index}>
            {index + 1} {userId} {integerPercent}
          </div>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  dispaly: flex;
  flex-direction: column;
`;

export default OverviewRanking;
