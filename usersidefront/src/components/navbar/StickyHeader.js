import { Link } from "react-router-dom"

import styled from "styled-components"

function StickyHeader() {

    return (
        <StickyHeaderNav>
            <Link to="" style={{textDecoration: "none", color: "black"}}>
                <h3>지옥 뷔페</h3>
            </Link>
        </StickyHeaderNav>
    )
}


const StickyHeaderNav = styled.footer`
    position: absolute;
    top: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 60px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background : #F2CCCC;
`

export default StickyHeader