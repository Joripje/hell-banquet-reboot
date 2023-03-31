import { Button, Modal, Box, TextField, } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { putArticle } from '../../api/board'

function ArticleCreateModal(params) {
    const navigate = useNavigate()
    const { isOpen, onClose } = params
    const [ content, setContent ] = useState()
    const placeholder = '내용을 입력해주세요'
    const textFieldOption = [
        {id: "content", target: content, setTarget: setContent, focus: true},
    ]

    const onTypingHandler = (e) => {
        console.log(content)

        for (const key in textFieldOption) {
            const option = textFieldOption[key];
            if (e.target.id === option.id) {
                option.setTarget(e.target.value);
                break;
            }
        }
    };

    async function createArticle(event) {
        event.preventDefault()
        await putArticle(
            {writer: localStorage.userId, content: content},
            (data) => {
                console.log(data)
            },
            (err) => console.log(err)
        )
        // 차후에 response가 변경된다면 생성된 게시글의 detail 페이지로 이동시키고 싶음
        navigate(`/board`)
        return onClose()
    } 

    return (
        <Modal open={isOpen} onClose={onClose} >
            <Box component="form" sx={styleForBox}>
                <TextField onChange={onTypingHandler} InputProps={{ sx: { fontSize: 20 }}} multiline placeholder={placeholder} sx={styleForTextField} />
                <Button type="submit" onClick={createArticle} variant='contained'>
                    글 작성
                </Button>
            </Box>
        </Modal>
    )
}

const styleForBox = {
    position: 'absolute',
    top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '20%',
    bgcolor: '#B8DDFF',
    borderRadius: 10,
    boxShadow: 24,
    p: 3,
};

const styleForTextField = {
    bgcolor: 'white', 
    width: '100%', 
    maxheight: '100%',
    borderRadius: '20px',
    
}

export default ArticleCreateModal