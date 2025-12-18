// Simple API client using fetch with a base URL from env
const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001/api/v1";

const defaultHeaders = {
  "Content-Type": "application/json",
};

async function request(method, path, { params, body, headers, signal } = {}) {
  const url = new URL(path.replace(/^\//, ""), BASE_URL.endsWith("/") ? BASE_URL : BASE_URL + "/");

  if (params && typeof params === "object") {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const res = await fetch(url.toString(), {
    method,
    headers: { ...defaultHeaders, ...(headers || {}) },
    body: body ? JSON.stringify(body) : undefined,
    signal,
    credentials: "include",
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  if (!res.ok) {
    const errorPayload = isJson ? await res.json().catch(() => ({})) : await res.text();
    const err = new Error(`Request failed: ${res.status} ${res.statusText}`);
    err.status = res.status;
    err.payload = errorPayload;
    throw err;
  }

  return isJson ? res.json() : res.text();
}

export const apiClient = {
  get: (path, options) => request("GET", path, options),
  post: (path, options) => request("POST", path, options),
  put: (path, options) => request("PUT", path, options),
  delete: (path, options) => request("DELETE", path, options),
  baseUrl: BASE_URL,
};
