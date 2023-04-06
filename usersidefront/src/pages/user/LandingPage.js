import { RecommendAritcle } from "../../components/board";
import { LinkDecoNone, LogedPageTemplate } from "../../components/common";
import { OverviewDailyJanban } from "../../components/janban";

import styled from "styled-components";
import { Container } from "@mui/material";
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
            <MenuOverview />
          </DailyMenuSection>
        ) : (
          <DailyRankSection>
            <TypoSectionTitle>
              오늘의 <span style={{ color: "#950101" }}>잔반</span> 순위
            </TypoSectionTitle>
            <LinkDecoNone to={"/ranking"}>
              <OverviewRanking />
            </LinkDecoNone>
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
    border-radius: 15px;

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
`;

const RecommendArticleSection = styled.section`
  ${styleForSection}
  height: auto;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 110px;
  // background: url(https://img.freepik.com/free-photo/timber-interior-texture_1194-6767.jpg?w=996&t=st=1680784390~exp=1680784990~hmac=2587790423a02bb26309efc77977607e3889cce7422b33baebc82b393db3f0ef);
  background-size: cover;
  border-radius: 5px;
`;

const TypoJanban = styled.p`
  margin-left: 5%;
  font-family: CookieRun-Regular;
  font-size: 26px;
`
const TypoSectionTitle = styled.p`
  font-family: Cafe24ClassicType-Regular;
  font-size: 26px;
  text-align: center;
`;

export default LandingPage;
