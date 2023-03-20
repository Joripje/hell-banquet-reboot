import { SignUpForm } from "../components/signup"
import { LinkDecoNone } from "../components/common"

import styled from "styled-components"

function SignUpPage() {

    return(
        <Login>
            <LogoSection />
            <SignUpForm />
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

export default SignUpPage