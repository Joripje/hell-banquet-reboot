import { RecommendAritcle } from "../components/board";
import { LinkDecoNone, LogedPageTemplate } from "../components/common";
import { OverviewDailyJanban } from "../components/janban";

import styled from "styled-components";
import { Container } from "@mui/material";
import OverviewRanking from "../components/analytics/OverviewRanking";
import { MenuOverview } from "../components/menu";

function LandingPage() {
  const hour = new Date().getHours();

  return (
    <>
      <LogedPageTemplate />
      <Container style={styleForContainer}>
        <JanvanSection>
          <OverviewDailyJanban />
        </JanvanSection>
        {hour < 14 ? (
          <DailyMenuSection>
            <MenuOverview />
          </DailyMenuSection>
        ) : (
          <DailyRankSection>
            <LinkDecoNone to={"/ranking"}>
              <OverviewRanking />
            </LinkDecoNone>
          </DailyRankSection>
        )}
        <RecommendArticleSection>
          <RecommendAritcle />
        </RecommendArticleSection>
      </Container>
    </>
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
    height: 200px;
    background: #E5E5E5;

    margin: 15px 0px 15px 0px;
    border-radius: 30px;

    display: flex;
`;

const JanvanSection = styled.section`
  ${styleForSection}
  height: 270px;
`;
const DailyMenuSection = styled.section`
  ${styleForSection}
  height: 280px;
`;

const DailyRankSection = styled.section`
  ${styleForSection}
  height: 280px;
`;

const RecommendArticleSection = styled.section`
  ${styleForSection}
  height: auto;
  justify-content: center;
  margin-bottom: 110px;
`;

export default LandingPage;
