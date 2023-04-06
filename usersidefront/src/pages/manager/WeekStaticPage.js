import { useState, useEffect } from "react";

import { HeaderBar, SideBar } from "../../components/navbar";
import { DateSelector } from "../../components/common";
import MenuOverview from "../../components/diet/MenuOverview";
import DailyStatistics from "../../components/statistics/DailyStatistics";
import WeeklyStatistics from "../../components/statistics/WeeklyStatistics";

import styled from "styled-components";

function WeekStaticPage() {
  const [date, setDate] = useState("2023-04-03");
  const [week, setWeek] = useState("2023-W14");

  useEffect(() => {
    function getFirstDayOfWeek(week) {
      const yearStart = new Date(week.slice(0, 4), 0, 1);
      const firstDay = new Date(
        yearStart.getTime() +
          ((week.slice(6) - 1) * 7 + 1 - yearStart.getDay()) * 86400000
      );
      setDate(firstDay.toISOString().split("T")[0]);
    }
    getFirstDayOfWeek(week);
  }, [week]);

  return (
    <>
      <HeaderBar />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar />
        <Container>
          <DateSelector week={week} setWeek={setWeek} />
          <FlexContainer>
            <WeeklyStatistics
              date={date}
              setDate={setDate}
              week={week}
              setWeek={setWeek}
              course={1}
            />
          </FlexContainer>
          <FlexContainer>
            <DailyStatistics date={date} course={1} />
            <MenuOverview />
            <DailyStatistics date={date} course={2} />
          </FlexContainer>
        </Container>
      </div>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  margin: 30px 5% 0px 5%;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 40vh;
  width: 100%;
  background: rgba(103, 80, 164, 0.2);
  margin: 4% 0 4% 0;
`;

export default WeekStaticPage;
