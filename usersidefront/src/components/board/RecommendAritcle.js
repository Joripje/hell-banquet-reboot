import { useState, useEffect } from "react"
import staticJanban from "../../assets/images/janban.png"
import { getTodayArticle } from "../../api/board"

import styled from "styled-components"

function RecommendAritcle() {
    const dummy = {writer: '관리자', content: "아직 오늘 작성된 게시글이 없어요"}
    const [todayArticle, setTodayArticle] = useState(dummy)

    const date = new Date().toISOString().split('T')[0]

    useEffect(() =>{
        getTodayArticle(
            date,
            (data) => {
                return data.data
            },
            (err) => console.log(err)
        ).then((data) => setTodayArticle(data))
    }, [date])

    if (todayArticle !== []) {
        return (
            <ContainerForNone>
                <StaticJanbanImg src={staticJanban} alt='잔반이' />
                <Typo fontSize={24}>
                    추천할만한 게시글이 없네요...
                </Typo>
            </ContainerForNone>
        )
    } else {
        return (
            <div>
                {todayArticle === [] ? todayArticle.content : "아직 추천할만한 게시글이 없네요..."}
            </div>
        )
    }

}

const ContainerForNone = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Typo = styled.span`
    font-size: ${props => {return props.fontSize}}px;
    text-align: center;
`

const StaticJanbanImg = styled.img`
    width: 200px;
`

export default RecommendAritcle