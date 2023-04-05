import { LinkDecoNone } from "../common";

import styled from "styled-components";
import WaiterSrc from "../../assets/images/waiter.png"

function StickyHeader() {
  return (
    <StickyHeaderNav>
      <LinkDecoNone to='/'>
        <HeaderStyle>
          <WaiterImg src={WaiterSrc}/>
          <TypoStyle>지옥 뷔페</TypoStyle>
        </HeaderStyle>
      </LinkDecoNone>
    </StickyHeaderNav>
  );
}

const StickyHeaderNav = styled.header`
  position: sticky;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 65px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: #492369;

  background: linear-gradient(
    rgba(73, 35, 105, 1) 40%,
    rgba(73, 35, 105, 0.85)
  );

  z-index: 10;
`;

const TypoStyle = styled.p`
  font-size: 30px; 
  font-weight: 500; 
  font-family: Cafe24ClassicType-Regular;
  color: #edebe9; 
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
  margin: 0;
`

const WaiterImg = styled.img`
  height: 50px;
  transform: scaleX(-1);
  margin-right: 10px;
`

const HeaderStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default StickyHeader;
