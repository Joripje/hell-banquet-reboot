import { format, addDays, startOfWeek } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { ko } from "date-fns/esm/locale";
function DayPicker(props) {
  const [endDateString, setEndDateString] = useState(formattedDate);
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const weekday = weekdays[today.getDay()];
  const date = `${year}-${month}-${day}`;
  const todayString = `${year}.${month}.${day} (${weekday})`;
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
      {value}
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
    </>
  );
}
export default DayPicker;
