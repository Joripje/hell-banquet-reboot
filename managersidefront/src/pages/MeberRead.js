import { ExcelButton } from "../components/common"
import { HeaderBar, SideBar } from "../components/navbar"

import styled from "styled-components"
import { useState } from "react"
import MemberInfo from "../components/member/MemberInfo"

function MemberRead() {
    const dummy = [
        {id: 123456, name: '조재경', email: 'kimjih@naver.com'},
        {id: 123456, name: '조재경', email: 'kimjih@naver.com'},
        {id: 123456, name: '조재경', email: 'kimjih@naver.com'},
        {id: 123456, name: '조재경', email: 'kimjih@naver.com'},
        {id: 123456, name: '조재경', email: 'kimjih@naver.com'},
        {id: 123456, name: '조재경', email: 'kimjih@naver.com'},
        {id: 123456, name: '조재경', email: 'kimjih@naver.com'},
        {id: 123456, name: '조재경', email: 'kimjih@naver.com'},

    ]
    const [ userInfos,  ] = useState(dummy)

    return (
    <>
        <HeaderBar />
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <SideBar />
            <Container >
                <ExcelButton buttonName={'회원 일괄 등록'} />
                <MemberInfo infos={userInfos} />
            </Container>
        </div>
    </>
    )
}

const Container = styled.div`
    width: 100vh;
    margin: 30px calc(15%) 0px calc(200px + 15%);
`

export default MemberRead