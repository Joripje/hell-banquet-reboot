import http from "./https.js";

const api = http;

async function login(user, success, fail) {
    await api.post(`/member/login`, JSON.stringify(user)).then(success).catch(fail);
  }


export { login }