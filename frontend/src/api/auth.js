// src/api/auth.js
import { request } from "./api.js";
export const loginApi = (body) => request("/auth/login", "POST", body);
