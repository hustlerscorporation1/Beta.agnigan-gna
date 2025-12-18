import { apiClient } from "./apiClient";

export const contactsService = {
  list: (page = 1, limit = 20, status) =>
    apiClient.get("contacts", { params: { page, limit, status } }),
  statistics: () => apiClient.get("contacts/statistics"),
  getById: (id) => apiClient.get(`contacts/${id}`),
  create: (data) => apiClient.post("contacts", { body: data }),
  update: (id, data) => apiClient.put(`contacts/${id}`, { body: data }),
  remove: (id) => apiClient.delete(`contacts/${id}`),
};
