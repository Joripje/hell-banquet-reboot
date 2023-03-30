import styled from "styled-components"
import { HeaderBar, SideBar } from "../components/navbar"
import { DailyStatistics } from "../components/statistics"

function LoginPage() {
    return (
    <>
        <HeaderBar />
        <div style={{display: 'flex'}}>
        <SideBar />
        <Container >
            {/* <DateSelector /> */}
            <DailyStatistics />
        </Container>
        </div>
    </>
    )
}

const Container = styled.div`
    width: 100%;
    margin: 30px calc(15%) 0px calc(200px + 15%);
`

export default LoginPage