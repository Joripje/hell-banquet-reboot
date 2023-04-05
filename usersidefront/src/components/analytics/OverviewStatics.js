import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

import { getLeftover } from "../../api/leftover";

import styled from "styled-components";

function OverviewStatics(params) {
  // const { date, course,  } = params;
  const date = "2023-04-04";
  const userId = "manager";
  const [info, setInfo] = useState([10, 10]);

  ChartJS.register(ArcElement, Tooltip, Legend);

  useEffect(() => {
    getLeftover(
      { userId: userId, date: date },
      (data) => {
        return data.data;
      },
      (err) => console.log(err)
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
    <CicleStaticContainer>
      <Doughnut data={chartData} style={{ margin: 0 }} />
    </CicleStaticContainer>
  );
}

const CicleStaticContainer = styled.div`
  height: 30vh;
  margin: 4% 0 4% 0;
`;

export default OverviewStatics;
