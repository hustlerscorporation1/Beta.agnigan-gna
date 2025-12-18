import { apiClient } from "./apiClient";

export const statsService = {
  properties: () => apiClient.get("properties/statistics"),
  users: () => apiClient.get("users/statistics"),
  contacts: () => apiClient.get("contacts/statistics"),
  transactions: () => apiClient.get("transactions/statistics"),
};
