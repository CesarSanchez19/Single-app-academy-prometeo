import { apiClient } from "./apiClient.js";

export const checkHealth = () => {
  const controller = new AbortController();
  const call = apiClient.get("/health", { signal: controller.signal });
  return { call, controller };
};