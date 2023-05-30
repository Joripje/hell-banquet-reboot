import http from "./http.js";

const api = http;

api.defaults.headers["Authorization"] = localStorage.getItem("auth");
api.defaults.headers["refreshToken"] = localStorage.getItem("refresh");

async function getMenuByDate(data, success, fail) {
  const res = await api
    .get(`/menus/date`, { params: data })
    .then(success)
    .catch(fail);
  return res;
}

export { getMenuByDate };
