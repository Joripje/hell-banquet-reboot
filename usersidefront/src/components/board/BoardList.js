import { useRef, useEffect, useState } from "react"

import { getBoardList } from "../../api/board"

import BoardListItem from "./BoardListItem"


function BoardList() {
    const [ boardInfo, setBoardInfo ] = useState({lastBoardId: -1, size: 10, userId: localStorage.getItem('userId')})

    const [articles, setArticles] = useState(
        [{content: '', src: undefined, id: -1},
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

        if (articles[0]?.id === -1) {
            getMoreList()
        }

        const observerOptions = {
            root: null,
            rootMargin: '100px',
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && boardInfo.lastBoardId !== 1) {
                    getMoreList()
                }
            });
        }, observerOptions);
        
        observer.observe(articleListRef.current.lastChild);

        return () => observer.disconnect();
    }, [articles, boardInfo]);

    return (
        <div ref={articleListRef} style={{background: '#FFF3DF'}} >
            {articles.map((article, index) => {
                return (
                    <BoardListItem article={article} index={index} key={index} />
                )
            })}
        </div>

    )
}

export default BoardList