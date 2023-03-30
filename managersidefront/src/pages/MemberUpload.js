import { ExcelButton } from "../components/diet"
import { HeaderBar, SideBar } from "../components/navbar"

import styled from "styled-components"
import { Button, Icon } from "@mui/material";
import { Upload } from "@mui/icons-material"

function MemberUpload(params) {

    const styleForButton = {
        background: '#343434',
    }

    return (
    <>
        <HeaderBar />
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <SideBar />
            <Container >
                <ExcelButton buttonName={'회원 일괄 등록'} />
                <Typo style={{margin: '20px 0px 20px 0px'}}>xlsx파일을 업로드하여 단체로 회원 등록을 할 수 있습니다.</Typo>
                <Typo>양식 다운로드</Typo>
                <Button style={styleForButton} variant="contained">
                    파일 다운로드
                    <Icon component={Upload} style={{marginLeft: 20}} />
                </Button>
            </Container>
        </div>
    </>
    )
}

const Container = styled.div`
    width: 100vh;
    margin: 30px calc(15%) 0px calc(200px + 15%);
`;

const Typo = styled.div`
    font-size: 16px;
    font-weight: 1000;
    margin: 10px 0px 10px 0px;
`;

export default MemberUpload