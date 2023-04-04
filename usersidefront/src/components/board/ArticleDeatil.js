import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import BoardListItem from "./BoardListItem";
import { getArticleDetail } from "../../api/board";

import styled from "styled-components";

function ArticleDetail() {
  const location = useLocation();
  const articleListRef = useRef(null);
  const [article] = useState(location.state);

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
          console.log(data);
          return data.data.comments;
        },
        (err) => console.log(err)
      ).then((data) => setComments(data));
      //   setArtilce(data);
    };

    if (comments[0]?.id === -1) {
      getMoreComment();
    }
  }, [comments, location, articleListRef]);

  return (
    <DetailBox>
      <BoardListItem article={{ ...article, detail: true }} />
      <div
        ref={articleListRef}
        style={{ paddingTop: "100px", paddingBottom: "100px" }}
      >
        {comments.length === 0 ? (
          <div style={{ textAlign: "center" }}>아직 댓글이 없어요</div>
        ) : (
          comments.map((article, index) => {
            return (
              <BoardListItem article={article} index={index} key={index} />
            );
          })
        )}
      </div>
    </DetailBox>
  );
}

const DetailBox = styled.div`
  background: #fff3df;
`;

export default ArticleDetail;
