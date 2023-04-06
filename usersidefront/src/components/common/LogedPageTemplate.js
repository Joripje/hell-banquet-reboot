import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StickyFooter, StickyHeader } from "../navbar";
import { Grid } from "@mui/material";

import BgImg from "../../assets/images/bg_purple.jpg";

function LogedPageTemplate(params) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { 
    if (localStorage.getItem("auth") === null) {
      localStorage.clear();
      navigate("/login");
      alert("로그인이 안돼있네요...?");
    }
    console.log(location);

    // 방문여부를 검사하는 로직
  }, [navigate, location]);

  useEffect(() => {
    if (localStorage.getItem("userId") === undefined) {
      localStorage.setItem("userId", "string");
    }
  }, []);

  return (
    <Grid container>
    <Grid item sm={1} md={2}></Grid>
    <Grid
      item
      xs={12}
      sm={10}
      md={8}
      style={{
        // backgroundColor: "#EDEBE9",
        backgroundImage: `url(${BgImg})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        height: "auto",
        paddingBottom: "65px",
      }}
    >
      <StickyHeader />
      <StickyFooter />
      {params?.children}
    </Grid>
    <Grid item sm={1} md={2}></Grid>
  </Grid>
  );
}

export default LogedPageTemplate;
