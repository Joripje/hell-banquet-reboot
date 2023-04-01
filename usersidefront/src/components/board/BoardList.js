import { useRef, useEffect, useState } from "react"
import styled from "styled-components"

import { getBoardList,  } from "../../api/board"

import BoardListItem from "./BoardListItem"


function BoardList() {
    const [ boardInfo, setBoardInfo ] = useState({lastBoardId: -1, size: 10, userId: localStorage.getItem('userId')})

    const [articles, setArticles] = useState(
        [{content: '', src: undefined, likeCount:0, dislikeCount: 0, id: -1},
        {content: '', src: undefined},
        {content: '', src: undefined},
        {content: '', src: undefined},
        {content: 'lorem', src: undefined},
        {content: 'lorem', src: undefined},
        {content: 'lorem', src: undefined},
        {content: 'lorem', src: undefined},
        {content: 'lorem', src: undefined, id: -1},]
    )
    
    const articleListRef = useRef(null);

    
    useEffect(() => {
        const getMoreList = async () => {
            await getBoardList(
                boardInfo,
                (data) => {
                    console.log(data.data)
                    return data.data
                },
                (err) => console.log(err)
            )
            .then((data) => {
                if (articles[0]?.id === -1) {
                    setArticles(data)
                } else {
                    (articles.push(...data))
                }
            })
        } 

        if (articles[0]?.id === -1) {
            getMoreList()
            setBoardInfo({...boardInfo, lastBoardId: articles[articles.length - 1].id})
            return
        }

        const observerOptions = {
            root: null,
            rootMargin: '100px',
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    getMoreList()
                    setBoardInfo({...boardInfo, lastBoardId: articles[articles.length - 1].id})
                }
            });
        }, [observerOptions, articles]);
        
        observer.observe(articleListRef.current.lastChild);

        return () => observer.disconnect();
    }, [articles, boardInfo]);

    return (
        <>
        <BoardListBox ref={articleListRef} style={{background: '#FFF3DF'}} >
            {articles.map((article, index) => {
                return (
                    <BoardListItem article={article} index={index} key={index} />
                )
            })}
        </BoardListBox>
        </>
    )
}

const BoardListBox = styled.div`
background: #FFF3DF;
padding: 10px 0px 90px 0px;
`

export default BoardList