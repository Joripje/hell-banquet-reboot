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

async function sendLeftoverData(leftover, success, fail) {
  await api
    .post(`/leftovers/register`, JSON.stringify(leftover))
    .then(success)
    .catch(fail);
}

export { getDailyRank, getLeftoverData, sendLeftoverData };
