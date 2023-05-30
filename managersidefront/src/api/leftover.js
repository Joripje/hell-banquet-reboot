import http from "./http.js";

const api = http;

api.defaults.headers["Authorization"] = localStorage.getItem("auth");
api.defaults.headers["refreshToken"] = localStorage.getItem("refresh");

async function getAnalysis(data, success, fail) {
  const res = await api
    .get(`/leftovers/analysis`, { params: data })
    .then(success)
    .catch(fail);
  return res;
}

export { getAnalysis };
