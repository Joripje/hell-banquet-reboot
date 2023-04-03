import http from "./https.js";

const api = http;

async function signup(data, success, fail) {
  await api
    .post(`/users/register`, JSON.stringify(data))
    .then(success)
    .catch(fail);
}

async function checkUnique(user, success, fail) {
  await api.get(`/auth/login`, JSON.stringify(user)).then(success).catch(fail);
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

export {
  signup,
  checkUnique,
  getUserInfo,
  updateUserInfo,
  updateUserPassword,
  findUserPassword,
  deleteUser,
  userFirst,
};
