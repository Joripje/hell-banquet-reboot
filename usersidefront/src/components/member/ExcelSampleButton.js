import { Button, Icon } from "@mui/material";
import { Download } from "@mui/icons-material";

function ExcelSampleButton() {
  const XLSX = require("xlsx");

  const data = [
    ["id", "name", "email"],
    [1, "John Smith", "john.smith@example.com"],
    [2, "Jane Doe", "jane.doe@example.com"],
  ];

  const fileName = "example.xlsx";

  const createSheet = (data) => {
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    return wb;
  };

  const workbook = createSheet(data);
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();

  return (
    <Button style={styleForButton} variant='contained'>
      파일 다운로드
      <Icon component={Download} style={{ marginLeft: 20 }} />
    </Button>
  );
}

const styleForButton = {
  background: "#343434",
};

export default ExcelSampleButton;
