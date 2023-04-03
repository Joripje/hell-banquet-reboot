/* eslint-disable */
import { useState } from "react";

import { ArticleOption, UpDelModal } from "./";
import { LinkDecoNone } from "../common";

import styled from "styled-components";
import { Card, Container, Grid } from "@mui/material";

function BoardListItem(params) {
  const { article } = params;
  // const [ showDropdown, setShowDropdown ] = useState(false)
  const makeItCenter = { display: "flex", alignItems: "center" };

  return (
    <LinkDecoNone to={`/board/${article.id}`} state={article}>
      <ArticleCard>
        <UpDelModal article={article} />
        <Grid container style={makeItCenter}>
          <Grid item xs={4}>
            <JanvanFace src={article.src} alt={article?.id} />
          </Grid>
          <Grid item xs={8}>
            <Container style={{ height: 100, fontSize: 20 }}>
              {article.content}
            </Container>
            <Container
              style={{ display: "flex", justifyContent: "space-around" }}
            ></Container>
          </Grid>
          <OptionBox>
            <ArticleOption article={article} />
          </OptionBox>
        </Grid>
      </ArticleCard>
    </LinkDecoNone>
  );
}

const ArticleCard = styled(Card)`
  position: relative;
  display: flex;
  margin: 10px 0px 10px 0px;
  height: 200px;
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

export default BoardListItem;
/* eslint-enable */
