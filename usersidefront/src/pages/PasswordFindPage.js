import { useState }  from 'react'

import { findUserPassword } from '../api/member'

import styled from "styled-components"
import { FormWithGrid, EntranceOption, LogoToLogin } from "../components/common"


function PasswordFind() {
    const [ inputEmail, setInputEmail ] = useState()

    const passwordFindOptions = [
        {name: "로그인", url: "/login"},
        {name: "회원가입", url: "/signup"},
    ];

    const textFieldOption = [
        {id: "email", target: setInputEmail, label: "E-Mail", focus: true, type: "email"},
    ];

    const onTypingHandler = (e) => {
        for (const key in textFieldOption) {
            const option = textFieldOption[key];
            if (e.target.id === option.id) {
              option.target(e.target.value);
              break;
            }
        }
    };

    async function findPassword() {
        // 차후에 API 변경할 것
        await findUserPassword(
            {email: inputEmail},
            (data) => {
                console.log(data)
            },
            (err) => console.log(err)
        )
        console.log(inputEmail)
    }

    return(
        <Login>
            <LogoToLogin />
            {FormWithGrid({option: textFieldOption, onClickHandler: findPassword, onTypingHandler: onTypingHandler, buttonName: '임시 비밀번호 발급'})}
            {EntranceOption(passwordFindOptions)}
        </Login>
    )
}

const Login = styled.section`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    width: 100%;
    height: 932px;

`

export default PasswordFind