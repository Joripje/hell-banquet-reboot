import { Link } from "react-router-dom"

import styled from "styled-components"
import { Forum, LocalDining, AccountCircle } from '@mui/icons-material';
import { Icon } from '@mui/material';


function StickyFooter() {
    // const [ cookie, ] = useCookies(["userInfo"])
    // const [ userId, ] = useState(localStorage.userId)

    const navlist = [
        {name: "게시판", icon: Forum, url: "/board",},
        {name: "식사기록", icon : LocalDining, url: "/siksa",},
        // 나중에 동적인 이름으로 변경할 것
        {name: "프로필", icon: AccountCircle, url: `/useri/ssafy`,},
    ]

    return (
        <StickyFooterNav>
            {navlist.map(item => {
                return (
                    <Link to={item.url} style={{textDecoration: "none", color: "black"}}>
                        <Icon component={item.icon} style={{width: 50, height: 50, }} />
                    </Link>
                )
            })}
        </StickyFooterNav>
    )
}


const StickyFooterNav = styled.footer`
    position: absolute;
    bottom: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 80%;
    height: 80px;
    padding: 0px 10% 0px 10%;
    border-radius: 15px 15px 0 0;
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2);
    background : #F2CCCC;
`

export default StickyFooter