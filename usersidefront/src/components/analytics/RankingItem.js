import { useState, useEffect } from "react";

import staticJanban from "../../assets/images/janban.png";
import { getUserImg } from "../../api/janbani";

import styled from "styled-components";

function RankingItem(params) {
  const { rankIndex, userId } = params;
  const [janbanImg, setJanbanImg] = useState();

  const handleGetJanban = async () => {
    await getUserImg(
      { userId: userId },
      (data) => {
        return data.data;
      },
      (err) => console.log(err)
    ).then((res) => {
      console.log(res);
      setJanbanImg(res);
    });
  };

  useEffect(() => {
    handleGetJanban();
  }, [userId]);

  return (
    <RankBox key={rankIndex}>
      <StaticJanbanImg
        src={janbanImg ? janbanImg : staticJanban}
        rank={rankIndex}
        alt="잔반이"
      />
      <Typo>{rankIndex}등</Typo>
      <Typo style={{ fontSize: "20px", fontWeight: "600" }}>
        {userId}
      </Typo>
    </RankBox>
  );
}

const RankBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  text-align: center;
  align-items: center;
`;

const StaticJanbanImg = styled.img`
  width: ${(props) => (4 - props.rank) * 60}px;
  margin-top: 15px;
`;

const Typo = styled.p`
  font-family: CookieRun-Regular;
  margin: 0;
  text-transform: uppercase;
`;

export default RankingItem;