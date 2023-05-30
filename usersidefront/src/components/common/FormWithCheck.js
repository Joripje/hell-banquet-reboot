import { Box, Container, Grid, Button, TextField } from "@mui/material";
import CheckButton from "../signup/CheckButton";

function FormWithCheck(params) {
    const {onTypingHandler, helperText, error, option, } = params
    return (
    <Container fixed>
      <Box component='form'>
        <Grid
          container
          spacing={2}
          style={{ padding: "2rem", justifyContent: "center" }}
        >
          {option.map((item) => {
            return (
              <Grid item xs={12} key={item.id} style={styleForGrid}>
                <TextField
                  onChange={onTypingHandler}
                  helperText={helperText}
                  error={error}
                  disabled={item.disabled}
                  id={item.id}
                  autoFocus={item.focus}
                  label={item?.label}
                  type={item.type}
                  value={item.target}
                  fullWidth
                />
                {item?.isReal 
                ?
                <CheckButton targetValue={item.target} target={item.id} />
                 :
                 <></>
                 }
              </Grid>
            );
          })}
          <Grid item xs={9}>
            <Button
              onClick={params.onClickHandler}
              variant='contained'
              className='submit'
              style={{ height: "3rem", background: "#B8DDFF" }}
              fullWidth
            >
              <b>{params.buttonName}</b>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

const styleForGrid = {
    position: 'relative',
}

export default FormWithCheck;
