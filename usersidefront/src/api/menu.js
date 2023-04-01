import http from "./https.js";

const api = http;

async function getMenus(success, fail) {
    await api.get(`/menus`, ).then(success).catch(fail);
}
  
  
export { getMenus, }