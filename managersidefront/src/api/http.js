import axios from "axios";

// axios 객체 생성
export default axios.create({
  // baseURL: "http://j8a802.p.ssafy.io:8000/",
  baseURL: "http://70.12.245.187:8040/",

  headers: {
    "Content-Type": "application/json",
  },
});