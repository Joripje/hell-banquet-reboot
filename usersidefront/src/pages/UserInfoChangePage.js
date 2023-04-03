import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { updateUserInfo, deleteUser } from "../api/member";
import { LogedPageTemplate,  } from "../components/common";
import { DetailUserInfo,  } from "../components/user";

import styled from "styled-components";
import { Button } from "@mui/material";

function UserInfoChangePage() {
    const location = useLocation()
    const navigate = useNavigate()
    const [isChanging, setIsChanging] = useState(false)

    const [userInfo, setUserInfo] = useState({
        id: 0,
        userId: '',
        name: '',
        email: '',
        regTime: '',
        groupId: '',
    })

    const onTypingHandler = (e) => {
        for (const key in Object.keys(userInfo)) {
            if (e.target.id === key) {
                setUserInfo(prevState => ({
                    ...prevState, 
                    [key]: e.target.value
                }))
                break;
            }
        }
    };

    async function handleUpdate() {
        if (isChanging === true) {
            await updateUserInfo(
                userInfo,
                (data) => {
                    console.log(data)
                }, 
                (err) => console.log(err)
            )
        }
        
        setIsChanging(!isChanging)
    }

    async function handleDelete() {
        console.log(userInfo)
        await deleteUser(
            userInfo,
            (data) => {
                console.log(data)
                navigate('/login')
            }, 
            (err) => console.log(err)
        )
    }


    useEffect(() => {
        setUserInfo(location.state)
    }, [location])

    console.log(onTypingHandler)

    return (
        <>
            <LogedPageTemplate />
            <StyledContainer >
                <UserInfoSection>
                    <DetailUserInfo isChanging={isChanging} />
                </UserInfoSection>
                <StyledContainer >
                    {/* <UpdateUser userInfo={userInfo} isChanging={isChanging} onClick /> */}
                    <Button variant="contained" onClick={handleUpdate} style={styleForButton} >
                        {isChanging ? '수정 완료' : '수정하기'}
                    </Button>
                    {/* <DeleteUser userInfo={userInfo} /> */}
                    <Button variant="contained" color="error" onClick={handleDelete} style={{marginBottom: 20, width: '10rem', height: '3rem'}} >
                        계정 삭제
                    </Button>
                </StyledContainer>
            </StyledContainer>
        </>
    )
}

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const styleForSection = `
    width: 100%;
    background: #E5E5E5;

    margin: 15px 0px 15px 0px;
    border-radius: 30px;

    display: flex;
    justify-content: space-between;
`

const styleForButton = {
    marginBottom: 20, 
    width: '10rem', 
    height: '3rem',
}

const UserInfoSection = styled.section`
    ${styleForSection}
    height: auto;
    background: #D0BCFF;

`

export default UserInfoChangePage