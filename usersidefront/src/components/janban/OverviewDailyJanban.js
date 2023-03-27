import { Button, Typography } from "@mui/material"
import { Container } from "@mui/system"
import styled from "styled-components"
import staticJanban from "../../assets/images/janban.png"
import { LinkDecoNone } from "../common"

function OverviewDailyJanban() {
    return (
        <div style={{width: '100%', display: 'flex'}}>
            <JanbanImg src={staticJanban} alt='잔반이' />
            <Container>
                <Typography >아직 안나옴!</Typography>
                <LinkDecoNone to='/'>
                    <Button variant="contained" color="warning">
                        식사하러 가기
                    </Button>
                </LinkDecoNone>
            </Container>
        </div>
    )
}



const JanbanImg = styled.img`
`

export default OverviewDailyJanban