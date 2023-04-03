import { useState } from "react";

// import ArticleOptionItem from "./ArticleOptionItem"

import { Icon, IconButton } from "@mui/material";
import { ThumbDown, ThumbUp, Comment } from "@mui/icons-material";
import { putDisLike, putLike } from "../../api/board";
import { useEffect } from "react";

function ArticleOption(params) {
  const { article } = params;
  // 차후에 props에서 넘어온 값으로 변경할 것
  // 1 좋아요 2 싫어요 0 몰라유
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
      },
      (err) => console.log(err)
    );
  };

  const changeDisLike = async () => {
    await putDisLike(
      user,
      (data) => {
        console.log(data);
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
    const target = event.target?.id;
    if (!target) {
      return;
    }
    console.log(target);

    if (target === "1") {
      changeLike();
    } else if (target === "2") {
      changeDisLike();
    }

    // const { myHand, otherHand, onClick } = articleOptions[target];

    // console.log(myHand, isLiked);
    // if (myHand === isLiked) {
    //   // 선택 취소
    //   onClick();
    //   setIsLiked(100);
    // } else if (isLiked === "0") {
    //   // 선택
    //   onClick();
    //   setIsLiked(myHand);
    // } else {
    //   // 변경
    //   const prevOption = articleOptions[otherHand];
    //   prevOption.onClick();
    //   onClick();
    //   setIsLiked(myHand);
    // }
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
        isLiked === myHand
          ? isLiked === 1
            ? "#0070f3"
            : "#990000"
          : "#000000",
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
          myHand === articleOptions[2].myHand ? () => {} : handleClickCount
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
