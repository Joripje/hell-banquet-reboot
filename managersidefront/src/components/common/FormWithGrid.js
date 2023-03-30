import { Box, Container, Grid, Button, TextField } from '@mui/material'

function FormWithGrid(params) {
    return (
        <Container fixed>
            <Box component="form">
                <Grid container spacing={2} style={{padding: '2rem', justifyContent: 'center'}}>
                    {params.option.map(item => {
                        return(
                            <Grid item xs={12} key={item.id}>
                                <TextField onChange={params.onTypingHandler}
                                    helperText={params?.helperText} error={params?.error} disabled={params?.disabled}
                                    id={item.id} autoFocus={item.focus} label={item?.label} type={item.type} fullWidth 
                                />
                            </Grid>
                        )
                    })}
                    <Grid item xs={9}>
                        <Button onClick={params.onClickHandler} variant="contained" className="submit" style={{height: '3rem', background: "#B8DDFF"}} fullWidth> 
                            <b>{params.buttonName}</b>
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default FormWithGrid
