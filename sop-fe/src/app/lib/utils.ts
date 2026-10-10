import https from "node:https";
import axios from "axios";
import { LANGUAGES, THEMES } from "@/app/lib/configs";

const client = axios.create({
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
  delete: <T>(url: string) => client.delete<T>(url).then((res) => res.data),
};

export const isActive = (pathname: string, value: string) =>
  value === "/" ? pathname === "/" : `${pathname}/`.startsWith(value);

export const LANGUAGE_CODES = LANGUAGES.map((lang) => lang.code);

export const LANGUAGE_DEFAULT_CODE = LANGUAGES[0].code;

export const THEME_DEFAULT_ICON = THEMES[0].icon;

export const THEME_DEFAULT_MODE = THEMES[0].mode;

export const THEME_MODES = THEMES.map((t) => t.mode);
