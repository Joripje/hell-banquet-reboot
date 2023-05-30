import MemberInfoItem from "./MemberInfoItem"
import styled from "styled-components"
import { Button } from "@mui/material"

function MemberInfo(params) {
    const { infos } = params

    const styleForButton = {
        color: '#000000',
        fontWeight: 1000,
        border: '2px solid black'
    }

    return (
        <>
        <TableItem>
            <Typo>회원 ID</Typo>
            <Typo style={{width: '12%'}}>이름</Typo>
            <Typo style={{width: '10%'}}>이메일</Typo>
        </TableItem>
        {infos.map((info) => {
            return (
                <MemberInfoItem info={info} />
            )
        })}
        <br />
        <hr />
        <br />
        <Button style={styleForButton} variant="outlined">결과 다운로드</Button>
        </>
    )
}

const TableItem = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    border: 1px solid black;
`

const Typo = styled.span`
    font-size: 16px;
    font-weight: 1000;
    margin: 10px 0px 10px 0px;
`;

export default MemberInfo