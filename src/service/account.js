import axios from 'axios';

const API_URL = 'http://localhost:3000/user-data';

export const addAccount = async (account,token) => {
    const newToken = token;
  const headers = {
    Authorization: `Bearer ${newToken}`,
  };

const {data} = await axios.post(`${API_URL}/create`,account, { headers })
  return data
}