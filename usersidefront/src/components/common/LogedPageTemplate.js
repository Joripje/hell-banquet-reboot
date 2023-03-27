import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { StickyFooter, StickyHeader } from "../navbar"

function LogedPageTemplate() {
    const navigate = useNavigate()
    /*
        sticky한 Header와 Footer를 인증이 완료된 유저에게 렌더링시킬 컴포넌트
        PrivateRouting 
    */
    useEffect(()=> {
        if (localStorage.getItem('auth') === null) {
            localStorage.clear()
            navigate('/login')
            alert('로그인이 안돼있네요...?')
        }
    }, [navigate])

    return (
        <>
            <StickyHeader />
            <StickyFooter />
        </>
    )
}

export default LogedPageTemplate