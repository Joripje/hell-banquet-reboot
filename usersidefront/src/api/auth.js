import http from "./https.js";

const api = http;

api.defaults.headers["Authorization"] = localStorage.getItem("auth");
api.defaults.headers["refreshToken"] = localStorage.getItem("refresh");

async function login(user, success, fail) {
  await api.post(`/auth/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function logout(success, fail) {
  await api.post(`/auth/logout`).then(success).catch(fail);
}

async function validateUser(user, success, fail) {
  await api
    .post(`/auth/validate`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

export { login, logout, validateUser };
