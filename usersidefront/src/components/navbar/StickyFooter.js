import { LinkDecoNone } from "../common";
import { useLocation } from "react-router-dom";

import styled from "styled-components";
import { Icon } from "@mui/material";
import {
  Forum,
  LocalDining,
  AccountCircle,
  Home,
  BarChart,
} from "@mui/icons-material";

function StickyFooter() {
  const location = useLocation();

  const navlist = [
    { name: "게시판", icon: Forum, url: "/board" },
    { name: "식사기록", icon: LocalDining, url: "/record-meal" },
    { name: "홈", icon: Home, url: "/" },
    { name: "통계", icon: BarChart, url: "/analysis" },
    {
      name: "프로필",
      icon: AccountCircle,
      url: `/user/${localStorage.getItem("userId")}`,
    },
  ];

  return (
    <StickyFooterNav>
      {navlist.map((item) => {
        const pathname = location.pathname;
        return (
          <LinkDecoNone
            to={item.url}
            key={item.name}
            style={{
              textDecoration: "none",
            }}
          >
            <Icon
              component={item.icon}
              style={{
                width: 40,
                height: 40,
                color: pathname.includes(item.url)
                  ? item.name === "홈" && pathname !== "/"
                    ? "black"
                    : "#edebe9"
                  : "black",
              }}
            />
          </LinkDecoNone>
        );
      })}
    </StickyFooterNav>
  );
}

const StickyFooterNav = styled.footer`
  position: fixed;
  bottom: 0px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 80%;
  height: 65px;
  padding: 0px 10% 0px 10%;
  border-radius: 15px 15px 0 0;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2);
  background: #492369;

  background: linear-gradient(
    rgba(73, 35, 105, 0.85),
    rgba(73, 35, 105, 1) 50%
  );

  z-index: 100;
`;

export default StickyFooter;
