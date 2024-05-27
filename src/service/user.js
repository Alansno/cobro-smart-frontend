import axios from 'axios';

const API_URL = 'http://localhost:3000/user';

export const getProfile = async (token) => {
    const newToken = token;
  const headers = {
    Authorization: `Bearer ${newToken}`,
  };

const {data} = await axios.get(`${API_URL}/data-user`, { headers })
  return data
}