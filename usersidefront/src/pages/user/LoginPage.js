import { LoginForm } from "../../components/login";

import styled from "styled-components";
import { LinkDecoNone, LogoToLogin } from "../../components/common";

function LoginPage() {
  const logInOptions = [
    { name: "회원가입", url: "/signup" },
    { name: "비밀번호 찾기", url: "/find-password" },
  ];

  return (
    <Login>
      <LogoToLogin />
      <LoginForm />
      {logInOptions.map((item) => {
        return (
          <div key={item.name}>
            <br />
            <LinkDecoNone to={item.url}>{item.name}</LinkDecoNone>
          </div>
        );
      })}
    </Login>
  );
}

const Login = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
`;

export default LoginPage;
