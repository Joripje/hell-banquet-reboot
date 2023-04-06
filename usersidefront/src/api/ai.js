import axios from "axios";

const api = axios.create({
  baseURL: "https://j8a802.p.ssafy.io:5000/",

  headers: {
    "Content-Type": "application/json",
  },
});

api.defaults.headers["Authorization"] = localStorage.getItem("auth");
api.defaults.headers["refreshToken"] = localStorage.getItem("refresh");

// FastAPI로 사진을 보내는 POST 요청이 필요합니다
async function postRecordMeal(leftover, success, fail) {
  const formData = new FormData();
  const response = await fetch(leftover);
  const blob = await response.blob();
  formData.append("image", blob);

  api.defaults.headers["Content-Type"] = "multipart/form-data";
  const res = await api.post(`/ai/janban`, formData).then(success).catch(fail);
  return res;
}

export { postRecordMeal };
