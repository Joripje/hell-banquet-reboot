import { useState } from "react"

import ArticleOption from "./ArticleOption"
import { LinkDecoNone } from "../common"

import styled from "styled-components"
import { Card, Grid, } from "@mui/material"
import { ThumbDown, ThumbUp, Comment } from "@mui/icons-material"

function BoardListItem(params) {
    // article과 관련된 모든 정보가 넘어옴
    const { article, index } = params
    // 일단은 잠시 사용할 좋아요 관련 변수
    // const [ isLiked, setIsLiked ] = useState(undefined)
    const [ numLiked,  ] = useState({like: 0, hate: 0, comments: 0})

    const onLikeClickHandler = (event) => {
        console.log(event.target)
        event.preventDefault()
    }

    const articleOptions = [
        {id: "like", iconName: ThumbUp, num: numLiked.like, onClick: onLikeClickHandler},
        {id: "hate", iconName: ThumbDown, num: numLiked.hate, onClick: onLikeClickHandler},
        {id: "comments", iconName: Comment, num: numLiked.comments, }
    ]


    return (
        <ArticleCard  >
            <LinkDecoNone to={`/board/${index}`}>
                <Grid container>
                    <Grid item xs={4}>
                        <JanvanFace src={article.src} alt={article?.id} />
                    </Grid>
                    <Grid item xs={8}>
                        <div>{article.content}</div>
                        {articleOptions.map(option => {
                            const {iconName, num, id } = option
                            return (
                                <ArticleOption iconName={iconName} num={num} onClick={option?.onClick} key={id} />
                            )
                        })}
                    </Grid>
                </Grid>
            </LinkDecoNone>
        </ArticleCard>
    )
}

const ArticleCard = styled(Card)`
    margin: 10px 0px 10px 0px; 
    height: 160px;
`

const JanvanFace = styled.img`
    width: 140px;
    height: 140px;

    margin-left: 0px 10px 0px 10px;
`

export default BoardListItem