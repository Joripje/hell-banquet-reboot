import { useState } from "react"

import SideBar from "./SideBar"
import { LinkDecoNone } from "../common"
import { excelUpload } from "../../api/member"

import styled from "styled-components"

function HeaderBar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const test = async () => {
        await excelUpload(
            (data) => console.log(data),
            (err) => console.log(err)
        )
    }

    return (
        <NavbarContainer onClick={test}>
            <MenuButton onClick={toggleMenu}>☰</MenuButton>
            {isMenuOpen && (
                <MenuContainer>
                    <SideBar />
                </MenuContainer>
            )}
            <LinkDecoNone to={'/'}>
                <Typo >Logo</Typo>
            </LinkDecoNone>
        </NavbarContainer>
    )
}

const Typo = styled.span`
    font-size: 24px;
    font-weight: 1000;
`

const NavbarContainer = styled.div`
    background: #990000;
    padding: 10px 0px 20px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 600px) {
        flex-direction: row;
        justify-content: start;
    }
`

const MenuButton = styled.button`
    font-size: 24px;
    padding: 0.5rem;
    margin: 0 0.5rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: none;

    @media (max-width: 600px) {
        display: block;
    }
`
const MenuContainer = styled.div`
`

export default HeaderBar