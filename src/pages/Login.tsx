/* 
Page de connexion
- Login 🚧
*/

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Credentials } from '../store/interfaces/userState';
import { userServiceLogin } from '../services/userServices';
import { trombiServiceGetAll } from '../services/trombiServices';


function Login() {
  const [formData, setFormData] = useState<Credentials>({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Dispatch action to login with formData
    userServiceLogin(formData).then((response) => {
      dispatch({ type: 'SET_USER', payload: response });
    });

    trombiServiceGetAll().then((response) => {
      dispatch({ type: 'SET_TROMBI', payload: response });
    }).catch((err) => {
      console.log(err);
    });

    // Reset form after dispatching
    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="email" placeholder="email" value={formData.email} onChange={handleChange} />
      <input type="password" name="password" placeholder="mot de passe" value={formData.password} onChange={handleChange}/>
      <button>login</button>
    </form>
  );
}
  
export default Login;