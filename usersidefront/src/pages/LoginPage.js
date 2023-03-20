import { LoginForm } from "../components/login"
import { LinkDecoNone } from "../components/common"

import styled from "styled-components"

function LoginPage() {

    const logInOptions = [
        {name: "회원가입", url: "/signup"},
        {name: "비밀번호 찾기", url: "/find-password"},
    ]


    return(
        <Login>
            <LogoSection />
            <LoginForm />
            {logInOptions.map(item => {
                return (
                    <div key={item.name}>
                        <br />
                        <LinkDecoNone  to={item.url}>
                            {item.name}
                        </LinkDecoNone>
                    </div>
                )
            })}
            {/* {toLogInOption(logInOptions.signUp)}
            <hr />
            {toLogInOption(logInOptions.passwordFind)} */}
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

export default LoginPage