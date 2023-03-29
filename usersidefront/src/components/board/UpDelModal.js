import { useState } from 'react'

// update 만들 때 주석해제할 것
// import ArticleCreateModal from './ArticleCreateModal'
// import { Button, Modal, Box, TextField, Icon } from '@mui/material'

import { Icon } from '@mui/material'

import { MoreHoriz } from "@mui/icons-material"

function UpDelModal(params) {
    const { article } = params
    const [ isOpen, setIsOpen ] = useState(false)

    const onMoreClickHandler = (event) => {
        event.preventDefault()
        setIsOpen(!isOpen)
    }

    const moreButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
    }

    const dropBox = 
    <div style={moreButtonStyle}>
        {/* <ArticleCreateModal isOpen={isOpen}  /> */}
        <div onClick={onMoreClickHandler} >수정</div>
        <div onClick={onMoreClickHandler} >삭제</div>
    </div>


    return (
        <>
        {localStorage.userId !== article?.author 
        ? isOpen 
            ? dropBox //모달
            : <Icon onClick={onMoreClickHandler} component={MoreHoriz} style={moreButtonStyle} />
        : <></>}
        </>
    )
}

export default UpDelModal