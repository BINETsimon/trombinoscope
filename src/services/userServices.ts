import axios, { AxiosResponse } from 'axios';
import { Credentials, User, UserResponse } from '../store/interfaces/userState';

const BASE_URL = import.meta.env.VITE_API_URL;

export const userServiceLogin = async (credentials: Credentials): Promise<User> => {
  console.log('response');
  const response: AxiosResponse<UserResponse> = await axios.post(`${BASE_URL}/auth/login`, credentials);
  
  localStorage.setItem('token', response.data.token);
  console.log(response);

  return response.data.data;
};

export const userServiceSignup = async (body: User): Promise<User> => {
  console.log(body);

  const response: AxiosResponse<UserResponse> = await axios.post(`${BASE_URL}/auth/signup`, body);
  console.log(response);
  
  localStorage.setItem('token', response.data.token);

  return response.data.data;
};

export const userServiceGetMe = async (): Promise<User | null> => {

  if(localStorage.getItem('token')) {
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      });
    
    const response: AxiosResponse<User | null> = await axios.get(`${BASE_URL}/me`);
    
    return response.data;
  } else{
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};