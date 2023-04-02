import styled from "styled-components"

function DrawSubject(params) {
    // const { subject } = params
    const subject = '조재경'
    
    return (
        <ColumnBox>
            <MyTypo fontSize='40'>주제</MyTypo>
            <MyTypo fontSize='100'>{subject}</MyTypo>
        </ColumnBox>
    )
}

const ColumnBox = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`

const MyTypo = styled.span`
    font-size: ${props => {return props.fontSize}}px;
    margin: 8% 5% 0% 5%;
`

export default DrawSubject