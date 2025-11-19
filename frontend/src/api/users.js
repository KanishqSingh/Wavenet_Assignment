// src/api/users.js
import { request } from "./api.js";
export const getUsers = (token, page = 1) => request(`/users?page=${page}`, "GET", undefined, token);
export const createUser = (data, token) => request("/users", "POST", data, token);
export const updateUserRole = (id, role, token) => request(`/users/${id}`, "PUT", { role }, token);
export const deleteUser = (id, token) => request(`/users/${id}`, "DELETE", undefined, token);
