import { apiClient } from "./apiClient";

export const usersService = {
  list: (page = 1, limit = 20) =>
    apiClient.get("users", { params: { page, limit } }),
  statistics: () => apiClient.get("users/statistics"),
  getById: (id) => apiClient.get(`users/${id}`),
  update: (id, data) => apiClient.put(`users/${id}`, { body: data }),
  remove: (id) => apiClient.delete(`users/${id}`),
};
