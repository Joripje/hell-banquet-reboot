import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import NotFoundImage from "../../assets/images/404.png";

function Error404Page() {
  const navigate = useNavigate();

  return (
    <Container404>
      <The404Img onClick={() => navigate(-1)} src={NotFoundImage} />
    </Container404>
  );
}

const Container404 = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;

const The404Img = styled.img`
  width: 100%;
`;

export default Error404Page;
