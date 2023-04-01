import { Button, Typography } from "@mui/material"
import { Container } from "@mui/system"
import styled from "styled-components"
import staticJanban from "../../assets/images/janban.png"
import { LinkDecoNone } from "../common"

function OverviewDailyJanban() {
    const date = new Date().getHours()
    const janbanOption = date < 14 
    ?
    {url: `/record-meal`, message: '식사하러 가기'}
    :
    {url: `/janban`, message: '잔반이 확인하기'}
    

    return (
        <div style={{width: '100%', display: 'flex'}}>
            <JanbanImg src={staticJanban} alt='잔반이' />
            <Container style={{position: 'relative', display: 'flex'}}>
                <Typography style={{alignSelf: 'center'}} >아직 안나옴!</Typography>
                <LinkDecoNone to={janbanOption.url} style={{position: 'absolute', bottom: '10%', right: '15%'}}>
                    <Button variant="contained" color="warning">
                        {janbanOption.message}
                    </Button>
                </LinkDecoNone>
            </Container>
        </div>
    )
}

const JanbanImg = styled.img`
`

export default OverviewDailyJanban