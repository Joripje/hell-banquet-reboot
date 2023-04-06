import http from "./https.js";

const api = http;

async function signup(data, success, fail) {
  await api
    .post(`/users/register`, JSON.stringify(data))
    .then(success)
    .catch(fail);
}

async function checkUnique(info, success, fail) {
  await api.get(`/users/check`, {params : info}).then(success).catch(fail);
}

async function getUserInfo(user, success, fail) {
  const res = await api
    .get(`/users/info/${user}`, JSON.stringify(user))
    .then(success)
    .catch(fail);
  return res;
}

async function updateUserInfo(user, success, fail) {
  await api
    .put(`/users/info/${user.userId}`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

async function updateUserPassword(user, success, fail) {
  await api.put(`/users/pw`, JSON.stringify(user)).then(success).catch(fail);
}

async function findUserPassword(user, success, fail) {
  await api.post(`/users/pw`, JSON.stringify(user)).then(success).catch(fail);
}

async function deleteUser(user, success, fail) {
  await api.delete(`/users/info/${user.id}`).then(success).catch(fail);
}

async function userFirst(user, success, fail) {
  await api
    .delete(`/users/visited`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

// 매니저 전용기능
async function excelUpload(xls, success, fail) {
  const formData = new FormData();
  formData.append("xls", xls);

  api.defaults.headers["Authorization"] = localStorage.getItem("auth");
  api.defaults.headers["refreshToken"] = localStorage.getItem("refresh");
  api.defaults.headers["Content-Type"] = "multipart/form-data";

  await api.post(`/managers/register/all`, formData).then(success).catch(fail);
}

export {
  signup,
  checkUnique,
  getUserInfo,
  updateUserInfo,
  updateUserPassword,
  findUserPassword,
  deleteUser,
  userFirst,
  excelUpload,
};
