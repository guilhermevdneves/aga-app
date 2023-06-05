import { api } from "./apiConnector"

export const getUserDetails = async (authToken, id) => {
  return await api.get(`/user/${id}`, { headers: { Authorization: authToken.token } });
}


