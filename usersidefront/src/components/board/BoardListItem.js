import { ArticleOption, UpDelModal } from "./";
import { LinkDecoNone } from "../common";

import styled from "styled-components";
import { Container, Grid } from "@mui/material";

function BoardListItem(params) {
  const { article } = params;
  const makeItCenter = { display: "flex", alignItems: "center" };

  const handleClick = () => {
    if (!article?.detail) {
      // article.detail이 false인 경우 클릭 이벤트를 처리합니다.
      return;
    }
    // article.detail이 true인 경우 클릭 이벤트를 처리하지 않습니다.
  };
  return (
    <div style={{margin: "25px 30px"}}>
      {article?.detail ? (
        // 디테일에서 보이는 게시물
        <ArticleCard onClick={handleClick}>
          <UpDelModal article={article} />
          <Grid container style={makeItCenter}>
            <Grid item xs={4}>
              <JanvanFace src={article.src} alt={article?.id} />
              <TypoWriter>{article.writer}</TypoWriter>
            </Grid>
            <Grid item xs={8}>
              <Container>
                <TypoContent>{article.content}</TypoContent>
              </Container>
            </Grid>
            <OptionBox>
              <ArticleOption article={article} />
            </OptionBox>
          </Grid>
        </ArticleCard>
      ) : (
        // 게시물 목록에서 보이는 게시물
        <LinkDecoNone to={`/board/${article.id}`} state={article}>
          <ArticleCard onClick={handleClick}>
            <UpDelModal article={article} />
            <Grid container style={makeItCenter}>
              <Grid item xs={4} style={{ textAlign: "center" }}>
                <JanvanFace src={article.src} alt={article?.id} />
                <TypoWriter>{article.writer}</TypoWriter>
              </Grid>
              <Grid item xs={8}>
                <Container style={{ height: 100, fontSize: 20 }}>
                  <TypoContent>{article.content}</TypoContent>
                </Container>
                <OptionBox>
                  <ArticleOption article={article} />
                </OptionBox>
                {/* <Container
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                ></Container> */}
              </Grid>
            </Grid>
          </ArticleCard>
        </LinkDecoNone>
      )}
    </div>
  );
}

const ArticleCard = styled.div`
  position: relative;
  display: flex;
  // margin: 15px 20px;
  height: 200px;
  background: #faf6ee;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 25px 5px 25px 5px;
`;

const JanvanFace = styled.img`
  width: 140px;
  height: 140px;

  margin-left: 0px 10px 0px 10px;
`;

const OptionBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: end;
`;

const TypoContent = styled.p`
  font-family: ChosunCentennial;
  font-size: 20px;
`

const TypoWriter = styled.p`
  font-family: ChosunCentennial;
  font-size: 15px;
`

export default BoardListItem;
