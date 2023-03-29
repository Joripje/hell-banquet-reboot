import { useState, useEffect } from "react"
import { getUserInfo } from "../../api/member"
import { LinkDecoNone } from "../common"

import styled from "styled-components"
import { Typography } from "@mui/material"

function ProfileUserInfo() {
    const [userInfo, setUserInfo] = useState({
        userId: '',
        name: '',
        eMail: '',
        group: ''
    })

    const isVisible = [
        'userId',
        'name',
        'email'
    ]
    
    useEffect(() => {
        async function fetchData() {
            await getUserInfo(
            localStorage.getItem('userId'),
            (data) => {
                setUserInfo(data.data)
            },
            (err) => console.log(err)
        )}

        fetchData()
    }, [])

    const styleForLink = {
        width: '100%',
        height: '80%',
        margin: '5% 5% 5% 5%',
        borderRadius: '20px',
        background: 'rgb(255, 255, 255, 0.4)',
    }
        
    return (
        <LinkDecoNone to={`/user/${userInfo.userId}/update`} state={userInfo} style={styleForLink} >
            <UserInfoBox>
                {isVisible.map((key) => {
                    return (
                        <Typography fontSize={20} key={key} >
                            {key} | {userInfo[key]}
                        </Typography>
                    )
                })}
            </UserInfoBox>
        </LinkDecoNone>
    )
}

const UserInfoBox = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;
    margin: 5% 5% 5% 5%;

    border-radius: 20px;
`

export default ProfileUserInfo