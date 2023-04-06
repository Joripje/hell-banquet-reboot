import { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import { getBoardList } from "../../api/board";

import { BoardListItem } from "./";
import ArticleCreateSection from "./ArticleCreateSection";

function BoardList() {
  const articleListRef = useRef(null);
  const prevArticles = useRef([]);
  const [boardInfo, setBoardInfo] = useState({
    lastBoardId: -1,
    size: 10,
    userId: localStorage.getItem("userId"),
  });

  const [articles, setArticles] = useState([
    { content: "", src: undefined, likeCount: 0, dislikeCount: 0, id: -1 },
    { content: "", src: undefined },
    { content: "", src: undefined },
    { content: "", src: undefined },
    { content: "lorem", src: undefined },
    { content: "lorem", src: undefined },
    { content: "lorem", src: undefined },
    { content: "lorem", src: undefined },
    { content: "lorem", src: undefined, id: -1 },
  ]);



  useEffect(() => {
    const getMoreList = async () => {
      if (boardInfo.lastBoardId === 1) {
        return
      }
      await getBoardList(
        boardInfo,
        (data) => {
          return data.data;
        },
        (err) => console.log(err)
      ).then((data) => {
        if (articles[0]?.id === -1) {
          setArticles(data);
        } else {
          setArticles([...articles, ...data])
        }
      });
    };

    if (prevArticles.current.length === 0) {
      getMoreList();
      prevArticles.current = articles;
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "100px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            await getMoreList();
          }
        });
      },
      [observerOptions, articles]
    );

    observer.observe(articleListRef.current.lastChild);

    return () => observer.disconnect();
  }, [articles, boardInfo]);

  // Articles가 변경될 때마다 boardInfo를 수정
  useEffect(() => {
    setBoardInfo({
      lastBoardId: articles[articles.length - 1].id,
      size: 10,
      userId: localStorage.getItem("userId"),
    });
  }, [articles]);

  return (
    <>
      <ArticleCreateSection />
      <BoardListBox ref={articleListRef}>
        {articles.map((article, index) => {
          return <BoardListItem article={article} index={index} key={index} />;
        })}
      </BoardListBox>
    </>
  );
}

const BoardListBox = styled.div`
  // background: #EDEBE9;
  padding: 10px 0px 90px 0px;
`;

const MessageBox = styled.div`
  background: #faf6ee;
  padding: 5px;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TypoStyle = styled.p`
  font-family: ChosunCentennial;
  font-size: 15px;
`

export default BoardList;
