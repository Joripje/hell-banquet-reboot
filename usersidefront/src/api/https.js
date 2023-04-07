import axios from "axios";

// axios 객체 생성
export default axios.create({
  // baseURL: "http://70.12.247.187:8000/",
  baseURL: "https://j8a802.p.ssafy.io/api/",
  // baseURL: "http://j8a802.p.ssafy.io:8000/",

  headers: {
    "Content-Type": "application/json",
  },
});
