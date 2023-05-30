import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import BoardListItem from "./BoardListItem";
import { getArticleDetail } from "../../api/board";

import styled from "styled-components";

function ArticleDetail() {
  const location = useLocation();
  const [article, ] = useState(location.state);
  const [comments, setComments] = useState([
    { content: "Loading...", src: undefined, id: -1 },
    { content: "Loading...", src: undefined },
    { content: "Loading...", src: undefined },
    { content: "Loading...", src: undefined },
    { content: "Loading...", src: undefined },
    { content: "Loading...", src: undefined },
    { content: "Loading...", src: undefined },
    { content: "Loading...", src: undefined },
    { content: "Loading...", src: undefined, id: -1 },
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

      getMoreComment();
  }, [location]);

  return (
    <>
      <DetailBox>
        <BoardListItem article={{ ...article, detail: true }} />
        <CommentBox>
        {comments.length === 0 && <p style={{ textAlign: "center" }}>아직 댓글이 없어요.</p>}
        {comments.length > 0 && (
          comments.map((article, index) => {
            return (
              <BoardListItem article={article} comments={comments} setComments={setComments} isChild={true} index={index} key={index} />
            );
          })
        )}
        </CommentBox>
      </DetailBox>
    </>
  );
}

const DetailBox = styled.div`
  padding: 10px 0px calc(100vh - 470px) 0px;
  // background: #edebe9;
`;

const CommentBox = styled.div`
  background: white;
  margin: 5%;
  // padding-left: 5%;
  padding-top: 5%;
  padding-bottom: 5%;
`;

export default ArticleDetail;
