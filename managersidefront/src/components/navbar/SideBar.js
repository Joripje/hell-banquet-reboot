import React, { useState } from "react"

import styled from "styled-components"
import NavbarItem from "./NavbarItem"

function SideBar() {
    const [managerName, ] = useState('조립제')
    const [groupName, ] = useState('역삼 멀티캠퍼스')

    const dietOptions = [
        {name: '식단 등록', url: '/diet/upload'},
        {name: '식단 수정', url: '/diet/update'},
    ]

    const statisticsOptions = [
        {name: '일간 통계', url: '/statistics/daily'},
        {name: '주간 통계', url: '/statistics/weekly'},
    ]

    const memberOptions = [
        {name: '회원 등록', url: '/member/upload'},
        {name: '회원 조회', url: '/member/read'},
    ]

    const navOptions = [
        {name: managerName, options: [{name: groupName, url: '/'}],},
        {name: "식단 관리", options: dietOptions},
        {name: "통계", options: statisticsOptions},
        {name: "회원 관리", options: memberOptions},
    ]

    return (
        <NavbarContainer>
            {navOptions.map((option) => {
                return (
                    <div key={option.name} style={{margin: '0px 20px 0px 20px',}}>
                        <Typo >{option.name}</Typo>
                        <NavbarItem options={option.options} />
                        <hr />
                    </div>
                )
            })}
        </NavbarContainer>
    )
}

const NavbarContainer = styled.nav`
    position: absolute;
    width: 200px;
    height: 100vh;
    border-right: 2px solid black;

`

const Typo = styled.div`
    font-size: 24px;
    font-weight: 1000;

    padding: 10px 0px 10px 0px;
`

export default SideBar