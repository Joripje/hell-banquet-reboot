import { useRef, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import BoardListItem from "./BoardListItem"
import { getCommentList } from "../../api/board"

import styled from "styled-components"


function ArticleDetail() {
    const location = useLocation()
    const articleListRef = useRef(null);

    const dummy = {content: '이건 더미에용!', src: undefined}

    const [articles, setArticles] = useState(
        [{content: 'lorem', src: undefined, id: -1},
        {content: 'lorem', src: undefined},
        {content: 'lorem', src: undefined},
        {content: 'lorem', src: undefined},
        {content: 'lorem', src: undefined},
        {content: 'lorem', src: undefined},
        {content: 'lorem', src: undefined},
        {content: 'lorem', src: undefined},
        {content: 'lorem', src: undefined, id: -1},]
    )
    
    useEffect(() => {
        const getMoreComment = async () => {
            const data = await getCommentList(
                location.state.id,
                (data) => {
                    return data.data
                },
                (err) => console.log(err)
            )
            if (articles[0]?.id === -1) {
                setArticles(data)
            } else {
                setArticles([...articles, ...data])
            }
        } 
        
        getMoreComment()

        if (articles[0]?.id === -1) {
            console.log(`U R First at ${location.state.id}`)
            getMoreComment()
        }

        const observerOptions = {
            root: null,
            rootMargin: '100px',
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // article이 2배씩 증식함
                    // setArticles(articles.flatMap(article => [article, article]));
                    // getMoreList()
                }
            });
        }, observerOptions);

         observer.observe(articleListRef?.current.lastChild);

        return () => observer.disconnect();
    }, [articles, location]);

    return (
        <DetailBox >
            <BoardListItem article={dummy} />
            <div ref={articleListRef} style={{paddingTop: '100px',paddingBottom:'100px'}}>
                    {articles.length === 0
                        ?<div style={{textAlign: 'center'}}>아직 댓글이 없어요</div>
                        :articles.map((article, index) => {return (<BoardListItem article={article} index={index} key={index} />)})
                    }
            </div>
        </DetailBox>
    )
}

const DetailBox = styled.div`
    background: #FFF3DF;
`

export default ArticleDetail