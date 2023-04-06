import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { getLeftoverData } from "../../api/leftover";

import styled from "styled-components";

function WeeklyStatistics(params) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const { date, course } = params;
  const prevInfo = {
    id: 1,
    served: 1000,
    leftovers: 33,
    courseNo: course,
    date: "2023-03-24",
  };

  const [info, setInfo] = useState(prevInfo);
  const [chartData, setChartData] = useState({
    labels: ["배식량", "잔반량"],
    datasets: [
      {
        data: [100, 100],
        backgroundColor: ["#63C132", "#F44336"],
      },
    ],
  });

  function makeDateWeekly(dateStr) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 7);
    return date.toISOString().slice(0, 10);
  }

  function transformInfoList(infoList) {
    const result = { served: 0, leftovers: 0 };
    infoList.forEach((info) => {
      const transformedInfo = {
        served: info.served,
        leftovers: info.leftovers,
      };
      result.served = result.served + transformedInfo.served;
      result.leftovers = result.leftovers + transformedInfo.leftovers;
    });
    return result;
  }

  useEffect(() => {
    const fetchLeftoverData = async () => {
      try {
        const response = await getLeftoverData(
          {
            startDate: date,
            endDate: makeDateWeekly(date),
          },
          (data) => data.data,
          (err) => console.log(err)
        );
        if (response && response.length) {
          setInfo(transformInfoList(response));
        } else {
          setInfo(prevInfo);
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
          data: [info.served - info.leftovers, info.leftovers],
          backgroundColor: ["#63C132", "#F44336"],
        },
      ],
    });
  }, [info]);


  
  return (
    <CicleStaticContainer>
      <Doughnut data={chartData} style={{ margin: 0 }} />
    </CicleStaticContainer>
  );
}

const CicleStaticContainer = styled.div`
position: relative;
  height: auto;
  margin: 4% 0 4% 0;
`;

export default WeeklyStatistics;
