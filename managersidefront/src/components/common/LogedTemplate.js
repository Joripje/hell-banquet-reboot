import { ExcelButton } from "../components/diet"
import { HeaderBar, SideBar } from "../components/navbar"

import styled from "styled-components"

function MemberUpload(params) {
    return (
    <>
        <HeaderBar />
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <SideBar />
            <Container >
                <ExcelButton buttonName={'회원 일괄 등록'} />
            </Container>
        </div>
    </>
    )
}

const Container = styled.div`
    width: 100vh;
    margin: 30px calc(15%) 0px calc(200px + 15%);
`

export default MemberUpload