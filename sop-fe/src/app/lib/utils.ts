import https from "node:https";
import axios from "axios";

const DATE_LOCALE = "lt-LT";

export const client = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  timeout: 10000,
});

export const fetcher = {
  post: <T, D = unknown>(url: string, data?: D) =>
    client.post<T>(url, data).then((res) => res.data),
  get: <T>(url: string) => client.get<T>(url).then((res) => res.data),
  patch: <T, D = unknown>(url: string, data?: D) =>
    client.patch<T>(url, data).then((res) => res.data),
  put: <T, D = unknown>(url: string, data?: D) =>
    client.put<T>(url, data).then((res) => res.data),
  delete: <T>(url: string) => client.delete<T>(url).then((res) => res.data),
};

export const getCurrentDate = () => new Date().toLocaleDateString(DATE_LOCALE);

export const getCurrentYear = () => new Date().getFullYear();
