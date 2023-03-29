import { useState } from 'react'

import { ArticleOption, UpDelModal } from "./"
import { LinkDecoNone } from "../common"

import styled from "styled-components"
import { Card, Container, Grid, Icon } from "@mui/material"
import { ThumbDown, ThumbUp, Comment, MoreHoriz } from "@mui/icons-material"

function BoardListItem(params) {
    const { article } = params
    const { likeCount, dislikeCount, commentCount } = article
    const [ showDropdown, setShowDropdown ] = useState(false)

    const onLikeClickHandler = (event) => {
        event.preventDefault()
    }

    const onMoreClickHandler = (event) => {
        event.preventDefault()
        setShowDropdown(true)
        console.log('hello')
    }

    const articleOptions = [
        {id: "like", iconName: ThumbUp, num: likeCount, onClick: onLikeClickHandler},
        {id: "hate", iconName: ThumbDown, num: dislikeCount, onClick: onLikeClickHandler},
        {id: "comments", iconName: Comment, num: commentCount, }
    ]

    const makeItCenter = {display: 'flex', alignItems: 'center'}
    const moreButton = {
        position: 'absolute',
        top: '10px',
        right: '10px',
    }

    return (
        <LinkDecoNone to={`/board/${article.id}`} state={article} >
            <ArticleCard >
                <UpDelModal article={article} />
                <Grid container style={makeItCenter}>
                    <Grid item xs={4}>
                        <JanvanFace src={article.src} alt={article?.id} />
                    </Grid>
                    <Grid item xs={8}>
                        <Container style={{height: 100}}>{article.content}</Container>
                        <Container style={{display: 'flex', justifyContent: 'space-around'}}>
                            {articleOptions.map(option => {
                                const {iconName, num, id, } = option
                                return (
                                    <span onClick={option?.onClick} key={id} >
                                        <ArticleOption iconName={iconName} num={num} />
                                    </span>
                                )
                            })}
                        </Container>
                    </Grid>
                </Grid>
            </ArticleCard>
        </LinkDecoNone>
    )
}

const ArticleCard = styled(Card)`
    position: relative;
    display: flex;
    margin: 10px 0px 10px 0px; 
    height: 160px;
`



const JanvanFace = styled.img`
    width: 140px;
    height: 140px;

    margin-left: 0px 10px 0px 10px;
`

export default BoardListItem