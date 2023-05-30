import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  // Legend,
} from "chart.js";
import { useEffect } from "react";

const StatisticsWeek = (props) => {
  const { mon, tue, wes, thu, fri } = props;
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

  const data = {
    labels: ["월요일", "화요일", "수요일", "목요일", "금요일"],
    datasets: [
      {
        // type: "bar",
        label: "배식량",
        backgroundColor: "#93329E",
        data: [mon[0], tue[0], wes[0], thu[0], fri[0]],
        // borderColor: "red",
        // borderWidth: 2,
      },
      {
        // type: "bar",
        label: "잔반량",
        backgroundColor: "#440A67",
        data: [mon[1], tue[1], wes[1], thu[1], fri[1]],
        // borderColor: "green",
        // borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 1 / 0.9,
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 100,
          },
        },
      ],
    },
  };

  return (
    <Container>
      <Bar data={data} options={options} />
    </Container>
  );
};
const Container = styled.div`
  width: 90vw;
  margin: 0 auto;
`;

export default StatisticsWeek;
