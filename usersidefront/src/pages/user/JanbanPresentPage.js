import { LinkDecoNone, LogedPageTemplate } from "../../components/common";
import staticJanban from "../../assets/images/janban.png";

import styled from "styled-components";
import { Icon } from "@mui/material";
import { Gesture, Create } from "@mui/icons-material";

function JanbanPresentPage() {
  return (
    <LogedPageTemplate>
      <JanbanImg src={staticJanban} />
      <LinkDecoNone to={"/drawing"}>
        <IconBox>
          <StyledGestureIcon
            component={Gesture}
            style={{ width: "70%", height: "70%" }}
          />
          <StyledCreateIcon
            component={Create}
            style={{ width: "50%", height: "50%" }}
          />
          <Typp>잔반이에게 선물을 주세요!</Typp>
        </IconBox>
      </LinkDecoNone>
    </LogedPageTemplate>
  );
}

const JanbanImg = styled.img`
  width: 90%;
  background: rgb(211, 188, 240);

  margin: 5% 5% 0% 5%;
  border-radius: 20px;
`;
const IconBox = styled.div`
  background: rgba(191, 192, 187, 0.5);

  margin: 5% 5% 25% 5%;
  border-radius: 20px;
`;
const styleForIcons = `
    font-size: 20rem; 
    position: absolute;
    top: 50%;
    left: 50%;
`;
const StyledGestureIcon = styled(Icon)`
  ${styleForIcons}
  color: #000000;

  transform: translate(-70%, -50%);
`;
const StyledCreateIcon = styled(Icon)`
  ${styleForIcons}
  color: #000000;
  transform: translate(5%, -90%);
`;
const Typp = styled.p`
  position: absolute;
  bottom: 0%;

  width: 100%;
  text-align: center;
  font-size: 24px;
  font-weight: 1000;
`;

export default JanbanPresentPage;
