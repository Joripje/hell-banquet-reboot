import { LinkDecoNone } from "../common";

import styled from "styled-components";

function StickyHeader() {
  return (
    <StickyHeaderNav>
      <LinkDecoNone to='/' style={{ textDecoration: "none", color: "black" }}>
        <span style={{ fontSize: 24, fontWeight: 1000 }}>지옥 뷔페</span>
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
  height: 60px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: #f2cccc;

  z-index: 10;
`;

export default StickyHeader;
