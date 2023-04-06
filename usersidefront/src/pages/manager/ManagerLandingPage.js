import { useState, useEffect } from "react";

import { HeaderBar, SideBar } from "../../components/navbar";
import { DateSelector } from "../../components/common";
import MenuOverview from "../../components/diet/MenuOverview";
import DailyStatistics from "../../components/statistics/DailyStatistics";

import styled from "styled-components";

function ManagerLandingPage() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    console.log(date);
  }, [date]);
  return (
    <>
      <HeaderBar />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar />
        <Container>
          <DateSelector date={date} setDate={setDate} />
          <DailyStaticContainer>
            <DailyStatistics date={date} course={1} />
            <MenuOverview />
            <DailyStatistics date={date} course={2} />
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
  align-items: center;
  height: auto;
  width: 100%;
  background: rgba(103, 80, 164, 0.2);
  margin: 4% 0 4% 0;
`;

export default ManagerLandingPage;
