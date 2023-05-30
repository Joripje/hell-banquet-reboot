import { ExcelButton } from "../components/common";
import { HeaderBar, SideBar } from "../components/navbar";

import styled from "styled-components";
// import { Button, Icon } from "@mui/material";
// import { Download } from "@mui/icons-material";
// import ExcelSampleButton from "../components/member/ExcelSampleButton";

function MemberUpload() {
  return (
    <>
      <HeaderBar />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar />
        <Container>
          <ExcelButton buttonName={"회원 일괄 등록"} />
          <Typo style={{ margin: "20px 0px 20px 0px" }}>
            xlsx파일을 업로드하여 단체로 회원 등록을 할 수 있습니다.
          </Typo>
          <Typo>양식 다운로드</Typo>
          {/* <Button style={styleForButton} variant="contained">
                    파일 다운로드
                    <Icon component={Download} style={{marginLeft: 20}} />
                </Button> */}
          {/* <ExcelSampleButton /> */}
        </Container>
      </div>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  margin: 30px 5% 0px 5%;
`;

const Typo = styled.div`
  font-size: 16px;
  font-weight: 1000;
  margin: 10px 0px 10px 0px;
`;

export default MemberUpload;
