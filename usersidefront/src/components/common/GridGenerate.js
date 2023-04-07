import { Grid } from "@mui/material"

function GridGenerator(params) {
    
    const gridItems = params.grid

    return (
        <Grid container>
            {gridItems.map(item => {
                return (
                    <Grid items xs={item.xs}>
                        {/* 컴포넌트를 집어넣어야함 */}
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default GridGenerator