import { useState, useEffect } from "react";

import staticJanban from "../../assets/images/janban.png";
import { getUserImg } from "../../api/janbani";

import styled from "styled-components";

function DailyRanking(params) {
  const { info, king } = params;
  const [janbanImg, setJanbanImg] = useState();

  const handleGetJanban = async () => {
    await getUserImg(
      { userId: info.userId },
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
  }, [info]);

  return (
    <RankBox>
      <Typo>{info.rank - king.rank}등</Typo>
      <StaticJanbanImg src={janbanImg ? janbanImg : staticJanban} />
      <Typo>{info.userId}</Typo>
    </RankBox>
  );
}

const RankBox = styled.div`
  color: black;
  margin: 10px 0px 10px 0px;
  background: #b9a0fe;
  width: 80%;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StaticJanbanImg = styled.img`
  width: 60px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 5%;
`;

const Typo = styled.p`
  font-family: CookieRun-Regular;
  margin: 0;
  margin-left: 10%;
  text-transform: uppercase;
`;

export default DailyRanking;
