import { apiClient } from "./apiClient";

export const propertiesService = {
  list: (params) => apiClient.get("properties", { params }),
  statistics: () => apiClient.get("properties/statistics"),
  mostViewed: (limit) => apiClient.get("properties/most-viewed", { params: { limit } }),
  recent: (limit) => apiClient.get("properties/recent", { params: { limit } }),
  getById: (id) => apiClient.get(`properties/${id}`),
  create: (data) => apiClient.post("properties", { body: data }),
  update: (id, data) => apiClient.put(`properties/${id}`, { body: data }),
  remove: (id) => apiClient.delete(`properties/${id}`),
};
