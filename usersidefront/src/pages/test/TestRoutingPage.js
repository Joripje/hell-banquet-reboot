import { LinkDecoNone } from "../../components/common"

import styled from "styled-components"
import { Button } from "@mui/material"

function TestRoutingPage(params) {
    return (
        <TestBox>
        <LinkDecoNone to={'menus'} style={{marginTop: 20}}>
            <Button variant="contained">
                MENUS
            </Button>
        </LinkDecoNone>
        <LinkDecoNone to={'leftovers'} style={{marginTop: 20}}>
            <Button variant="contained">
                LEFTOVERS
            </Button>
        </LinkDecoNone>
        </TestBox>
    )
}

const TestBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default TestRoutingPage