import { StickyFooter, StickyHeader } from "../navbar"

function LogedPageTemplate(params) {
    /*
        sticky한 Header와 Footer를 인증이 완료된 유저에게 렌더링시킬 컴포넌트 
    */
    return (
        <>
            <StickyHeader />
            <StickyFooter />
        </>
    )
}

export default LogedPageTemplate