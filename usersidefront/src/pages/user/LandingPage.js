import { RecommendAritcle } from "../../components/board";
import { LinkDecoNone, LogedPageTemplate } from "../../components/common";
import { OverviewDailyJanban } from "../../components/janban";

import styled from "styled-components";
import { Container, Button } from "@mui/material";
import OverviewRanking from "../../components/analytics/OverviewRanking";
import { MenuOverview } from "../../components/menu";

function LandingPage() {
  const hour = new Date().getHours();

  return (
    <LogedPageTemplate>
      <Container style={styleForContainer}>
        <JanvanSection>
          <TypoJanban>오늘의 잔반이는...</TypoJanban>
          <OverviewDailyJanban />
        </JanvanSection>
        {hour < 14 ? (
          <DailyMenuSection>
            <TypoSectionTitle style={{marginBottom: "7px"}}>
              오늘의 <span style={{ color: "#950101" }}>점심</span> 메뉴
            </TypoSectionTitle>
            <MenuOverview />
          </DailyMenuSection>
        ) : (
          <DailyRankSection>
            <TypoSectionTitle style={{marginBottom: "7px"}}>
              오늘의 <span style={{ color: "#950101" }}>잔반</span> 랭킹
            </TypoSectionTitle>
            <TypoMessage>
              잔반을 적게 남길수록 순위가 올라갑니다.
            </TypoMessage>
            <LinkDecoNone to={"/ranking"}>
              <OverviewRanking />
            </LinkDecoNone>
            <div style={{display: "flex", justifyContent: "center", paddingTop: '10px'}}>
            <LinkDecoNone to={"/ranking"}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#492369", margin: 10 }}
              >
                <TypoJanban style={{fontSize: "15px", margin: 0}}>랭킹 보러가기</TypoJanban>
              </Button>
            </LinkDecoNone>

            </div>
          </DailyRankSection>
        )}
        <RecommendArticleSection>
          <TypoSectionTitle>
            지옥의 <span style={{ color: "#950101" }}>HOT</span> 게시물
          </TypoSectionTitle>
          <RecommendAritcle />
        </RecommendArticleSection>
      </Container>
    </LogedPageTemplate>
  );
}
const styleForContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const styleForSection = `
    width: 100%;
    height: auto;
    background: #faf6ee;

    margin: 15px 0px 5px 0px;
    padding: 0px;
    padding-bottom: 20px;
    border-radius: 5px;

    display: flex;
`;

const JanvanSection = styled.section`
  ${styleForSection}
  position: relative;
  flex-direction: column;
`;
const DailyMenuSection = styled.section`
  ${styleForSection}
  height: auto;
  flex-direction: column;
`;

const DailyRankSection = styled.section`
  ${styleForSection}
  height: auto;
  flex-direction: column;
  alignItems: "center",
`;

const RecommendArticleSection = styled.section`
  ${styleForSection}
  height: auto;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 110px;
  // background: url(https://img.freepik.com/free-photo/timber-interior-texture_1194-6767.jpg?w=996&t=st=1680784390~exp=1680784990~hmac=2587790423a02bb26309efc77977607e3889cce7422b33baebc82b393db3f0ef);
  background-size: cover;
`;

const TypoJanban = styled.p`
  margin-left: 5%;
  font-family: CookieRun-Regular;
  font-size: 26px;
`;
const TypoSectionTitle = styled.p`
  font-family: Cafe24ClassicType-Regular;
  font-size: 26px;
  text-align: center;
`;
const TypoMessage = styled.p`
  font-family: ChosunCentennial;
  font-size: 15px;
  text-align: center;
  margin: 0;
  color: #5f5f5f;
`;

export default LandingPage;
