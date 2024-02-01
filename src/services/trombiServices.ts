import axios, { AxiosResponse } from 'axios';
import { PictureState, TrombiState } from '../store/interfaces/trombiState';

const BASE_URL = import.meta.env.VITE_API_URL + '/trombi';

export const trombiServiceGetAll = async (): Promise<PictureState | null> => {

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
    
    const response: AxiosResponse<PictureState | null> = await axios.get(`${BASE_URL}`);
    
    return response.data;
  } else{
    return null;
  }
};

export const trombiServiceLoadPictures = async (trombi: TrombiState): Promise<TrombiState | null> => {
  if (localStorage.getItem('token')) {
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

    const updatedFiles = await Promise.all(trombi.files.map(async (file) => {
      if (!file.local_url) {
        const response: AxiosResponse<Blob> = await axios.get(`${BASE_URL}/${file.picture_url}`, { responseType: 'blob' });
        file.local_url = URL.createObjectURL(response.data);
      }
      return file;
    }));

    // Créez une nouvelle instance de TrombiState avec les fichiers mis à jour
    const updatedTrombi: TrombiState = {
      ...trombi,
      files: updatedFiles,
    };

    return updatedTrombi;
  } else {
    return null;
  }
};

export const trombiServiceUploadOne = async (file: File): Promise<PictureState | null> => {
  if (localStorage.getItem('token')) {
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

    const formData = new FormData();
    formData.append('file', file);
      
    const response: AxiosResponse = await axios.post(`${BASE_URL}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data; charset=utf-8',
      }
    });

    return response.data.file;
  }else {
    return null;
  }
};

export const trombiServiceDeleteOne = async (file: PictureState) => {
  if (localStorage.getItem('token')) {
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
      
    const response: AxiosResponse<string> = await axios.delete(`${BASE_URL}/${file.picture_url}`, {
      headers: {
        'Content-Type': 'multipart/form-data; charset=utf-8',
      }
    });

    return response;
  }else {
    return null;
  }
};

export const trombiServiceUpdateOne = async (file: PictureState): Promise<PictureState | null> => {
  if (localStorage.getItem('token')) {
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
      
    const response: AxiosResponse = await axios.put(`${BASE_URL}`, file);

    return response.data;
  }else {
    return null;
  }
};