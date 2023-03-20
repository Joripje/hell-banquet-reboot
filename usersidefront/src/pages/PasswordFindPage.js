import { useState }  from 'react'

import { login } from '../api/member'

import styled from "styled-components"
import { FormWithGrid, EntranceOption } from "../components/common"


function PasswordFind() {
    const [ inputEmail, setInputEmail ] = useState()

    const passwordFindOptions = [
        {name: "로그인", url: "/login"},
        {name: "회원가입", url: "/signup"},
    ];

    const textFieldOption = [
        {id: "id", target: setInputEmail, label: "ID or E-Mail", focus: true, type: "id"},
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

    async function axios_test() {
        // 차후에 API 변경할 것
        await login()
        console.log(inputEmail)
    }

    return(
        <Login>
            <LogoSection />
            {FormWithGrid({option: textFieldOption, onClickHandler: axios_test, onTypingHandler: onTypingHandler})}
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

const LogoSection = styled.section`
    width: 60%;
    height: 130px;

    background: #B8DDFF;
`

export default PasswordFind