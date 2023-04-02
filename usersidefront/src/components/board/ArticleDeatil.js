import { useRef, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import BoardListItem from "./BoardListItem"
import { getArticleDeatail } from "../../api/board"

import styled from "styled-components"


function ArticleDetail() {
    const location = useLocation()
    const articleListRef = useRef(null);

    const article = location.state
    // console.log(location.state)
    // const dummy = {content: '이건 더미에용!', src: undefined}


    const [comments, setComments] = useState(
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
            const data = await getArticleDeatail(
                {id: location.state.id, getForm: {lastCommentId: -1, size: 10}},
                (data) => {
                    return data.data.comments
                },
                (err) => console.log(err)
            )
            if (comments[0]?.id === -1) {
                setComments(data)
            } else {
                setComments([...comments, ...data])
            }
        } 
        
        if (comments[0]?.id === -1) {
            getMoreComment()
        }

        // if (articleListRef && articleListRef.current && comments.length > 0) {
        //     const observerOptions = {
        //         root: null,
        //         rootMargin: '100px',
        //         threshold: 0.5
        //     };
        // }
        
        // const observer = new IntersectionObserver(entries => {
        //     entries.forEach(entry => {
        //         if (entry.isIntersecting) {
        //             // article이 2배씩 증식함
        //             // setArticles(articles.flatMap(article => [article, article]));
        //             // getMoreList()
        //         }
        //     });
        // }, observerOptions);

        // console.log(articleListRef)
        // console.log(comments)
        // observer.observe(articleListRef?.current.lastChild);

        // return () => observer.disconnect();
    }, [comments, location, articleListRef]);

    return (
        <DetailBox >
            <BoardListItem article={article} />
            <div ref={articleListRef} style={{paddingTop: '100px',paddingBottom:'100px'}}>
                    {comments.length === 0
                        ?<div style={{textAlign: 'center'}}>아직 댓글이 없어요</div>
                        :comments.map((article, index) => {return (<BoardListItem article={article} index={index} key={index} />)})
                    }
            </div>
        </DetailBox>
    )
}

const DetailBox = styled.div`
    background: #FFF3DF;
`

export default ArticleDetail