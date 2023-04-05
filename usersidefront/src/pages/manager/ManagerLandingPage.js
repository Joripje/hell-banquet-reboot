import styled from "styled-components";
import { HeaderBar, SideBar } from "../../components/navbar";
import { DateSelector } from "../../components/common";
import MenuOverview from "../../components/diet/MenuOverview";
import DailyStatistics from "../../components/statistics/DailyStatistics";

function ManagerLandingPage() {
  return (
    <>
      <HeaderBar />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar />
        <Container>
          <DateSelector />
          <DailyStaticContainer>
            <DailyStatistics date={"2023-03-24"} course={0} />
            <MenuOverview />
            <DailyStatistics date={"2023-03-24"} course={1} />
          </DailyStaticContainer>
        </Container>
      </div>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  margin: 30px 5% 0px 5%;
`;

const DailyStaticContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 40vh;
  width: 100%;
  background: rgba(103, 80, 164, 0.2);
  margin: 4% 0 4% 0;
`;

export default ManagerLandingPage;
