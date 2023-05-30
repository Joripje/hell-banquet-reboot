import { useState } from "react";

import { login } from "../../api/auth";
import {
  getDailyRank,
  getLeftoverData,
  sendLeftoverData,
} from "../../api/leftover";
//sendLeftoverImg

import styled from "styled-components";
import { Button, Typography } from "@mui/material";

function LeftoversTestPage() {
  const [result, setResult] = useState();

  const dummyUser = {
    userId: "ssafy",
    password: "ssafy",
  };

  const reGenToken = async () => {
    await login(
      dummyUser,
      (data) => {
        console.log(data);
      },
      (err) => console.log(err)
    );
  };

  const handleGetLeftoverData = async () => {
    await getLeftoverData(
      { userId: "ssafy", endDate: 20230401, startDate: 20230301 },
      (data) => {
        console.log(data);
        return data;
      },
      (err) => console.log(err)
    ).then((data) => setResult(data));
  };

  const handleGetDailyRank = async () => {
    await getDailyRank(
      { userId: "ssafy" },
      (data) => {
        console.log(data);
        return data.data;
      },
      (err) => console.log(err)
    ).then((data) => setResult(data));
  };

  const handleSendData = async () => {
    await sendLeftoverData(
      {
        beofore: 100,
        after: 10,
        courseNo: 1,
        userId: "string",
      },
      (data) => {
        console.log(data);
        return data;
      },
      (err) => console.log(err)
    );
  };

  return (
    <TestBox>
      <Button
        variant='contained'
        onClick={reGenToken}
        style={{ marginBottom: 20 }}
      >
        토큰 재생성
      </Button>
      <Button
        variant='contained'
        onClick={handleGetLeftoverData}
        style={{ marginBottom: 20 }}
      >
        잔반 통계 정보 확인
      </Button>
      <Button
        variant='contained'
        onClick={handleGetDailyRank}
        style={{ marginBottom: 20 }}
      >
        일일 랭킹 확인
      </Button>
      <Button
        variant='contained'
        onClick={handleSendData}
        style={{ marginBottom: 20 }}
      >
        데이터 기록
      </Button>
      <Typography>{JSON.stringify(result)}</Typography>
    </TestBox>
  );
}

const TestBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export default LeftoversTestPage;
