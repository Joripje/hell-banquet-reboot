import { useState } from "react"

// import ArticleOptionItem from "./ArticleOptionItem"

import { Icon, IconButton } from "@mui/material"
import { ThumbDown, ThumbUp, Comment,  } from "@mui/icons-material"
import { putDisLike, putLike } from "../../api/board"

function ArticleOption(params) {
    const { article } = params
    // const { likeCount, dislikeCount, commentCount } = article
    // 차후에 props에서 넘어온 값으로 변경할 것
    // 0 좋아요 1 싫어요 -1 몰라유
    const [isLiked, setIsLiked] = useState(-1)
    const [likeCount, setLikeCount] = useState(article.likeCount)
    const [dislikeCount, setDislikeCount] = useState(article.dislikeCount)
    const [commentCount, setCommentCount] = useState(article.commentCount)

    const changeLike = async () => await putLike(
        {
            userId: localStorage.getItem('userId'), 
            boardId: article.id
        },
        (data) => {
            console.log(data)
        },
        (err) => console.log(err)
    )

    const changeDisLike = async () => await putDisLike(
        {
            userId: localStorage.getItem('userId'), 
            boardId: article.id
        },
        (data) => {
            console.log(data)
        },
        (err) => console.log(err)
    )

    const handleClickCount = (event) => {
        event.preventDefault()
        console.log(event.target?.id)

        const target = event.target?.id
        if (! target) {
            return
        }

        const { id, onClick, num, otherHand } = articleOptions[target]
        const otherHadnOption = articleOptions[otherHand]

        if (id === 'like') {
            changeLike()
        } else {
            changeDisLike()
        }
        if (isLiked === target) {
            onClick(article.likeCount)
            setIsLiked(-1)
        } else if (isLiked !== -1) {
            otherHadnOption.onClick(otherHadnOption.num - 1)
            onClick(num + 1)
            setIsLiked(target)

        } else {
            onClick(num + 1)
            setIsLiked(target)
        }

    }

    const articleOptions = [
        {id: "like", iconName: ThumbUp, num: likeCount, onClick: setLikeCount, otherHand: 1},
        {id: "hate", iconName: ThumbDown, num: dislikeCount, onClick: setDislikeCount, otherHand: 0},
        {id: "comments", iconName: Comment, num: commentCount, onClick: setCommentCount}
    ]


    return (
        articleOptions.map((option, index) => {
            const {iconName, num, } = option
            const styleForIcon = {
                marginRight: 10,
                fontSize: 34,
                color: isLiked === index.toString() ? '#990000' : '#000000',
            }

            const styleForButton = {
                padding: 0,
                width: '5rem',
                height: '3rem',
            }
            return (
                <IconButton disableTouchRipple  onClick={handleClickCount} style={styleForButton} key={index} id={index} >
                    <Icon component={iconName} style={styleForIcon} id={index} />
                    {num}
                </IconButton>
                )
        })
    )
            
}


export default ArticleOption