import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { getLeftoverData } from "../../api/leftover";

import styled from "styled-components";

function DailyStatistics(params) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const { date, course } = params;
  const [info, setInfo] = useState([
    {
      id: 1,
      served: 1000,
      leftovers: 33,
      date: "2023-03-24",
    },
    {
      id: 1,
      served: 2000,
      leftovers: 21,
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
  });

  useEffect(() => {
    const fetchLeftoverData = async () => {
      try {
        const response = await getLeftoverData(
          {
            startDate: date,
            endDate: date,
          },
          (data) => data.data,
          (err) => console.log(err)
        );
        if (response && response.length) {
          setInfo(response);
        } else {
          setInfo([
            {
              id: 1,
              served: 1000,
              leftovers: 33,
              date: "2023-03-24",
            },
            {
              id: 1,
              served: 2000,
              leftovers: 21,
              date: "2023-03-24",
            },
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLeftoverData();
  }, [date]);

  useEffect(() => {
    setChartData({
      labels: ["섭취량", "잔반량"],
      datasets: [
        {
          data: [info[course - 1].served - info[course - 1].leftovers, info[course - 1].leftovers],
          backgroundColor: ["#63C132", "#F44336"],
        },
      ],
    });
  }, [info, course]);

  return (
    <CicleStaticContainer>
      <Doughnut data={chartData} style={{ margin: 0 }} />
    </CicleStaticContainer>
  );
}

const CicleStaticContainer = styled.div`
  height: auto;
  margin: 4% 0 4% 0;
`;

export default DailyStatistics;
