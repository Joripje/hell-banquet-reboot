import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "http://70.12.247.183:8000/",

  headers: {
    "Content-Type": "application/json",
  },
});