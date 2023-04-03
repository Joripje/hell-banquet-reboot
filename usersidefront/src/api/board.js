import http from "./https.js";

const api = http;

api.defaults.headers["Authorization"] = localStorage.getItem("auth");
api.defaults.headers["refreshToken"] = localStorage.getItem("refreshToken");

async function getBoardList(params, success, fail) {
  const res = await api
    .get(`/boards`, { params: params })
    .then(success)
    .catch(fail);
  return res;
}

async function getEntireList(params, success, fail) {
  const res = await api
    .get(`/boards/list`, { params: { ...params, userId: "string" } })
    .then(success)
    .catch(fail);
  return res;
}

async function putArticle(article, success, fail) {
  await api.post(`/boards`, JSON.stringify(article)).then(success).catch(fail);
}

async function updateArticle(article, success, fail) {
  await api.put(`/boards`, JSON.stringify(article)).then(success).catch(fail);
}

async function getArticleDetail(detail, success, fail) {
  const { id, getForm } = detail;
  const res = await api
    .get(`/boards/${id}/`, { params: getForm })
    .then(success)
    .catch(fail);
  return res;
}

async function getTodayArticle(date, success, fail) {
  const res = await api
    .get(`/boards/today`, { params: { date: date } })
    .then(success)
    .catch(fail);
  return res;
}

async function putComment(comment, success, fail) {
  await api
    .post(`/comments`, JSON.stringify(comment))
    .then(success)
    .catch(fail);
}

async function putLike(data, success, fail) {
  const { boardId, userId } = data;
  console.log(data);
  await api
    .put(`/boards/${boardId}/like`, JSON.stringify({ userId: userId }))
    .then(success)
    .catch(fail);
}

async function putDisLike(data, success, fail) {
  const { boardId, userId } = data;
  await api
    .put(`/boards/${boardId}/dislike`, JSON.stringify({ userId: userId }))
    .then(success)
    .catch(fail);
}

async function test(success, fail) {
  await api.get(`/menus`).then(success).catch(fail);
}

export {
  getBoardList,
  getEntireList,
  putArticle,
  updateArticle,
  getArticleDetail,
  getTodayArticle,
  putComment,
  putLike,
  putDisLike,
  test,
};
