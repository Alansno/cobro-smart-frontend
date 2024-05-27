import axios from 'axios';

const API_URL = 'http://localhost:3000/account';

export const addAccounts = async (nameAccount,token) => {
    const newToken = token;
  const headers = {
    Authorization: `Bearer ${newToken}`,
  };

const {data} = await axios.post(`${API_URL}/create`,nameAccount, { headers })
  return data
}