import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Box, TextField } from "@mui/material";

import { MoreHoriz } from "@mui/icons-material";
import { updateArticle } from "../../api/board";

function UpDelModal(params) {
  const navigate = useNavigate();
  const { article } = params;
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(article.content);

  const onMoreClickHandler = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    updateArticle(
      { ...article, content: content },
      () => {
        navigate(`/board/${article.id}`, {
          state: { ...article, content: content },
        });
        window.location.reload();
      },
      (err) => console.log(err)
    );
  };

  const onTypingHandler = (event) => {
    setContent(event.target.value);
  };

  const moreButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
  };

  return (
    <>
      {localStorage.getItem("userId") === article?.writer ? (
        isOpen ? (
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <Box component='form' sx={styleForBox}>
              <TextField
                id='content'
                value={content}
                onChange={onTypingHandler}
                InputProps={{ sx: { fontSize: 20 } }}
                multiline
                sx={styleForTextField}
              />
              <Button type='submit' onClick={handleUpdate} variant='contained'>
                글 수정
              </Button>
            </Box>
          </Modal>
        ) : (
          <div style={moreButtonStyle} onClick={onMoreClickHandler}>
            <MoreHoriz />
          </div>
        )
      ) : (
        <></>
      )}
    </>
  );
}

const styleForBox = {
  position: "absolute",
  top: "50%",
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  width: "90%",
  height: "20%",
  bgcolor: "#B8DDFF",
  borderRadius: 10,
  boxShadow: 24,
  p: 3,
};

const styleForTextField = {
  bgcolor: "white",
  width: "100%",
  maxheight: "100%",
  borderRadius: "20px",
};

export default UpDelModal;
