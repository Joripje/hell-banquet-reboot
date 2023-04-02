import { RecommendAritcle } from "../components/board"
import { LogedPageTemplate, } from "../components/common"
import { OverviewDailyJanban } from "../components/janban"

import styled from "styled-components"
import {  Container } from "@mui/material"

function LandingPage() {
    const hour = new Date().getHours()
   
    return(
        <>
        <LogedPageTemplate />
        <Container style={styleForContainer}>
            <JanvanSection>
                <OverviewDailyJanban />
            </JanvanSection>
            {hour < 14 ? 
            <DailyMenuSection>
                <div>
                    아직 14시가 안지났나?
                </div>
            </DailyMenuSection>
            :
            <DailyRankSection>
                 <div>
                    이제 랭킹이 보일 때야!
                </div>
            </DailyRankSection>
            }
            <RecommendArticleSection>
                <RecommendAritcle />
            </RecommendArticleSection>
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
`

const JanvanSection = styled.section`
    ${styleForSection}
    height: 270px;

`
const DailyMenuSection = styled.section`
    ${styleForSection}
    height: 280px;
`

const DailyRankSection = styled.section`
    ${styleForSection}
    height: 280px;
`

const RecommendArticleSection = styled.section`
    ${styleForSection}
    height: 260px;
    justify-content: center;
    margin-bottom: 110px;
`

export default LandingPage