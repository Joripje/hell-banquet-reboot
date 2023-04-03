import styled from "styled-components";
import { Button, Typography } from "@mui/material";

import { login } from "../../api/auth";
import {
  getMenus,
  getSingleMenu,
  deleteSingleMenu,
  createMenus,
  getMenusByDate,
  getMenusByType,
} from "../../api/menu";

import { useState } from "react";

function MenusTestPage() {
  const [result, setResult] = useState();

  const dummyUser = {
    userId: "ssafy",
    password: "ssafy",
  };

  const dummyMenu = {
    category: "한식",
    date: "2020-04-01",
    feature: "육",
    managerId: "ssafy",
    menuItems: ["대한제국"],
    menuTypes: ["국"],
    type: "B",
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

  const handleMenus = async () => {
    await getMenus(
      // {userId: localStorage.getItem('userId')},
      (data) => {
        console.log(data);
      },
      (err) => console.log(err)
    );
  };

  const handleSingleMenu = async () => {
    await getSingleMenu(
      1,
      (data) => {
        console.log(data);
        return data.data;
      },
      (err) => console.log(err)
    ).then((data) => setResult(data));
  };

  const handleDeleteMenu = async () => {
    await deleteSingleMenu(
      1,
      (data) => {
        console.log(data);
        return data.data;
      },
      (err) => console.log(err)
    ).then((data) => setResult(data));
  };

  const handleCreateMenu = async () => {
    await createMenus(
      dummyMenu,
      (data) => console.log(data),
      (err) => console.log(err)
    );
  };

  const handleGetMenuByDate = async () => {
    await getMenusByDate(
      { date: "2023-03-30", managerId: "mmy789" },
      (data) => {
        console.log(data);
        return data.data;
      },
      (err) => console.log(err)
    ).then((data) => setResult(data));
  };

  const handleGetMenuByType = async () => {
    await getMenusByType(
      { date: "2020-04-01", managerId: "ssafy", type: "A" },
      (data) => {
        console.log(data);
        return data.data;
      },
      (err) => console.log(err)
    ).then((data) => setResult(data));
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
        onClick={handleMenus}
        style={{ marginBottom: 20 }}
      >
        전체 식단 GET
      </Button>
      <Button
        variant='contained'
        onClick={handleSingleMenu}
        style={{ marginBottom: 20 }}
      >
        단일 식단 GET
      </Button>
      <Button
        variant='contained'
        onClick={handleDeleteMenu}
        style={{ marginBottom: 20 }}
      >
        단일 식단 DELETE
      </Button>
      <Button
        variant='contained'
        onClick={handleCreateMenu}
        style={{ marginBottom: 20 }}
      >
        단일 식단 Create
      </Button>
      <Button
        variant='contained'
        onClick={handleGetMenuByDate}
        style={{ marginBottom: 20 }}
      >
        특정 날짜 식단 조회
      </Button>
      <Button
        variant='contained'
        onClick={handleGetMenuByType}
        style={{ marginBottom: 20 }}
      >
        특정 날짜 A 식단 조회
      </Button>
      <Typography>{JSON.stringify(result)}</Typography>
    </TestBox>
  );
}

const TestBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MenusTestPage;
