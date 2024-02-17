import { useDispatch } from 'react-redux';
import { userServiceSignup } from '../services/userServices';
import { useState } from 'react';
import { User } from '../store/interfaces/userState';
import { trombiServiceGetAll } from '../services/trombiServices';

function Signup() {
  const [formData, setFormData] = useState<User>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confPassword: '',
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
    
    userServiceSignup(formData).then((response) => {
      console.log(response);
      dispatch({ type: 'SET_USER', payload: response });
    });

    trombiServiceGetAll().then((response) => {
      dispatch({ type: 'SET_TROMBI', payload: response });
    }).catch((err) => {
      console.log(err);
    });
  
  };

  return (
    <div className='main-container'>
      <h1>Créer un compte</h1>
      <div className="display-container">
        <div className="inside-container">
          <form onSubmit={handleSubmit}>
            <label>Prénom : </label>
            <input type="text" placeholder="Prénom" name="first_name" value={formData.first_name} onChange={handleChange} />
            <label>Nom : </label>
            <input type="text" placeholder="Nom" name="last_name" value={formData.last_name} onChange={handleChange} />
            <label>Email : </label>
            <input type="text" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
            <label>Mot de passe : </label>
            <input type="password" placeholder="Mot de passe" name="password" value={formData.password} onChange={handleChange} />
            <label>Confirmer mot de passe : </label>
            <input type="password" placeholder="Confirmer mot de passe" name="confPassword" value={formData.confPassword} onChange={handleChange} />
            <button>Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}
    
export default Signup;