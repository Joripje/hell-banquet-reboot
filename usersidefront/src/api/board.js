import http from "./https.js";

const api = http;


async function getBoardList(params, success, fail) {
    const res = await api.get(`/boards`, {params: params}).then(success).catch(fail);
    return res
}

async function putArticle(body, success, fail) {
    await api.post(`/boards`, JSON.stringify(body)).then(success).catch(fail);
}

async function getCommentList(id, success, fail) {
    const res = await api.get(`/boards/${id}/comments`, ).then(success).catch(fail);
    return res
}

async function test(success, fail) {
    await api.get(`/menus`).then(success).catch(fail);
}


export { getBoardList, putArticle, getCommentList, test }