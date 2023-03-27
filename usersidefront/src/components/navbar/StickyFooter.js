import { LinkDecoNone } from "../common";

import styled from "styled-components"
import { Icon } from '@mui/material';
import { Forum, LocalDining, AccountCircle } from '@mui/icons-material';


function StickyFooter() {
    // const [ cookie, ] = useCookies(["userInfo"])
    // const [ userId, ] = useState(localStorage.userId)

    const navlist = [
        {name: "게시판", icon: Forum, url: "/board",},
        {name: "식사기록", icon : LocalDining, url: "/record-meal",},
        {name: "프로필", icon: AccountCircle, url: `/user/${localStorage.getItem('userId')}`,},
    ]

    return (
        <StickyFooterNav>
            {navlist.map(item => {
                return (
                    <LinkDecoNone to={item.url} key={item.name} style={{textDecoration: "none", color: "black"}}>
                        <Icon component={item.icon} style={{width: 50, height: 50, }} />
                    </LinkDecoNone>
                )
            })}
        </StickyFooterNav>
    )
}


const StickyFooterNav = styled.footer`
    position: fixed;
    bottom: 0px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 80%;
    height: 80px;
    padding: 0px 10% 0px 10%;
    border-radius: 15px 15px 0 0;
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2);
    background : #F2CCCC;
    
    z-index: 1;
`

export default StickyFooter