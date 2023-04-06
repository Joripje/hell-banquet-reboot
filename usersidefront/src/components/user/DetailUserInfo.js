import React from "react";

import { useLocation } from "react-router-dom";

import { TextField, Typography } from "@mui/material";
import styled from "styled-components";

function DetailUserInfo(params) {
  const location = useLocation();
  const userInfo = {
    ...location.state,
    regTime: location.state.regTime.slice(0, 10),
    groupId: "역삼 멀티캠퍼스",
  };
  const { isChanging } = params;
  const changable = ["email", "name"];

  const userInfoForm = {
    userId: "ID",
    name: "이름",
    email: "이메일",
    regTime: "가입일자",
    groupId: "가입 그룹",
  };

  return (
    <UserInfoBox>
      {Object.keys(userInfo).map((key, index) => {
        if (userInfoForm[key]) {
          const isChangable = isChanging && changable.includes(key);
          return (
            <InfoBox key={index}>
              <Typography
                style={{ ...styleForTypo, width: "30%", textAlign: "center" }}
                fontSize={25}
              >
                {userInfoForm[key]}
              </Typography>
              {isChangable ? (
                <TextField
                  style={{ ...styleForTypo, width: "60%" }}
                  placeholder={userInfo[key]}
                  fontSize={key === "email" ? 20 : 25}
                  size='small'
                  key={key}
                />
              ) : (
                <Typography
                  style={{ ...styleForTypo, width: "60%" }}
                  fontSize={key === "email" ? 20 : 25}
                  key={key}
                >
                  {userInfo[key]}
                </Typography>
              )}
            </InfoBox>
          );
        } else {
          return <React.Fragment key={index}></React.Fragment>;
        }
      })}
    </UserInfoBox>
  );
}

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 90%;
  height: auto;
  margin: 5% 5% 5% 5%;
  border-radius: 20px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const styleForTypo = {
  background: "rgb(255, 255, 255, 0.4)",
  margin: "5% 1% 5% 1%",
  padding: "5% 2% 5% 2%",
  borderRadius: 20,
};

export default DetailUserInfo;
