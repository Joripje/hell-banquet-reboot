import { useLocation } from "react-router-dom"
import { LinkDecoNone } from "../common"

function NavbarItem(params) {
    const location = useLocation()
    const {options} = params
    
    return (
        <>
        {options.map((option) => {
            const styleForLink = {
                margin: `10px 0px 10px ${location.pathname === option.url ? 30 : 10}px`,
                display: 'block',
                fontWeight: `${location.pathname === option.url ? 1000 : 400}`,
            }
            
            return (
                <LinkDecoNone to={option.url} style={styleForLink} key={option.name}>
                    {option.name}
                </LinkDecoNone>
            )
        })}
        </>
    )
}

export default NavbarItem