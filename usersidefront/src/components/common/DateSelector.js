import { TextField } from "@mui/material";

function DateSelector(params) {
  const { date, week, setDate, setWeek } = params;
  const getFormatedDate = (date) => {
    if (date) {
      return new Date(date).toISOString().split("T")[0];
    } else {
      return new Date().toISOString().split("T")[0];
    }
  };

  const handleDateChange = (e) => {
    if (week) {
      setWeek(e.target.value);
    } else {
      const newDate = getFormatedDate(e.target.value);
      setDate(newDate);
    }
  };

  return (
    <TextField
      type={week ? "week" : "date"}
      value={date || week}
      onChange={handleDateChange}
    />
  );
}

export default DateSelector;
