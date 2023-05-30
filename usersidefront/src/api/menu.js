import http from "./https.js";

const api = http;
api.defaults.headers["Authorization"] = localStorage.getItem("auth");
api.defaults.headers["refreshToken"] = localStorage.getItem("refresh");

async function getMenus(success, fail) {
  await api.get(`/menus`).then(success).catch(fail);
}

async function getSingleMenu(id, success, fail) {
  const res = await api.get(`/menus/${id}`).then(success).catch(fail);
  return res;
}

async function deleteSingleMenu(id, success, fail) {
  await api.delete(`/menus/${id}`).then(success).catch(fail);
}

async function createMenus(menu, success, fail) {
  await api.post(`/menus`, JSON.stringify(menu)).then(success).catch(fail);
}

async function getMenusByDate(data, success, fail) {
  api.defaults.headers["Authorization"] = localStorage.getItem("auth");
  api.defaults.headers["refreshToken"] = localStorage.getItem("refresh");
  const res = await api
    .get(`/menus/date`, { params: data })
    .then(success)
    .catch(fail);
  return res;
}

async function getMenusByType(data, success, fail) {
  await api.get(`/menus/type`, { params: data }).then(success).catch(fail);
}

export {
  getMenus,
  getSingleMenu,
  deleteSingleMenu,
  createMenus,
  getMenusByDate,
  getMenusByType,
};
