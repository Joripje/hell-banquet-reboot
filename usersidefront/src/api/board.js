import http from "./https.js";

const api = http;

async function getBoardList(params, success, fail) {
    api.defaults.headers["refreshToken"] = localStorage.getItem("refreshToken")

    const res = await api.get(`/boards`, {params: {...params, userId: 'string'}}).then(success).catch(fail);
    return res
}

async function getEntireList(params, success, fail) {
    api.defaults.headers["refreshToken"] = localStorage.getItem("refreshToken")

    const res = await api.get(`/boards/list`, {params: {...params, userId: 'string'}}).then(success).catch(fail);
    return res
}

async function putArticle(article, success, fail) {
    api.defaults.headers["refreshToken"] = localStorage.getItem("refreshToken")

    await api.post(`/boards`, JSON.stringify(article)).then(success).catch(fail);
}

async function getCommentList(id, success, fail) {
    const res = await api.get(`/boards/${id}/comments`, ).then(success).catch(fail);
    return res
}

async function getTodayArticle(date, success, fail) {
    api.defaults.headers["refreshToken"] = localStorage.getItem("refreshToken")

    const res = await api.get(`/boards/today`, {params: {date: date}}).then(success).catch(fail);
    return res
}

async function putLike(data, success, fail) {
    const { boardId, userId } = data
    await api.put(`/boards/${boardId}/like`, JSON.stringify({userId: userId})).then(success).catch(fail);
}

async function putDisLike(data, success, fail) {
    const { boardId, userId } = data
    await api.put(`/boards/${boardId}/dislike`, JSON.stringify({userId: userId})).then(success).catch(fail);
}


async function test(success, fail) {
    api.defaults.headers["Authorization"] = localStorage.getItem("auth")
    api.defaults.headers["refreshToken"] = localStorage.getItem("refresh")
    await api.get(`/menus`).then(success).catch(fail);
}


export { getBoardList, getEntireList, putArticle, getCommentList, getTodayArticle, putLike, putDisLike, test }