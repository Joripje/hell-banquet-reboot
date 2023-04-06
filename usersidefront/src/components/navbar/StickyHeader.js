import { LinkDecoNone } from "../common";

import styled from "styled-components";
import WaiterSrc from "../../assets/images/waiter.png";

function StickyHeader() {
  return (
    <StickyHeaderNav>
      <HeaderStyle>
        <LinkDecoNone to="/">
          <LogoStyle>
            <WaiterImg src={WaiterSrc} />
            <TypoStyle>지옥 뷔페</TypoStyle>
          </LogoStyle>
        </LinkDecoNone>
        <MenuStyle>
          <LinkDecoNone to="/record-meal">
            <TypoStyleMenu>식사하기</TypoStyleMenu>
          </LinkDecoNone>
          <LinkDecoNone to="/board">
            <TypoStyleMenu>게시판</TypoStyleMenu>
          </LinkDecoNone>
          <LinkDecoNone to="/analysis">
            <TypoStyleMenu>통계</TypoStyleMenu>
          </LinkDecoNone>
          <LinkDecoNone to={`/user/${localStorage.getItem('userId')}`}>
            <TypoStyleMenu>내정보</TypoStyleMenu>
          </LinkDecoNone>
        </MenuStyle>
      </HeaderStyle>
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
  width: 100%;
  white-space: nowrap;
`;

const TypoStyleMenu = styled.p`
  font-size: 15px;
  font-weight: 500;
  font-family: Cafe24ClassicType-Regular;
  color: #fff3df;
  // text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
  margin-left: 20px;
  width: 100%;
  white-space: nowrap;
`;

const WaiterImg = styled.img`
  height: 50px;
  transform: scaleX(-1);
  margin-right: 10px;
`;

const HeaderStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const LogoStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    display: none;
  }
`;

export default StickyHeader;
