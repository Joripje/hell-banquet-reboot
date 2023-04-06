import { useState, useEffect } from "react";

import staticJanban from "../../assets/images/janban.png";
import { getUserImg } from "../../api/janbani";

import styled from "styled-components";

function DailyRanking(params) {
  const { info, king } = params;
  const [janbanImg, setJanbanImg ] = useState()

  const handleGetJanban = async () => {
    await getUserImg(
      { userId: info.userId },
      (data) => {
        return data.data;
      },
      (err) => console.log(err)
    ).then((res) => {
        console.log(res)
      setJanbanImg(res);
    });
  };

useEffect(() => {
    handleGetJanban()
}, [info])

  return (
    <RankBox>
      <div>
        <StaticJanbanImg src={janbanImg ? janbanImg : staticJanban} />
        {info.rank - king.rank} {info.userId}
      </div>
    </RankBox>
  );
}

const RankBox = styled.div`
  color: black;
  margin: 10px 0px 10px 0px;
  background: #e5e5e5;
  width: 80%;
  border-radius: 20px;
`;

const StaticJanbanImg = styled.img`
  width: 60px;
  margin-top: 15px;
`;

export default DailyRanking;
