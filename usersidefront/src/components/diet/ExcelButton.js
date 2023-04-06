import { Button } from "@mui/material";

function ExcelButton(params) {
  const { buttonName } = params;

  const styleForButton = {
    color: "#000000",
    fontWeight: 1000,
    background: "#e5e5e5",
  };

  return (
    <>
      <Button style={styleForButton} variant='contained' size='large'>
        {buttonName}
      </Button>
      <br />
      <br />
    </>
  );
}

export default ExcelButton;
