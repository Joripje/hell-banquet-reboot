import styled from "styled-components";
import staticJanban from "../../assets/images/janban.png";

function DailyRanking(params) {
  const { info, king } = params;
  return (
    <RankBox>
      <div>
        <StaticJanbanImg src={staticJanban} />
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
