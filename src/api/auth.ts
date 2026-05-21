import { apiClient } from "./apiClient";
import ENDPOINTS from "./endpoints";

export function userLogin(data: { email: string; password: string }) {
  return apiClient.post(ENDPOINTS.USER_LOGIN, data).then(res => res.data)
}