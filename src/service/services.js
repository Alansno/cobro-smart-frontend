import { useQuery } from 'react-query';
import axios from 'axios';
import useAuthProvider from '../store/AuthProvider';

const API_URL = 'http://localhost:3000/services';


export const getServiceId = async (id,token) => {
    const newToken = token;
  const headers = {
    Authorization: `Bearer ${newToken}`,
  };

const {data} = await axios.get(`${API_URL}/get-service/${id}`, { headers })
  return data;
}

export const addService = async (token,service) => {
  const newToken = token;
  const headers = {
    Authorization: `Bearer ${newToken}`,
  };

const {data} = await axios.post(`${API_URL}/create`,service, { headers })
  return data;
}

export const getServices = async (token) => {
  const newToken = token;
  const headers = {
    Authorization: `Bearer ${newToken}`,
  };

const {data} = await axios.get(`${API_URL}/all-services`, { headers })
  return data;
}

export const getServicesClient = async (id,token) =>{
  
  const newToken = token;
  const headers = {
    Authorization: `Bearer ${newToken}`,
  };

const {data} = await axios.get(`${API_URL}/services-client/${id}`, { headers })
  return data
}

export const getRecordsId = async (id,token) =>{
  
  const newToken = token;
  const headers = {
    Authorization: `Bearer ${newToken}`,
  };

const {data} = await axios.get(`${API_URL}/records-service/${id}`, { headers })
  return data
}