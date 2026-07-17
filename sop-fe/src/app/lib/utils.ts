import https from "node:https";
import axios, { type AxiosError } from "axios";

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/app/lib/i18n/i18n";

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
  // put: <T, D = unknown>(url: string, data?: D) =>
  //   client.put<T>(url, data).then((res) => res.data),
  delete: <T>(url: string) => client.delete<T>(url).then((res) => res.data),
};

export const formatDate = (date: string | Date, language: string): string => {
  const locale =
    SUPPORTED_LOCALES.find((item) => item.code === language)?.locale ??
    DEFAULT_LOCALE;

  return new Intl.DateTimeFormat(locale).format(new Date(date));
};

export const getCurrentYear = () => new Date().getFullYear();

export const retryHandler = (failureCount: number, error: unknown) => {
  const status = (error as AxiosError).response?.status;
  if (status && 400 <= status && status < 500) return false;
  return failureCount <= 2;
};
