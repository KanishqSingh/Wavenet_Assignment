// src/api/invoices.js
import { request } from "./api.js";
export const getInvoices = (token, page = 1, filters = {}) => {
  const params = new URLSearchParams({ page, ...filters }).toString();
  return request(`/invoices?${params}`, "GET", undefined, token);
};
export const createInvoice = (data, token) => request("/invoices", "POST", data, token);
export const updateInvoice = (number, data, token) => request(`/invoices/${number}`, "PUT", data, token);
export const deleteInvoices = (invoiceNumbers, token) => request("/invoices/delete", "POST", { invoiceNumbers }, token);
