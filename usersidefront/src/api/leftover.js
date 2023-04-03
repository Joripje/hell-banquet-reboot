import http from "./https.js";

const api = http;

api.defaults.headers["Authorization"] = localStorage.getItem("auth");
api.defaults.headers["refreshToken"] = localStorage.getItem("refresh");

async function getDailyRank(user, success, fail) {
  const res = await api
    .get(`/leftovers/ranking`, { params: user })
    .then(success)
    .catch(fail);
  return res;
}

async function getLeftoverData(date, success, fail) {
  await api
    .get(`/leftovers/analysis`, { params: date })
    .then(success)
    .catch(fail);
}

// FastAPI로 사진을 보내는 POST 요청이 필요합니다
async function sendLeftoverImg(leftover, success, fail) {
  const formData = new FormData();
  formData.append(
    "board",
    new Blob([JSON.stringify(leftover)], { type: "application/json" })
  );
  formData.append("file", leftover.img);

  api.defaults.headers["Content-Type"] = "multipart/form-data";
  await api.post(`?????`, formData).then(success).catch(fail);
}

async function sendLeftoverData(leftover, success, fail) {
  await api
    .post(`/leftovers/register`, JSON.stringify(leftover))
    .then(success)
    .catch(fail);
}

export { getDailyRank, getLeftoverData, sendLeftoverImg, sendLeftoverData };
