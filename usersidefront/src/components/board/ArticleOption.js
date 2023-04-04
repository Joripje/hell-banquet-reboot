import { useState } from "react";

// import ArticleOptionItem from "./ArticleOptionItem"

import { Icon, IconButton } from "@mui/material";
import { ThumbDown, ThumbUp, Comment } from "@mui/icons-material";
import { putDisLike, putLike } from "../../api/board";
import { useEffect } from "react";

function ArticleOption(params) {
  const { article } = params;
  // 차후에 props에서 넘어온 값으로 변경할 것
  // 1 좋아요체크 2 싫어요체크 0 체크없음
  const [isLiked, setIsLiked] = useState(100);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const user = {
    userId: localStorage.getItem("userId"),
    boardId: article.id,
  };

  const changeLike = async () => {
    await putLike(
      user,
      (data) => {
        console.log(data);
        if (isLiked === 1) {
          setIsLiked(0);
        } else {
          setIsLiked(1);
        }
        setLikeCount(data.data.likeCount);
        setDislikeCount(data.data.dislikeCount);
      },
      (err) => console.log(err)
    );
  };

  const changeDisLike = async () => {
    await putDisLike(
      user,
      (data) => {
        console.log(data);
        if (isLiked === 2) {
          setIsLiked(0);
        } else {
          setIsLiked(2);
        }
        setDislikeCount(data.data.dislikeCount);
        setLikeCount(data.data.likeCount);
      },
      (err) => console.log(err)
    );
  };

  const articleOptions = [
    {
      id: "like",
      iconName: ThumbUp,
      num: likeCount,
      myHand: 1,
      otherHand: 1,
      onClick: changeLike,
    },

    {
      id: "hate",
      iconName: ThumbDown,
      num: dislikeCount,
      myHand: 2,
      otherHand: 0,
      onClick: changeDisLike,
    },
    {
      id: "comments",
      iconName: Comment,
      num: commentCount,
      myHand: -1,
    },
  ];

  const handleClickCount = (event) => {
    event.preventDefault();
    let target = event.target?.id;
    if (!target) {
      // Icon 클릭하는 경우 target 지정
      target = event.target.parentElement.parentElement.id;
    }

    if (target === "1") {
      changeLike();
    } else if (target === "2") {
      changeDisLike();
    }
  };

  useEffect(() => {
    setIsLiked(article.evaluationStatus);
    setLikeCount(article.likeCount);
    setDislikeCount(article.dislikeCount);
    setCommentCount(article.commentCount);
  }, [article]);

  return articleOptions.map((option, index) => {
    const { iconName, num, myHand } = option;
    const styleForIcon = {
      marginRight: 10,
      fontSize: 34,
      color:
      iconName === Comment 
      ?num !== 0 
      ? '#A084CA' // 댓글 있
      : '#5f5f5f' // 댓글 없
      :
        isLiked === myHand
          ? isLiked === 1
            ? "#492369"   // 좋아요 퍼플
            : "#990000"   // 싫어요 레드
          : "#5f5f5f",    // 해당없음 그레이
    };

    const styleForButton = {
      padding: 0,
      width: "6rem",
      height: "3rem",
    };

    return (
      <IconButton
        disableTouchRipple
        onClick={
          myHand === articleOptions[2].myHand
            ? () => {}
            : (event) => {
                event.stopPropagation();
                handleClickCount(event);
              }
        }
        style={styleForButton}
        key={index}
        id={myHand}
      >
        <Icon component={iconName} style={styleForIcon} id={myHand} />
        {num}
      </IconButton>
    );
  });
}

export default ArticleOption;
