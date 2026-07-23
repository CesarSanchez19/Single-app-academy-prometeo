let currentToken = null;

export const setApiToken = (token) => {
  currentToken = token;
};

export const getApiToken = () => {
  return currentToken;
};

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export class ApiError extends Error {
  constructor(message, statusCode, code = "UNKNOWN_ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

async function request(path, { method = "GET", body, headers = {}, ...options } = {}) {
  const token = getApiToken();

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    ...options,
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 && path !== "/auth/refresh") {
      setApiToken(null);
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        if (json.code === "SESSION_REVOKED") {
          window.location.href = "/login?reason=session-revoked";
        } else {
          window.location.href = "/login";
        }
      }
    }

    throw new ApiError(
      json.message || "Server Error",
      response.status,
      json.code || "UNKNOWN_ERROR"
    );
  }

  return json.data;
}

export const apiClient = {
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) => request(path, { ...options, method: "POST", body }),
  patch: (path, body, options) => request(path, { ...options, method: "PATCH", body }),
  put: (path, body, options) => request(path, { ...options, method: "PUT", body }),
  delete: (path, options) => request(path, { ...options, method: "DELETE" }),
};