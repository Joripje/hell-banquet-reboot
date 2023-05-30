import { useState, useEffect } from "react";

import { HeaderBar, SideBar } from "../../components/navbar";
import { DateSelector } from "../../components/common";
import MenuOverview from "../../components/diet/MenuOverview";
import {DailyStatistics, WeeklyStatistics, WeeklyBar} from "../../components/statistics";
import { getLeftoverData } from "../../api/leftover";

import styled from "styled-components";
import { Grid } from "@mui/material";

function WeekStaticPage() {
  const [date, setDate] = useState("2023-04-03");
  const [singleDay, setSingleDay] = useState("2023-04-03")
  const [week, setWeek] = useState("2023-W14");
  const [info, setInfo] = useState([{
    id: 1,
    served: 1000,
    leftovers: 33,
    date: "2023-03-24",
  }]);

  function makeDateWeekly(dateStr) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 7);
    return date.toISOString().slice(0, 10);
  }

  useEffect(() => {
    function getFirstDayOfWeek(week) {
      const yearStart = new Date(week.slice(0, 4), 0, 1);
      const firstDay = new Date(
        yearStart.getTime() +
          ((week.slice(6) - 1) * 7 + 1 - yearStart.getDay()) * 86400000
      );
      const newTarget = firstDay.toISOString().split("T")[0]
      setDate(newTarget);
      setSingleDay(newTarget)
    }
    getFirstDayOfWeek(week);
  }, [week]);

  useEffect(() => {
    const fetchLeftoverData = async () => {
      try {
        const response = await getLeftoverData(
          {
            startDate: date,
            endDate: makeDateWeekly(date),
          },
          (data) => {
            return data.data
          },
          (err) => console.log(err)
        );
        if (response && response.length) {
          setInfo(response);
        } else {
          setInfo([{
            id: 1,
            served: 1000,
            leftovers: 33,
            date: "2023-03-24",
          }]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLeftoverData();
  }, [date]);

  return (
    <>
      <HeaderBar />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar />
        <Container>
          <DateSelector week={week} setWeek={setWeek} />
          <Grid container style={styleForGrid} >
            <Grid item xs={8}>
              <WeeklyBar info={info} date={date} setSingleDay={setSingleDay} />
            </Grid>
            <Grid item xs={4}>
              <WeeklyStatistics
              info={info}
                date={date}
                setDate={setDate}
                week={week}
                setWeek={setWeek}
                course={1}
              />
            </Grid>
          </Grid>
          <FlexContainer>
            <DailyStatistics date={singleDay} course={1} />
            <MenuOverview date={singleDay} />
            <DailyStatistics date={singleDay} course={2} />
          </FlexContainer>
        </Container>
      </div>
    </>
  );
}

const styleForGrid = {
  background: 'rgba(103, 80, 164, 0.2)'

}

const Container = styled.div`
  width: 100%;
  margin: 30px 5% 0px 5%;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100%;
  background: rgba(103, 80, 164, 0.2);
  margin: 4% 0 4% 0;
`;

export default WeekStaticPage;
