import { useState } from "react";
import { useLocation } from "react-router-dom";
import { putArticle, putComment } from "../../api/board";

import styled from "styled-components";
import { Button, TextField, } from "@mui/material";

function ArticleCreateSection(params) {
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)
    const [content, setContent] = useState('')
    const placeholder = "내용을 입력해주세요";
    const textFieldOption = [
        { id: "content", target: content, setTarget: setContent, focus: true },
      ];
    
      const onTypingHandler = (e) => {
        for (const key in textFieldOption) {
          const option = textFieldOption[key];
          if (e.target.id === option.id) {
            option.setTarget(e.target.value);
            break;
          }
        }
      };

      const onSubmitHandler = async (event) => {
        event.preventDefault()
        setIsOpen(false)
        if (location.pathname === '/board') {
            await putArticle(
                { writer: localStorage.userId, content: content },
                (data) => {
                  console.log(data);
                  window.location.reload()
                },
                (err) => console.log(err)
            )
        } else {
            await putComment(
                {
                  writer: localStorage.userId,
                  content: content,
                  boardId: location.state.id,
                },
                (data) => {
                  console.log(data);
                },
                (err) => console.log(err)
            )
        }
      }

    return (
        <MessageBox>
            <TypoStyle>지옥 게시판에 글을 남겨보세요..</TypoStyle>
        {isOpen === true
        ?
        <>
        <TextField id="content" style={{ marginBottom: 20}} onChange={onTypingHandler} placeholder={placeholder} />
        <Button
          variant='contained'
          style={styleForButton}
          onClick={(event) => onSubmitHandler(event)}
        >
          <TypoStyle>글작성</TypoStyle>
        </Button>
        </>

    :
    <Button
          variant='contained'
          style={styleForButton}
          onClick={() => setIsOpen(true)}
        >
          <TypoStyle>글작성</TypoStyle>
        </Button>
    }
      </MessageBox>
    )
}

const MessageBox = styled.div`
  background: #faf6ee;
  padding: 5px;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TypoStyle = styled.p`
  font-family: ChosunCentennial;
  font-size: 15px;
`

const styleForButton = {
    width: "90px", 
    height:"40px", 
    backgroundColor: "#950101"
}


export default ArticleCreateSection