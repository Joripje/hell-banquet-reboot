
import { Container } from "@mui/system";
import { useState } from "react";
import styled from "styled-components";
import { LogedPageTemplate,  } from "../components/common"
import { DeleteUser, DetailUserInfo, UpdateUser } from "../components/user";

function UserInfoChangePage() {
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
    console.log(onTypingHandler)

    return (
        <>
            <LogedPageTemplate />
            <Container style={StyleForContainer}>
                <UserInfoSection>
                    <DetailUserInfo />
                </UserInfoSection>
                <UpdateUser userInfo={userInfo} />
                <DeleteUser userInfo={userInfo} />
            </Container>
        </>
    )
}

const StyleForContainer = {
    display: 'flex',
    flexDirection: 'column',
}


const styleForSection = `
    width: 100%;
    background: #E5E5E5;

    margin: 15px 0px 15px 0px;
    border-radius: 30px;

    display: flex;
    justify-content: space-between;
`

const UserInfoSection = styled.section`
    ${styleForSection}
    height: auto;
    background: #D0BCFF;

`

export default UserInfoChangePage