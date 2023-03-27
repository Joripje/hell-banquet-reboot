import { useRef, useEffect, useState } from "react"
import styled from "styled-components"

import { getBoardList } from "../../api/board"

import BoardListItem from "./BoardListItem"


function ArticleDetail() {
    const [ boardInfo, setBoardInfo ] = useState({lastBoardId: 20, size: 10})
    const lorem = "Lorem ipsuetur adipiscing elit. Vestibulum porta odio eros, eget dignissim felis egestas vitae. Mauris sit amet est nec eros accumsan eleifend. Etia".slice(0, 100)

    const [articles, setArticles] = useState(
        [{content: lorem, src: undefined, id: -1},
        {content: lorem, src: undefined},
        {content: lorem, src: undefined},
        {content: lorem, src: undefined},
        {content: lorem, src: undefined},
        {content: lorem, src: undefined},
        {content: lorem, src: undefined},
        {content: lorem, src: undefined},
        {content: lorem, src: undefined, id: -1},]
    )
    // const [newArticles, setNewArticles] = useState(undefined)
    
    const articleListRef = useRef(null);

    
    useEffect(() => {
        const getMoreList = async () => {
            const data = await getBoardList(
                boardInfo,
                (data) => {
                    return data.data
                },
                (err) => console.log(err)
            )
            if (articles[0]?.id === -1) {
                setArticles(data)
            } else {
                (articles.push(...data))
            }
            setBoardInfo({...boardInfo, lastBoardId: articles[articles.length - 1].id})
        } 
        // console.log(articles)
        // console.log(boardInfo)

        if (articles[0]?.id === -1) {
            console.log('U R First')
            // getMoreList()
        }

        const observerOptions = {
            root: null,
            rootMargin: '100px',
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && boardInfo.lastBoardId !== 1) {
                    console.log('한무스크롤 발동!!');
                    // article이 2배씩 증식함
                    // setArticles(articles.flatMap(article => [article, article]));
                    // getMoreList()
                }
            });
        }, observerOptions);
        
        observer.observe(articleListRef.current.lastChild);

        return () => observer.disconnect();
    }, [articles, boardInfo]);

    return (
        <DetailBox >
            <BoardListItem article={articles[0]} />
            <div ref={articleListRef}  style={{ marginTop: "100px", marginBottom: "70px" }}>
                {articles.map((article, index) => {
                    return (
                        <BoardListItem article={article} index={index} key={index} />
                    )
                })}
            </div>
        </DetailBox>
    )
}

const DetailBox = styled.div`
    background: #FFF3DF;
`

export default ArticleDetail