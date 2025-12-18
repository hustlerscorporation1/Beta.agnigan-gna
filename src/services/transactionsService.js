import { apiClient } from "./apiClient";

export const transactionsService = {
  list: (page = 1, limit = 20, status) =>
    apiClient.get("transactions", { params: { page, limit, status} }),
  statistics: () => apiClient.get("transactions/statistics"),
  getById: (id) => apiClient.get(`transactions/${id}`),
  create: (data) => apiClient.post("transactions", { body: data }),
  update: (id, data) => apiClient.put(`transactions/${id}`, { body: data }),
};
