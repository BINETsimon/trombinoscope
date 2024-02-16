import { Link } from 'react-router-dom';
import '../../styles/navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

import { HiLogout } from 'react-icons/hi';
import { useState } from 'react';

function NavBar() {

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [isNav, setIsNav] = useState<boolean>(false);

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT'});
  };

  const burgerNav = () => {
    setIsNav(!isNav);
  };
    
  return (
    <div className='container navbar'>
      <div className='link-container link-start'>
        <Link to="/" className='navbar-link'>🟣 T-KI</Link>
      </div>
      <div className="burger" onClick={burgerNav}>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={'link-container link-end ' + (isNav ? 'link-show': '')} onClick={burgerNav}> 
        <Link to="/" className='navbar-link'>Accueil</Link>
        {
          user.isLoggedIn?
            (
              <>
                <Link to="/play" className='navbar-link'>Jouer</Link>
                {/* <Link to="/stats" className='navbar-link'>Statistiques</Link> */}
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