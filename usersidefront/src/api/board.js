import http from "./https.js";

const api = http;


async function getBoardList(parameters, success, fail) {
    const { lastBoardId, size } = parameters
    const res = await api.get(`/boards`, {params: {lastBoardId: lastBoardId, size: size}}).then(success).catch(fail);
    return res
}

async function putArticle(body, success, fail) {
    await api.post(`/boards`, JSON.stringify(body)).then(success).catch(fail);
}

async function getCommentList(parameters, success, fail) {
    const { boardId } = parameters
    const res = await api.get(`/boards/${boardId}/comments`, {params : {boardId: boardId, }}).then(success).catch(fail);
    return res
}


export { getBoardList, putArticle, getCommentList }