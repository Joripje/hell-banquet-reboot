import styled from "styled-components"
import { Button, Icon } from "@mui/material"

function BoardOptionButton(params) {
    // 마찬가지로 위치가 fix되어 있는 버튼을 만들어야 한다
    // 여기서 만든 버튼과 코드를 그대로 검색에서 사용할 것
    const { id, component, onClick } = params.option

    return (
        <>
            <OptionButton id={id} style={{background: "#A084CA", borderRadius: 40,}} onClick={() => onClick(id)}>
                <OptionIcon component={component} />
            </OptionButton>
            <br />
        </>
    )
}

const OptionButton = styled(Button)`
    width: 50px;
    height: 50px;
    background: #A084CA;
    border-radius: 40;
`

const OptionIcon = styled(Icon)`
    width: 10px;
    height: 10px;

    color: black;
`

export default BoardOptionButton