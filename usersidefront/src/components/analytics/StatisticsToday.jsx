import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

import { getLeftover } from "../../api/leftover";
import Button from "@mui/material/Button";
import styled from "styled-components";
const StatsticsToday = () => {
  const [isEat, setIsEat] = useState(0); // 0: 로드중, 1: 먹음, 2: 안먹음
  // const { date, course,  } = params;
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const weekday = weekdays[today.getDay()];
  const date = `${year}-${month}-${day}`;
  const todayString = `${year}.${month}.${day} (${weekday})`;

  const userId = localStorage.userId;
  const [info, setInfo] = useState([10, 10]);

  ChartJS.register(ArcElement, Tooltip, Legend);

  useEffect(() => {
    getLeftover(
      { userId: userId, date: date },
      // { userId: "string", date: "2023-04-04" },
      (data) => {
        setIsEat(1);
        return data.data;
      },
      (err) => {
        // console.log(err);
        setIsEat(2);
      }
    ).then((data) => setInfo([data?.before, data?.after]));
  }, [date]);

  const chartData = {
    labels: ["배식량", "잔반량"],
    datasets: [
      {
        data: [info[0], info[1]],
        // backgroundColor: ["#078767", "#FF0000"],
        backgroundColor: ["#93329E", "#440A67"],
      },
    ],
  };

  useEffect(() => {}, [info]);

  return (
    <>
      <Button
        variant="contained"
        size="small"
        sx={{ fontSize: "16px", fontWeight: "bold" }}
        color="secondary"
      >
        {todayString}
      </Button>

      <CicleStaticContainer>
        {/* {isEat ? <Doughnut data={chartData} /> : <div>밥안먹음</div>} */}
        {isEat === 0 ? null : isEat === 1 ? (
          <Doughnut data={chartData} />
        ) : (
          <div>밥안먹음</div>
        )}
      </CicleStaticContainer>
    </>
  );
};

const CicleStaticContainer = styled.div`
  height: 30vh;
  margin: 4% 0 4% 0;
  display: flex;

  align-items: center;
  justify-content: center;
`;

export default StatsticsToday;
