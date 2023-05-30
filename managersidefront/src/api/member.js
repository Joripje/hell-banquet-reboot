import http from "./http.js";

const api = http;

api.defaults.headers["Authorization"] = localStorage.getItem("auth");
api.defaults.headers["refreshToken"] = localStorage.getItem("refresh");

async function login(user, success, fail) {
  await api.post(`/auth/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function signup(user, success, fail) {
  await api
    .post(`/users/register`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

async function excelUpload(xls, success, fail) {
  const formData = new FormData();
  formData.append("xls", xls);

  api.defaults.headers["Authorization"] = localStorage.getItem("auth");
  api.defaults.headers["refreshToken"] = localStorage.getItem("refresh");
  api.defaults.headers["Content-Type"] = "multipart/form-data";

  await api.post(`/managers/register/all`, formData).then(success).catch(fail);
}

export { login, signup, excelUpload };
