import axios from 'axios';

const API_URL = 'http://localhost:3000/registration-service';


export const addRecord = async (record,token) => {
  const newToken = token;
    const headers = {
      Authorization: `Bearer ${newToken}`,
    };
  
  const {data} = await axios.post(`${API_URL}/create`, record, { headers })
    return data
}  