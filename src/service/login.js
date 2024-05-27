import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import useAuthProvider from '../store/AuthProvider';

const API_URL = 'http://localhost:3000/auth';

export default function useLogin() {
    const {login,addUser} = useAuthProvider();
    return useMutation((credentials) => loginUser(credentials, login, addUser));
}

export function useLogout() {
  const {token} = useAuthProvider();
  return useMutation(() => logout(token));
}

export function useDataUser() {
  const {token} = useAuthProvider();
  return useQuery('getUser', () => getUser(token));
}

export function useRegister() {
  return useMutation((credentials) => registerUser(credentials))
}

function loginUser({ username, password }, login, addUser) {
    return axios.post(`${API_URL}/sing-in`, { username, password })
      .then((response) => {
        const token = response.data.message.jwt;
        const user = response.data.message.user;
        if (token) {
          login(token) 
          addUser(user)
        }
        return response.data;
      })
      .catch((error) => {
        throw new Error('Inicio de sesión fallido: ' + error.message);
      });
  }

  export const autenticate = async (credentials) => {
   
  const {data} = await axios.post(`${API_URL}/sing-in`,credentials)
    return data
  }

  export const singUp = async (body) => {
   
    const {data} = await axios.post(`${API_URL}/sing-up`,body)
      return data
    }

  function registerUser({username, nameCompany, addressCompany, rfc, emailCompany, phoneCompany, typeIndustry, password}) {
    return axios.post(`${API_URL}/sing-up`, { username, nameCompany, addressCompany, rfc, emailCompany, phoneCompany, typeIndustry, password })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        throw new Error('Inicio de sesión fallido: ' + error.message);
      });
  }

  function logout(token) {

    const newToken = token; 
    const headers = {
      Authorization: `Bearer ${newToken}`, 
    };
  
    return axios.post(`${API_URL}/user/logout`, null,{ headers })
      .then((response) => { 
      response.data
    })
      .catch((error) => {
        throw new Error('Cierre de sesión fallido: ' + error.message);
      })
  }

  const getUser = async (token) => {
    const newToken = token;
    const headers = {
      Authorization: `Bearer ${newToken}`,
    };
  
    return axios.get(`${API_URL}/user/get-userdata`, { headers })
      .then((response) => { 
       return response.data
    })
      .catch((error) => {
        throw new Error('Inicio de sesión fallido: ' + error.message);
      })
  }
