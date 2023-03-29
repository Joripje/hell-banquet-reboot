import http from "./https.js";

const api = http;

// url이 auth인지 users인지 모르겠어용
async function login(user, success, fail) {
  await api.post(`/auth/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function signup(user, success, fail) {
  await api.post(`/users/register`, JSON.stringify(user)).then(success).catch(fail);
}

async function getUserInfo(user, success, fail) {
  const res = await api.get(`/users/info/${user}`, JSON.stringify(user)).then(success).catch(fail);
  return res
}

async function updateUserInfo(user, success, fail) {
  await api.put(`/users/info/${user.userId}`, JSON.stringify(user)).then(success).catch(fail);
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
  await api.delete(`/users/visited`, JSON.stringify(user)).then(success).catch(fail);
}


export { login, signup, getUserInfo, updateUserInfo, updateUserPassword, findUserPassword, deleteUser, userFirst }