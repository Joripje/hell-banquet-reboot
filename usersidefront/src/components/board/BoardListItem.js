import { useState, useEffect } from "react";

import { ArticleOption, UpDelModal } from "./";
import { getUserImg } from "../../api/janbani";
import { LinkDecoNone } from "../common";

import styled from "styled-components";
import { Container, Grid } from "@mui/material";
import staticJanban from "../../assets/images/staticJanban.png";

function BoardListItem(params) {
  const { article } = params;
  const [janbanImg, setJanbanImg] = useState(staticJanban);
  const makeItCenter = { display: "flex", alignItems: "center" };
  const handleClick = () => {
    if (!article?.detail) {
      return;
    }
  };

  useEffect(() => {
    const handleGetJanban = async () => {
      await getUserImg(
        { userId: article.writer },
        (data) => {
          return data.data;
        },
        (err) => console.log(err)
      ).then((res) => {
        setJanbanImg(res);
      });
    };
    handleGetJanban();
  }, [article]);

  return (
    <div style={{ margin: "25px 30px" }}>
      {article?.detail ? (
        // 디테일에서 보이는 게시물
        <ArticleCard onClick={handleClick}>
          <UpDelModal article={article} />
          <Grid container style={makeItCenter}>
            <Grid item xs={4}>
              <JanvanFace
                src={janbanImg ? janbanImg : staticJanban}
                alt={article?.id}
              />
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
          <ArticleCard onClick={handleClick} id={article.id}>
            <UpDelModal article={article} />
            <Grid container style={makeItCenter}>
              <Grid item xs={4} style={{ textAlign: "center" }}>
                <JanvanFace
                  src={janbanImg ? janbanImg : staticJanban}
                  alt={article?.id}
                />
                <TypoWriter>{article.writer}</TypoWriter>
              </Grid>
              <Grid item xs={8}>
                <Container style={{ height: 100, fontSize: 20 }}>
                  <TypoContent>{article.content}</TypoContent>
                </Container>
                <OptionBox>
                  <ArticleOption article={article} />
                </OptionBox>
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
  background-image: ${(props) =>
    props.id % 2
      ? "url(https://img.freepik.com/free-photo/white-paper-texture_1194-5416.jpg?w=826&t=st=1680682215~exp=1680682815~hmac=960a6fa2967f438356a0e02dfe922c13cfbcd6c421dd5f2e4790d8cfc8ba096a)"
      : "url(https://img.freepik.com/free-photo/design-space-paper-textured-background_53876-33833.jpg?t=st=1680680393~exp=1680680993~hmac=7320fe8b3cabdc98b89d952b6ff9e89340be2ee1aa5eabb580dd634abb1b40e3)"};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  // border-radius: 25px 5px 25px 5px;
  border-radius: 7px 0px 18px 9px;
  background-size: cover;
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
`;

const TypoWriter = styled.p`
  font-family: ChosunCentennial;
  font-size: 15px;
`;

export default BoardListItem;
