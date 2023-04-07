import { format, addDays, startOfWeek } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { ko } from "date-fns/esm/locale";
function DayPicker(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [dateString, setDateString] = useState(null);
  const [todayString, setTodayString] = useState(null);
  useEffect(() => {
    // 그리기 종료 여부 감시
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const year = startDate.getFullYear();
    const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
    const day = startDate.getDate().toString().padStart(2, "0");
    const weekday = weekdays[startDate.getDay()];
    const date = `${year}-${month}-${day}`;
    const today = `${year}.${month}.${day} (${weekday})`;
    setDateString(date);
    setTodayString(today);

    props.pickDate(date);
  }, [startDate]);

  const ExampleCustomInput = ({ value, onClick }) => (
    <Button
      color="secondary"
      variant="contained"
      size="small"
      sx={{ fontSize: "16px", fontWeight: "bold" }}
      className="example-custom-input"
      onClick={onClick}
    >
      {todayString}
    </Button>
  );
  return (
    <DatePicker
      locale={ko}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="yyyy.MM.dd"
      customInput={<ExampleCustomInput />}
    />
  );
}
export default DayPicker;
