// import { useState } from "react";
// import { format, addDays, startOfWeek } from "date-fns";
// import { LogedPageTemplate } from "../../components/common";
// import styled from "styled-components";
// import { getLeftover } from "../../api/leftover";
// import StatsticsToday from "../../components/analytics/StatisticsToday";
// import WeekPicker from "../../components/analytics/WeekPicker";
// import StatisticsWeek from "../../components/analytics/StatisticsWeek";
// import StatisticWeekDou from "../../components/analytics/StatisticWeekDou";
// function AnalysisPage(params) {
//   const [mon, setMon] = useState([]);
//   const [tue, setTue] = useState([]);
//   const [wes, setWes] = useState([]);
//   const [thu, setThu] = useState([]);
//   const [fri, setFri] = useState([]);
//   const [isToday, setIsToday] = useState(false);
//   const [selectWeek, setSelectWeek] = useState([]);
//   const [weekAfter, setWeekAfter] = useState(0);
//   const [weekBefore, setWeekBefore] = useState(0);

//   const getWeekPickerInfo = (data) => {
//     const selectedDate = new Date(data.getTime());
//     const endDate = addDays(selectedDate, 4);
//     const userId = localStorage.userId;

//     const startDateString = format(selectedDate, "yyyy-MM-dd");
//     const endDateString = format(endDate, "yyyy-MM-dd");

//     const dateRange = [];
//     for (let i = 0; i < 5; i++) {
//       const date = addDays(selectedDate, i);
//       const dateString = format(date, "yyyy-MM-dd");
//       dateRange.push(dateString);
//     }

//     setSelectWeek(dateRange);

//     const getInfo = async () => {
//       setWeekAfter(0);
//       setWeekBefore(0);
//       await getLeftover(
//         // { date: dateRange[0], userId: "string" },
//         { date: dateRange[0], userId: userId },
//         (data) => {
//           setMon([data.data.before, data.data.after]);
//           setWeekAfter(weekAfter + data.data.after);
//           setWeekBefore(weekBefore + data.data.before);
//         },
//         (err) => {
//           setMon([0, 0]);
//         }
//       );
//       await getLeftover(
//         // { date: dateRange[1], userId: "string" },
//         { date: dateRange[1], userId: userId },
//         (data) => {
//           setTue([data.data.before, data.data.after]);
//           setWeekAfter(weekAfter + data.data.after);
//           setWeekBefore(weekBefore + data.data.before);
//         },
//         (err) => {
//           setTue([0, 0]);
//         }
//       );
//       await getLeftover(
//         // { date: dateRange[2], userId: "string" },
//         { date: dateRange[2], userId: userId },
//         (data) => {
//           setWes([data.data.before, data.data.after]);
//           setWeekAfter(weekAfter + data.data.after);
//           setWeekBefore(weekBefore + data.data.before);
//         },
//         (err) => {
//           setWes([0, 0]);
//         }
//       );
//       await getLeftover(
//         // { date: dateRange[3], userId: "string" },
//         { date: dateRange[3], userId: userId },
//         (data) => {
//           setThu([data.data.before, data.data.after]);
//           setWeekAfter(weekAfter + data.data.after);
//           setWeekBefore(weekBefore + data.data.before);
//         },
//         (err) => {
//           setThu([0, 0]);
//         }
//       );
//       await getLeftover(
//         // { date: dateRange[4], userId: "string" },
//         { date: dateRange[4], userId: userId },
//         (data) => {
//           setFri([data.data.before, data.data.after]);
//           setWeekAfter(weekAfter + data.data.after);
//           setWeekBefore(weekBefore + data.data.before);
//         },
//         (err) => {
//           setFri([0, 0]);
//         }
//       );
//     };
//     getInfo();
//   };

//   if (isToday) {
//     return (
//       <>
//         <LogedPageTemplate>
//           <Container>
//             <Content>
//               <StatsticsToday />
//             </Content>
//           </Container>
//         </LogedPageTemplate>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <LogedPageTemplate>
//           <Container>
//             <Content>
//               <WeekPicker getWeekPickerInfo={getWeekPickerInfo} />
//               <StatisticWeekDou weekAfter={weekAfter} weekBefore={weekBefore} />
//               <StatisticsWeek
//                 mon={mon}
//                 tue={tue}
//                 wes={wes}
//                 thu={thu}
//                 fri={fri}
//               />
//             </Content>
//           </Container>
//         </LogedPageTemplate>
//       </>
//     );
//   }
// }

// const Container = styled.div`
//   width: 95%;
//   margin: 15px auto;
//   display: flex;
//   justify-content: center;
//   background: #e5e5e5;
//   border-radius: 30px;
// `;

// const Content = styled.div`
//   width: 100%;
//   max-width: 80vh;
//   padding: 20px;
// `;

// export default AnalysisPage;
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState, useEffect } from "react";
import { format, addDays, startOfWeek } from "date-fns";
import { LogedPageTemplate } from "../../components/common";
import styled from "styled-components";
import { getLeftover } from "../../api/leftover";
import StatsticsToday from "../../components/analytics/StatisticsToday";
import WeekPicker from "../../components/analytics/WeekPicker";
import StatisticsWeek from "../../components/analytics/StatisticsWeek";
import StatisticWeekDou from "../../components/analytics/StatisticWeekDou";
import { SelectMunu } from "../../components/menu";
import DayPicker from "../../components/analytics/DayPicker";
// import Grid from "@mui/material/Grid";
const AnalysisPage = () => {
  const [value, setValue] = React.useState("1");
  const [mon, setMon] = useState([]);
  const [tue, setTue] = useState([]);
  const [wes, setWes] = useState([]);
  const [thu, setThu] = useState([]);
  const [fri, setFri] = useState([]);
  const [date, setDate] = useState(null);
  const [selectWeek, setSelectWeek] = useState([]);
  const [updated, setUpdated] = useState(0);
  const pickDate = (data) => {
    setDate(data);
    setTimeout(() => {
      setUpdated(updated + 1);
    }, 200);
  };
  const getWeekPickerInfo = (data) => {
    const selectedDate = new Date(data.getTime());
    const endDate = addDays(selectedDate, 4);
    const userId = localStorage.userId;

    const startDateString = format(selectedDate, "yyyy-MM-dd");
    const endDateString = format(endDate, "yyyy-MM-dd");

    const dateRange = [];
    for (let i = 0; i < 5; i++) {
      const date = addDays(selectedDate, i);
      const dateString = format(date, "yyyy-MM-dd");
      dateRange.push(dateString);
    }

    setSelectWeek(dateRange);

    // const getInfo = async () => {
    //   setWeekAfter(0);
    //   setWeekBefore(0);
    //   await getLeftover(
    //     // { date: dateRange[0], userId: "string" },
    //     { date: dateRange[0], userId: userId },
    //     (data) => {
    //       setMon([data.data.before, data.data.after]);
    //       setWeekAfter(weekAfter + data.data.after);
    //       setWeekBefore(weekBefore + data.data.before);
    //     },
    //     (err) => {
    //       setMon([0, 0]);
    //     }
    //   );
    //   await getLeftover(
    //     // { date: dateRange[1], userId: "string" },
    //     { date: dateRange[1], userId: userId },
    //     (data) => {
    //       setTue([data.data.before, data.data.after]);
    //       setWeekAfter(weekAfter + data.data.after);
    //       setWeekBefore(weekBefore + data.data.before);
    //     },
    //     (err) => {
    //       setTue([0, 0]);
    //     }
    //   );
    //   await getLeftover(
    //     // { date: dateRange[2], userId: "string" },
    //     { date: dateRange[2], userId: userId },
    //     (data) => {
    //       setWes([data.data.before, data.data.after]);
    //       setWeekAfter(weekAfter + data.data.after);
    //       setWeekBefore(weekBefore + data.data.before);
    //     },
    //     (err) => {
    //       setWes([0, 0]);
    //     }
    //   );
    //   await getLeftover(
    //     // { date: dateRange[3], userId: "string" },
    //     { date: dateRange[3], userId: userId },
    //     (data) => {
    //       setThu([data.data.before, data.data.after]);
    //       setWeekAfter(weekAfter + data.data.after);
    //       setWeekBefore(weekBefore + data.data.before);
    //     },
    //     (err) => {
    //       setThu([0, 0]);
    //     }
    //   );
    //   await getLeftover(
    //     // { date: dateRange[4], userId: "string" },
    //     { date: dateRange[4], userId: userId },
    //     (data) => {
    //       setFri([data.data.before, data.data.after]);
    //       setWeekAfter(weekAfter + data.data.after);
    //       setWeekBefore(weekBefore + data.data.before);
    //     },
    //     (err) => {
    //       setFri([0, 0]);
    //     }
    //   );
    // };
    const getInfo = () => {
      getLeftover(
        // { date: dateRange[0], userId: "string" },
        { date: dateRange[0], userId: userId },
        (data) => {
          setMon([data.data.before, data.data.after]);
        },
        (err) => {
          setMon([0, 0]);
        }
      ).then();
      getLeftover(
        // { date: dateRange[1], userId: "string" },
        { date: dateRange[1], userId: userId },
        (data) => {
          setTue([data.data.before, data.data.after]);
        },
        (err) => {
          setTue([0, 0]);
        }
      );
      getLeftover(
        // { date: dateRange[2], userId: "string" },
        { date: dateRange[2], userId: userId },
        (data) => {
          setWes([data.data.before, data.data.after]);
        },
        (err) => {
          setWes([0, 0]);
        }
      );
      getLeftover(
        // { date: dateRange[3], userId: "string" },
        { date: dateRange[3], userId: userId },
        (data) => {
          setThu([data.data.before, data.data.after]);
        },
        (err) => {
          setThu([0, 0]);
        }
      );
      getLeftover(
        // { date: dateRange[4], userId: "string" },
        { date: dateRange[4], userId: userId },
        (data) => {
          setFri([data.data.before, data.data.after]);
        },
        (err) => {
          setFri([0, 0]);
        }
      );
    };
    // const resetInfo = () => {
    //   setWeekAfter(0);
    //   setWeekBefore(0);
    // };
    // resetInfo();
    setTimeout(() => {
      getInfo();
    }, 100);
    setTimeout(() => {
      setUpdated(updated + 1);
    }, 300);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <LogedPageTemplate>
      <Container>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                textColor="secondary"
                indicatorColor="secondary"
                centered
              >
                <Tab label="일간 통계" value="1" />
                <Tab label="주간 통계" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {/* <Content> */}
              <DayPicker pickDate={pickDate} />
              <StatsticsToday date={date} updated={updated} />
              <SelectMunu date={date} updated={updated} />

              {/* </Content> */}
            </TabPanel>
            <TabPanel value="2">
              {/* <Content> */}
              <WeekPicker getWeekPickerInfo={getWeekPickerInfo} />
              <StatisticWeekDou
                mon={mon}
                tue={tue}
                wes={wes}
                thu={thu}
                fri={fri}
              />
              <StatisticsWeek
                mon={mon}
                tue={tue}
                wes={wes}
                thu={thu}
                fri={fri}
              />
              {/* </Content> */}
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </LogedPageTemplate>
  );
};

// const MCContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-around;
//   align-items: center;

//   width: 100%;
// `;

const Container = styled.div`
  width: 95%;
  margin: 15px auto;
  display: flex;
  justify-content: center;
  background: #e5e5e5;
  border-radius: 30px;
`;

// const Content = styled.div`
//   width: 100%;
//   max-width: 80vh;
//   padding: 20px;
// `;

export default AnalysisPage;
