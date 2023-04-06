import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

import { getLeftoverData } from "../../api/leftover";

import styled from "styled-components";

function DailyStatistics(params) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const { date, course } = params;
  const [info, setInfo] = useState([
    {
      id: 1,
      served: 1062,
      leftovers: 59,
      courseNo: 0,
      date: "2023-03-24",
    },
    {
      id: 1,
      served: 1062,
      leftovers: 59,
      courseNo: 1,
      date: "2023-03-24",
    },
  ]);
  const [chartData, setChartData] = useState({
    labels: ["배식량", "잔반량"],
    datasets: [
      {
        data: [100, 100],
        backgroundColor: ["#63C132", "#F44336"],
      },
    ],
  })


  useEffect(() => {
    getLeftoverData(
      { startDate: date, endDate: date },
      (data) => {
        return data.data;
      },
      (err) => console.log(err)
    ).then((data) => { 
      if(data !== []) {
        setInfo(data)
      }

    });
  }, [date]);
  

  return (
    <CicleStaticContainer>
      <Doughnut data={chartData} style={{ margin: 0 }} />
    </CicleStaticContainer>
  );
}

const CicleStaticContainer = styled.div`
  height: 30vh;
  margin: 4% 0 4% 0;
`;

export default DailyStatistics;
