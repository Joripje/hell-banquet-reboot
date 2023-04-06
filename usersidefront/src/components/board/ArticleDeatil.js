import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import BoardListItem from "./BoardListItem";
import { getArticleDetail } from "../../api/board";

import styled from "styled-components";

function ArticleDetail() {
  const location = useLocation();
  const articleListRef = useRef(null);
  const [article] = useState(location.state);
  console.log("HIHI", location);
  const [comments, setComments] = useState([
    { content: "lorem", src: undefined, id: -1 },
    { content: "lorem", src: undefined },
    { content: "lorem", src: undefined },
    { content: "lorem", src: undefined },
    { content: "lorem", src: undefined },
    { content: "lorem", src: undefined },
    { content: "lorem", src: undefined },
    { content: "lorem", src: undefined },
    { content: "lorem", src: undefined, id: -1 },
  ]);

  useEffect(() => {
    const getMoreComment = async () => {
      const data = await getArticleDetail(
        {
          id: location.state.id,
          getForm: {
            lastCommentId: -1,
            size: 10,
            userId: localStorage.getItem("userId"),
          },
        },
        (data) => {
          return data.data.comments;
        },
        (err) => console.log(err)
      );
      setComments(data);
    };

    if (comments[0]?.id === -1) {
      getMoreComment();
    }
  }, [comments, location, articleListRef]);

  return (
    <>
      <DetailBox>
        <BoardListItem article={{ ...article, detail: true }} />

        {comments.length === 0 ? (
          <div style={{ textAlign: "center", paddingTop: 100 }}>
            아직 댓글이 없어요
          </div>
        ) : (
          comments.map((article, index) => {
            return (
              <BoardListItem article={article} isChild={true} index={index} key={index} />
            );
          })
        )}
      </DetailBox>
    </>
  );
}

const DetailBox = styled.div`
  padding: 10px 0px calc(100vh - 470px) 0px;
  background: #edebe9;
`;

export default ArticleDetail;
