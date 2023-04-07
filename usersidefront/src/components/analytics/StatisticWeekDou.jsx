import { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

import styled from "styled-components";
const StatisticWeekDou = (props) => {
  // const date = "2023-04-04";
  // const userId = "manager";
  // const [info, setInfo] = useState([10, 10]);
  const { mon, tue, wes, thu, fri } = props;
  ChartJS.register(ArcElement, Tooltip, Legend);

  // useEffect(() => {
  //   getLeftover(
  //     { userId: userId, date: date },
  //     (data) => {
  //       return data.data;
  //     },
  //     (err) => console.log(err)
  //   ).then((data) => setInfo([data?.before, data?.after]));
  // }, [date]);

  const chartData = {
    labels: ["배식량", "잔반량"],
    datasets: [
      {
        data: [
          mon[0] + tue[0] + wes[0] + thu[0] + fri[0],
          mon[1] + tue[1] + wes[1] + thu[1] + fri[1],
        ],
        // backgroundColor: ["#078767", "#FF0000"],
        backgroundColor: ["#93329E", "#440A67"],
      },
    ],
  };

  // useEffect(() => {}, [props.weekBefore]);

  return (
    <>
      <CicleStaticContainer>
        <Doughnut data={chartData} />
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

export default StatisticWeekDou;
