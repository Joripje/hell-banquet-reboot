import { LogedPageTemplate } from "../../components/common";
import { ProfileUserInfo } from "../../components/user";
import { OverviewDailyJanban } from "../../components/janban";
import { OverviewStatics } from "../../components/analytics";
import { useNavigate } from "react-router-dom";

import { logout } from "../../api/auth";

import styled from "styled-components";
import { Button, Container } from "@mui/material";

function UserPage() {
  const navigate = useNavigate();
  const date = new Date().toISOString().split("T")[0];

  const onLogoutHandler = async () => {
    await logout(
      (data) => {
        console.log(data);
        alert("정상적으로로그아웃 됐습니다.");
        navigate("/");
        localStorage.clear();
      },
      (err) => console.log(err)
    );
  };

  return (
    <LogedPageTemplate>
      <Container sx={styleForContainer}>
        <JanbanSection>
          <OverviewDailyJanban />
        </JanbanSection>
        <UserInfoSection to="/">
          <ProfileUserInfo />
        </UserInfoSection>
        <StatisticsSection>
          <OverviewStatics date={date} />
        </StatisticsSection>
        <Button
          onClick={onLogoutHandler}
          color="error"
          variant="contained"
          style={{ zIndex: 0, marginBottom: 100, width: "30%" }}
        >
          로그아웃
        </Button>
      </Container>
    </LogedPageTemplate>
  );
}

const styleForContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const styleForSection = `
    width: 100%;
    height: auto;
    background: #E5E5E5;

    margin: 15px 0px 15px 0px;
    border-radius: 30px;

    display: flex;
    justify-content: space-between;
`;

const JanbanSection = styled.section`
  ${styleForSection}
`;
const UserInfoSection = styled.section`
  ${styleForSection}
  background: #d0bcff;
`;
const StatisticsSection = styled.section`
  ${styleForSection}
`;

export default UserPage;
