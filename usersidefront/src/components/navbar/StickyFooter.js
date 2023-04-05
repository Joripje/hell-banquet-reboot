import { LinkDecoNone } from "../common";
import { useLocation } from "react-router-dom";
import atlas from "../../assets/images/atlas.png";

import styled from "styled-components";
import { Icon } from "@mui/material";
import {
  Forum,
  LocalDining,
  AccountCircle,
  Home,
  BarChart,
} from "@mui/icons-material";
import { useEffect, useState } from "react";

function StickyFooter() {
  const location = useLocation();
  const [scrollY, setScrollY] = useState(window.scrollY);

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

  window.addEventListener("scroll", () => {
    setScrollY(window.scrollY);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <StickyFooterNav scrollY={scrollY}>
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
        {/* <img
          style={{ position: "absolute", top: "100%" }}
          src={atlas}
          alt='atlas'
        /> */}
      </StickyFooterNav>
    </>
  );
}

const StickyFooterNav = styled.footer`
  position: fixed;
  bottom: 0;
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
  @media (min-width: 600px) {
    display: none;
  }
`;
// position: absolute;
// top: calc(100vh - 65px + ${(props) => props.scrollY}px);

export default StickyFooter;
