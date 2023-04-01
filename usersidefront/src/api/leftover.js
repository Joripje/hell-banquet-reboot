import http from "./https.js";

const api = http;

async function dailyRank(user, success, fail) {
    api.defaults.headers["Authorization"] = localStorage.getItem("auth")
    api.defaults.headers["refreshToken"] = localStorage.getItem("refresh")
    await api.get(`/leftovers/ranking`, {params: user}).then(success).catch(fail);
}

export { dailyRank }