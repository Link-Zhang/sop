export const serverFetcher = {
  get: <T>(url: string): Promise<T> =>
    fetch(url, {
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json()),

  post: <T, D = unknown>(url: string, data: D): Promise<T> =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  put: <T, D = unknown>(url: string, data: D): Promise<T> =>
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  patch: <T, D = unknown>(url: string, data: D): Promise<T> =>
    fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  delete: <T>(url: string): Promise<T> =>
    fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json()),
};
