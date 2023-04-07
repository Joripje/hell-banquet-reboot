import LoginForm from "../../components/login/LoginForm";

import styled from "styled-components";

function ManagerLoginPage() {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
}

const Container = styled.div`
  margin-left: calc(50% - 250px);
  margin-right: calc(50% - 250px);
`;

export default ManagerLoginPage;
