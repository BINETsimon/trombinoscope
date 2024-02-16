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
    <div className='main-container'>
      <h1>Se connecter</h1>
      <div className="display-container">
        <div className="inside-container">
          <form onSubmit={handleSubmit}>
            <div className='input-container'>
              <label>Email : </label>
              <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            </div>
            <div className='input-container'>
              <label>Mot de passe : </label>
              <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange}/>
            </div>
            <button>Connexion</button>
          </form>
        </div>
      </div>
    </div>
  );
}
  
export default Login;