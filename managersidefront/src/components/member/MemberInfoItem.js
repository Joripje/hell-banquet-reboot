
import styled from "styled-components"

function MemberInfoItem(params) {
    const { id, name, email } = params.info
    return (
        <TableItem>
            <Typo>{id}</Typo>
            <Typo>{name}</Typo>
            <Typo>{email}</Typo>
        </TableItem>
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
    margin: 10px 0px 10px 0px;
`;

export default MemberInfoItem