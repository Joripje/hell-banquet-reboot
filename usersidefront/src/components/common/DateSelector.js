import { TextField } from "@mui/material";
import { useState } from "react";

function DateSelector(params) {
  const getFormatedDate = (date) => {
    if (date) {
      return new Date(date).toISOString().split("T")[0];
    } else {
      return new Date().toISOString().split("T")[0];
    }
  };
  const today = getFormatedDate();
  const { setDate } = params;
  const [targetDate, setTargetDate] = useState(today);

  const handleDateChange = (e) => {
    const newDate = getFormatedDate(e.target.value);
    setTargetDate(newDate);
    setDate(newDate);
  };

  return (
    <TextField type='date' value={targetDate} onChange={handleDateChange} />
  );
}

export default DateSelector;
