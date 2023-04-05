import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StickyFooter, StickyHeader } from "../navbar";

function LogedPageTemplate() {
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
    <>
      <StickyHeader />
      <StickyFooter />
    </>
  );
}

export default LogedPageTemplate;
