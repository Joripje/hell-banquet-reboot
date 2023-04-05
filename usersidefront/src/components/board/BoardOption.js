import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardOptionButton from "./BoardOptionButton";
import ArticleCreateModal from "./ArticleCreateModal";

import styled from "styled-components";
import { Create, ArrowBack, MoreVert } from "@mui/icons-material";
import BoardSearchModal from "./BoardSearchModal";
import { Container } from "@mui/material";

function BoardOption() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [boardOptions, setBoardOptions] = useState([
    // {
    //   id: 1,
    //   component: Search,
    //   onClick: onClickHandler,
    //   visible: false,
    //   isOpen: false,
    //   modal: <BoardSearchModal />,
    // },
    {
      id: 2,
      component: Create,
      onClick: onClickHandler,
      visible: false,
      isOpen: false,
      modal: <ArticleCreateModal />,
    },
  ]);

  const MoreButton = {
    id: 3,
    component: MoreVert,
    onClick: onClickHandler,
    visible: true,
  };
  const moveBack = {
    id: 4,
    component: ArrowBack,
    onClick: () => navigate(-1),
    visible: true,
  };

  function onClickHandler(targetId) {
    setBoardOptions((prevOptions) =>
      prevOptions.map((option) =>
        // ({...option, visible: !option.visible})
        option.id === targetId
          ? { ...option, isOpen: true, visible: !option.visible }
          : { ...option, isOpen: false, visible: !option.visible }
      )
    );
  }

  function onClose() {
    setBoardOptions((prevOptions) =>
      prevOptions.map((option) => ({
        ...option,
        isOpen: false,
      }))
    );
  }

  window.addEventListener("scroll", () => {
    setScrollY(window.scrollY);
  });

  return (
    <PositionProvider scrollY={scrollY} screenHeight={window.screen.height}>
      {boardOptions.map((option) => {
        if (option.visible) {
          return <BoardOptionButton key={option.id} option={option} />;
        } else {
          return (
            <Container key={option.id}>
              <ArticleCreateModal
                isOpen={option?.isOpen && option?.id === 2}
                onClose={onClose}
              />
              <BoardSearchModal
                isOpen={option?.isOpen && option?.id === 1}
                onClose={onClose}
              />
            </Container>
          );
        }
      })}
      <BoardOptionButton option={MoreButton} />
      <BoardOptionButton option={moveBack} />
    </PositionProvider>
  );
}

const PositionProvider = styled.div`
  position: absolute;
  top: calc(
    ${(props) => props.screenHeight}px - 200px + ${(props) => props.scrollY}px
  );
  right: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 50px;
`;

export default BoardOption;
