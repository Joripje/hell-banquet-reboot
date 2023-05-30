import { Link } from "react-router-dom"

function LinkDecoNone(params) {
    return (
        <Link to={params.to} state={params.state} style={{...params?.style, textDecoration: "none", color: "black"}}>
            {params?.children}
        </Link>
    )
}

export default LinkDecoNone