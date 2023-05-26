import { api } from "./apiConnector"

export const getDates = async (authToken) => {
  return await api.get('/dates', { headers: { Authorization: authToken.token } });
}


export const addDate = async (authToken, data) => {
  return await api.put('/dates', data, { headers: { Authorization: authToken.token } });
}