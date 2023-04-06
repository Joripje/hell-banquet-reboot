import http from "./https.js";

const api = http;


async function getJanbanImg(janbanCode, success, fail) {
  api.defaults.headers["Authorization"] = localStorage.getItem("auth");
  api.defaults.headers["refreshToken"] = localStorage.getItem("refresh");
  const res = await api
    .get(`/janban`, { params: janbanCode })
    .then(success)
    .catch(fail);
  return res;
}

async function putJanbanImg(info, success, fail) {
  await api.put(`/janban`, JSON.stringify(info)).then(success).catch(fail);
}

async function getJanbanBoolean(info, success, fail) {
  const res = await api
    .get(`/janban/hasJanbani`, { params: info })
    .then(success)
    .catch(fail);
  return res;
}
async function putJanbanItem(info, success, fail) {
  const res = await api
    .put(`/janban/updateJanbani`, JSON.stringify(info))
    .then(success)
    .catch(fail);
  return res;
}

export { getJanbanImg, putJanbanImg, getJanbanBoolean, putJanbanItem };
