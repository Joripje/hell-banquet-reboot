import styled from "styled-components"
import { Button, Container } from "@mui/material"
import { RecommendAritcle } from "../components/board"

import { LogedPageTemplate, } from "../components/common"
import { OverviewDailyJanban } from "../components/janban"
// import { validateUser } from "../api/auth"
import { getMenus } from "../api/menu"
 
function LandingPage() {

    const handleTest = async () => {
        await getMenus(
            // {userId: localStorage.getItem('userId')},
            (data) => {
                console.log(data)
            },
            (err) => console.log(err)
        )
    }

    /*
        첫 방문여부를 확인하고 첫 방문 시에는 안내 적용
    */
    const hour = new Date().getHours()
   
    return(
        <>
        <LogedPageTemplate />
        <Button variant="contained" onClick={handleTest} >실험하기</Button>
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
    justify-content: space-between;
`

const JanvanSection = styled.section`
    ${styleForSection}
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
    height: 240px;

`

export default LandingPage