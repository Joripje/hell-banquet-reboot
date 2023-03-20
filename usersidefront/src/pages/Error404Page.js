import styled from "styled-components"
import { Link } from "react-router-dom"
import NotFoundImage  from "../assets/images/404.png"

function Error404Page() {

    return (
        <Link to={'/'}>
            <The404Img src={NotFoundImage}/>
        </Link >
    )
}

const The404Img = styled.img`
    width: 100%;
    height: 100%;
`

export default Error404Page