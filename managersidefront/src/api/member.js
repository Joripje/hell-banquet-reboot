import http from "./http.js";

const api = http;

async function login(user, success, fail) {
    await api.post(`/auth/login`, JSON.stringify(user)).then(success).catch(fail);
  }

async function signup(user, success, fail) {
    await api.post(`/users/register`, JSON.stringify(user)).then(success).catch(fail)
}

async function excelUpload(success, fail) {
  const user = [{
    "managerId": "mmy678",
    "type": "B",
    "date": "230327",
    "category": "한식",
    "feature": "meet",
    "menuItems": ["잡곡밥", "콩나물국", "배추김치", "돈까스", "콩나물무침"],
    "menuTypes": ["밥", "국", "김치", "튀김", "나물"]
}]
    await api.post(`/menus/convert`, JSON.stringify(user)).then(success).catch(fail)
}

export { login, signup, excelUpload }