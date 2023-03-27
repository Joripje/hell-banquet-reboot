import styled from "styled-components"
import { LogedPageTemplate } from "../components/common"

function RecordMeal(params) {
    return (
        <>
        <LogedPageTemplate />
        <Mijung>

        </Mijung>
        </>
    )
}

const styleForSection = `
    width: 100%;
    height: 200px;
    background: #E5E5E5;

    margin: 15px 0px 15px 0px;
    border-radius: 30px;

    display: flex;
    justify-content: space-between;
`

const Mijung = styled.div`
    ${styleForSection}
`

export default RecordMeal