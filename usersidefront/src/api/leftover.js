import http from "./https.js";

const api = http;

api.defaults.headers["Authorization"] = localStorage.getItem("auth");
api.defaults.headers["refreshToken"] = localStorage.getItem("refresh");

async function getLeftover(info, success, fail) {
  await api
    .get(`/leftovers`, { params: info })
    .then(success)
    .catch(fail);
}


async function getLeftoverData(date, success, fail) {
  await api
    .get(`/leftovers/analysis`, { params: date })
    .then(success)
    .catch(fail);
}

async function getCookieGameInfo(info, success, fail) {
  await api
    .get(`/leftovers/cookie/check`, { params: info })
    .then(success)
    .catch(fail);
}

async function putDrawingGameInfo(info, success, fail) {
  await api
    .put(`/leftovers/drawing`, JSON.stringify(info))
    .then(success)
    .catch(fail);
}

async function getDrawingGameInfo(info, success, fail) {
  await api
    .get(`/leftovers/drawing/check`, { params: info })
    .then(success)
    .catch(fail);
}

async function getDailyRank(user, success, fail) {
  const res = await api
    .get(`/leftovers/ranking`, { params: user })
    .then(success)
    .catch(fail);
  return res;
}

async function sendLeftoverData(leftover, success, fail) {
  await api
    .post(`/leftovers/register`, JSON.stringify(leftover))
    .then(success)
    .catch(fail);
}

export { getLeftover, getCookieGameInfo, getDailyRank, getLeftoverData, sendLeftoverData, putDrawingGameInfo, getDrawingGameInfo };
