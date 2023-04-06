import styled from "styled-components"
import { Button } from "@mui/material"
import { checkUnique } from "../../api/member"

function CheckButton(params) {
    const { target, targetValue } = params
    const requestData = {}
    requestData[target] = targetValue


    const handleCheckUnique = (event) => {
        event.preventDefault()
        checkUnique(
            requestData,
            (data) => {
                console.log(data)
            },
            (err) => console.log(err)
        )
    }
   
    return(
        <StyledButton onClick={(event) => handleCheckUnique(event)}>
            중복 확인
        </StyledButton>
    )
}

const StyledButton = styled.button`
    position: absolute;
    top: 50%;
    right: 50px;
    transform: translate(50%, -20%);

    border: none;
    border-radius: 10px;
    background: #B8DDFF;
    color: white;

    height: 40%
`

export default CheckButton