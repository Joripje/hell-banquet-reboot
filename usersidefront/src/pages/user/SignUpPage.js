import { SignUpForm } from "../../components/signup";
import { LogoToLogin } from "../../components/common";

import styled from "styled-components";

function SignUpPage() {
  return (
    <Login>
      <LogoToLogin />
      <SignUpForm />
    </Login>
  );
}

const Login = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
`;

export default SignUpPage;
