import axios from "axios";

// axios 객체 생성
export default axios.create({
//   baseURL: "https://ssafy.cossafyco.kro.kr/api/",
  baseURL: "http://70.12.247.183:8010/",

  headers: {
    "Content-Type": "application/json",
  },
});