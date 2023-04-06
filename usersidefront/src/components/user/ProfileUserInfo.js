import { useState, useEffect } from "react";
import { getUserInfo } from "../../api/member";
import { LinkDecoNone } from "../common";

import styled from "styled-components";
import { Typography } from "@mui/material";

function ProfileUserInfo() {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    name: "",
    eMail: "",
    group: "",
  });

  const userInfoForm = {
    userId: "ID",
    name: "이름",
    email: "이메일",
  };

  const isVisible = ["userId", "name", "email"];

  useEffect(() => {
    async function fetchData() {
      await getUserInfo(
        localStorage.getItem("userId"),
        (data) => {
          setUserInfo(data.data);
        },
        (err) => console.log(err)
      );
    }

    fetchData();
  }, []);

  const styleForLink = {
    width: "100%",
    height: "auto",
    margin: "5% 5% 5% 5%",
    borderRadius: "20px",
    background: "rgb(255, 255, 255, 0.4)",
  };

  return (
    <LinkDecoNone
      to={`/user/${userInfo.userId}/update`}
      state={userInfo}
      style={styleForLink}
    >
      <UserInfoBox>
        {isVisible.map((key, index) => {
          return (
            <InfoBox key={index}>
              <Typography
                style={{ ...styleForTypo, width: "20%", textAlign: "center" }}
                fontSize={20}
              >
                {userInfoForm[key]}
              </Typography>
              <Typography
                style={{ ...styleForTypo, width: "63%" }}
                fontSize={20}
              >
                {userInfo[key]}
              </Typography>
            </InfoBox>
          );
        })}
        {/* <Button
          variant='contained'
          style={{ alignSelf: "end", marginRight: "8%" }}
          color='warning'
        >
          수정하러 가기
        </Button> */}
      </UserInfoBox>
    </LinkDecoNone>
  );
}

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 100%;
  height: 100%;
  margin-left: 3%;

  border-radius: 20px;
`;

const styleForTypo = {
  background: "rgb(255, 255, 255, 0.4)",
  margin: "1% 1% 1% 1%",
  padding: "2% 2% 2% 2%",
  borderRadius: 20,
};

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export default ProfileUserInfo;
