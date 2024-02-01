import { Link } from 'react-router-dom';
import '../../styles/navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

import { HiUser, HiLogout, HiHome } from 'react-icons/hi';
import { IoGameController } from 'react-icons/io5';

function NavBar() {

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT'});
  };
    
  return (
    <div className='container navbar'>
      <div className='link-container link-start'>
        {/* <Link to="/" className='navbar-link'>Logo</Link> */}
        <Link to="/" className='navbar-link'>Accueil</Link>
        <Link to="/play" className='navbar-link'>Jouer</Link>
        {/* <Link to="/stats" className='navbar-link'>Statistiques</Link> */}
      </div>
      <div className='link-container link-end'>
        {
          user.isLoggedIn?
            (
              <>
                <Link to="/profile" className='navbar-link'>Profile</Link>
                <Link to="/login" onClick={logout} className='navbar-link'><HiLogout/></Link>
              </>
            )
            :
            (
              <>
                <Link to="/login" className='navbar-link'>Connexion</Link>
                <Link to="/signup" className='navbar-link'>S'enregister</Link>
              </>
            )
        }
        
      </div>
    </div>
  );
}
  
export default NavBar;