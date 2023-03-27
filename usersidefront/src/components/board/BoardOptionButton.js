import styled from "styled-components"
import { Button, Icon } from "@mui/material"

function BoardOptionButton(params) {
    // 마찬가지로 위치가 fix되어 있는 버튼을 만들어야 한다
    // 여기서 만든 버튼과 코드를 그대로 검색에서 사용할 것
    const { id, component, onClick } = params.option

    return (
        <>
            <OptionButton id={id} style={{background: "#B8DDFF", borderRadius: 40,}} onClick={() => onClick(id)}>
                <OptionIcon component={component} style={{width: 50, height: 50, }} />
            </OptionButton>
            <br />
        </>
    )
}

const OptionButton = styled(Button)`
    width: 80px;
    height: 80px;
`

const OptionIcon = styled(Icon)`
    width: 60px;
    height: 60px;

    color: black;
`

export default BoardOptionButton