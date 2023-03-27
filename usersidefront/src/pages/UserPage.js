import { LogedPageTemplate } from "../components/common"
import { ProfileUserInfo } from "../components/user"
import { OverviewDailyJanban } from "../components/janban"

import styled from "styled-components"
import { Button } from "@mui/material"
import { Container } from "@mui/system"

function UserPage() {
    return (
        <>
        <LogedPageTemplate />
        <Container sx={styleForContainer} >
            <JanbanSection>
                <OverviewDailyJanban />
            </JanbanSection>
            <UserInfoSection to='/'>
                <ProfileUserInfo />
            </UserInfoSection>
            <StatisticsSection>
                여긴 통계가 들어가야해요    
            </StatisticsSection> 
            <Button variant="contained" color="error" style={{zIndex: -1, marginBottom: 100, width: '30%'}}>
                로그아웃
            </Button>
        </Container>
        </>
    )
}

const styleForContainer = {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems:'center',
}

const styleForSection = `
    width: 100%;
    height: 200px;
    background: #E5E5E5;

    margin: 15px 0px 15px 0px;
    border-radius: 30px;

    display: flex;
    justify-content: space-between;
`

const JanbanSection = styled.section`
    ${styleForSection}
`
const UserInfoSection = styled.section`
    ${styleForSection}
    height: 240px;
    background: #D0BCFF;

`
const StatisticsSection = styled.section`
    ${styleForSection}

`

export default UserPage