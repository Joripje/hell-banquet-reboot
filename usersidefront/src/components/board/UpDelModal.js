import { useState } from "react";
import { Button, Modal, Box, TextField } from "@mui/material";

import { MoreHoriz } from "@mui/icons-material";
import { updateArticle } from "../../api/board";

function UpDelModal(params) {
  const { article } = params;
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(article.content);

  const onMoreClickHandler = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    await updateArticle(
      { ...article, content: content },
      () => {},
      (err) => console.log(err)
    );
  };

  const handleDelete = (event) => {
    event.preventDefault();
    alert('지옥법 3조 5항 6 예외조항에 따라 영양사에게 상처를 줄 수 있는 모든 발언을 방지하기 위해 삭제를 법으로 금함')
    alert('그러게 왜 지우고싶은 말을 씀?')
    setIsOpen(false)
  }
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
              <Button type='submit' color="error" onClick={handleDelete} variant='contained'>
                글 삭제
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
