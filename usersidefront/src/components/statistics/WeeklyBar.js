import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
  } from "chart.js";
import { useEffect, useState } from "react";

function WeeklyBar(params) {
    const { date, setSingleDay } = params
    ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
    const dummy = [
        {leftovers: 10, served: 20}, {leftovers: 10, served: 20}, 
        {leftovers: 10, served: 20}, {leftovers: 10, served: 20}, 
        {leftovers: 10, served: 20}, 
    ]
    const [info, setInfo] = useState(dummy)

    const chartData = {
        labels: ["월요일", "화요일", "수요일", "목요일", "금요일"],
        datasets: [
          {
            label: "배식량",
            data: info?.map((day) => day.served),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            stack: "stacked",

          }, 
          {
            label: "잔반량",
            data: info?.map((day) => day.leftovers),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            stack: "stacked",

          },
        ],
      };
    const handleBarClick = (event, elements) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + elements[0]?.index);
        setSingleDay(newDate.toISOString().slice(0, 10))
      };
      const chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        onClick: handleBarClick
      };



      useEffect(() => {
        setInfo(params?.info)
      }, [params.info])
    
      return (
        <>
        <Bar data={chartData} options={chartOptions} />
        </>
      );
    }
    
    export default WeeklyBar;