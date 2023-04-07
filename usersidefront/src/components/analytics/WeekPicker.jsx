// import { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Button from "@mui/material/Button";
// import { ko } from "date-fns/esm/locale";
// function WeekPicker() {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const [startDate, setStartDate] = useState(new Date());
//   const ExampleCustomInput = ({ value, onClick }) => (
//     <Button
//       variant="contained"
//       size="small"
//       sx={{ fontSize: "16px", fontWeight: "bold" }}
//       className="example-custom-input"
//       onClick={onClick}
//     >
//       {value}
//     </Button>
//   );
//   return (
//     <DatePicker
//       selected={startDate}
//       dateFormat="yyyy.MM.dd"
//       locale={ko}
//       customInput={<ExampleCustomInput />}
//       select="week"
//     />
//   );
// }

// export default WeekPicker;

import { format, addDays, startOfWeek } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { ko } from "date-fns/esm/locale";
function WeekPicker(props) {
  const [startDate, setStartDate] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  ); // 월요일
  const [endDate, setEndDate] = useState(addDays(startDate, 4)); // 금요일
  const formattedDate = format(endDate, "yyyy.MM.dd");
  const [endDateString, setEndDateString] = useState(formattedDate);
  useEffect(() => {
    setEndDate(addDays(startDate, 4)); // 금요일로 고정
    // const formattedDat = format(endDate, "yyyy.MM.dd");
    // setEndDateString(formattedDat);
  }, [startDate]);

  useEffect(() => {
    setEndDateString(format(endDate, "yyyy.MM.dd"));
    props.getWeekPickerInfo(startDate);
  }, [endDate]);

  const handleWeekChange = (date) => {
    setStartDate(startOfWeek(date, { weekStartsOn: 1 }));
  };
  const ExampleCustomInput = ({ value, onClick }) => (
    <Button
      color="secondary"
      variant="contained"
      size="small"
      sx={{ fontSize: "16px", fontWeight: "bold" }}
      className="example-custom-input"
      onClick={onClick}
    >
      {value} - {endDateString}
    </Button>
  );
  return (
    <>
      <DatePicker
        locale={ko}
        selected={startDate}
        onChange={handleWeekChange}
        dateFormat="yyyy.MM.dd"
        customInput={<ExampleCustomInput />}
        selectsStart
      />
      {/* <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        dateFormat="yyyy.MM.dd"
        placeholderText="End Date"
        disabled={true}
      /> */}
    </>
  );
}
export default WeekPicker;
