// src/api/api.js
export const API_BASE = "http://localhost:5000/api";

export const request = async (url, method = "GET", body = undefined, token = undefined) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(API_BASE + url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  // try to parse json
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    // bubble up error message if present
    const message = json?.message || res.statusText || "Request failed";
    throw new Error(message);
  }
  return json;
};
