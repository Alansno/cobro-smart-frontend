import { useQuery } from 'react-query';
import axios from 'axios';
import useAuthProvider from '../store/AuthProvider';

const API_URL = 'http://localhost:3000/client';

export function useClients() {
  const { token } = useAuthProvider();
  return useQuery('clients', () => clients(token));
}

function clients(token) {

    const newToken = token;
    const headers = {
      Authorization: `Bearer ${newToken}`,
    };
  
    return axios.get(`${API_URL}/get-clients`, { headers })
      .then((response) => { 
       return response.data
    })
      .catch((error) => {
        throw new Error('Inicio de sesión fallido: ' + error.message);
      })
}

export const addClient = async (token,client) => {
  const newToken = token;
  const headers = {
    Authorization: `Bearer ${newToken}`,
  };

const {data} = await axios.post(`${API_URL}/create`,client, { headers })
  return data
}

export const getClients = async (token) => {
  const newToken = token;
  const headers = {
    Authorization: `Bearer ${newToken}`,
  };

const {data} = await axios.get(`${API_URL}/get-clients`, { headers })
  return data
}

export const deleteClient = async (id,token) => {
  const newToken = token;
  const headers = {
    Authorization: `Bearer ${newToken}`,
  };

const {data} = await axios.delete(`${API_URL}/client/soft-delete-client/${id}`, { headers })
  return data
}