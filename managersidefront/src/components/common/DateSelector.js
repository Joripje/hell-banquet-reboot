import { TextField } from "@mui/material"
import { useEffect, useState } from "react"

function DateSelector(params) {
    const [targetDate, setTargetDate] = useState(new Date());
  
    useEffect(() => {
      if (!params?.date) {
        setTargetDate(new Date());
      }
    }, [params]);
  
    const handleDateChange = (e) => {
      const newDate = new Date(e.target.value);
      setTargetDate(newDate);
    };
  
    return (
        <TextField
            type="date"
            value={targetDate.toISOString().split('T')[0]}
            onChange={handleDateChange}
            style={{display: ''}}
        />
    );
}
  
export default DateSelector