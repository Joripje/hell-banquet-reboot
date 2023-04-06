import { useState, useEffect } from "react";

import staticJanban from "../../assets/images/janban.png";
import { getUserImg } from "../../api/janbani";

import styled from "styled-components";

function RankingItem(params) {
    const {rankIndex, userId} = params
    const [janbanImg, setJanbanImg ] = useState()

    const handleGetJanban = async () => {
        await getUserImg(
          { userId: userId },
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
    }, [userId])

    return (
        <RankBox key={rankIndex}>
        <StaticJanbanImg
          src={janbanImg ? janbanImg : staticJanban}
          rank={rankIndex}
          alt='잔반이'
        />
        <div>
          {rankIndex}등 {userId}
        </div>
      </RankBox>
    )
}

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

export default RankingItem