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
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="prenom" name="first_name" value={formData.first_name} onChange={handleChange} />
      <input type="text" placeholder="nom" name="last_name" value={formData.last_name} onChange={handleChange} />
      <input type="text" placeholder="identifiant" name="email" value={formData.email} onChange={handleChange} />
      <input type="text" placeholder="mot de passe" name="password" value={formData.password} onChange={handleChange} />
      <input type="text" placeholder="confirmer mot de passe" name="confPassword" value={formData.confPassword} onChange={handleChange} />
      <button>Signup</button>
    </form>
  );
}
    
export default Signup;