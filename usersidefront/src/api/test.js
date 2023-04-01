import http from "./https.js";

const api = http;

// url이 auth인지 users인지 모르겠어용
async function asd(user, success, fail) {
  await api.post(`/auth/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function dfg(success, fail) {
    api.defaults.headers["Authorization"] = localStorage.getItem("auth")
    api.defaults.headers["refreshToken"] = localStorage.getItem("refresh")
  
    await api.post(`/auth/logout`, ).then(success).catch(fail);
  }

  export {  }