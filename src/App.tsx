import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles/main.css';
import './styles/overlay.css';
import './styles/profile.css';
import './styles/game.css';

import Home from './pages/Home';
import Error from './pages/Error';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import NavBar from './components/Global/NavBar';
import Game from './pages/Game';
import Statistics from './pages/Statistics';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userServiceGetMe } from './services/userServices';
import { trombiServiceGetAll, trombiServiceLoadPictures } from './services/trombiServices';
import { RootState } from './store';

function App() {
  
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const trombi = useSelector((state: RootState) => state.trombi);

  useEffect(() => {
    // Update the document title using the browser API

    if (!user.isLoggedIn){
      userServiceGetMe().then((response)=>{
        if(response !== null)
          dispatch({ type: 'SET_USER', payload: response });
        
      }).catch((err) => {
        if (err.response.status === 403) {
          localStorage.removeItem('token');
        }
      });
    }

    if(trombi.files?.length === 0)
      trombiServiceGetAll().then((response) => {
        dispatch({ type: 'SET_TROMBI', payload: response });
      }).catch((err) => {
        console.log(err);
      });

    if (!trombi.loaded && !trombi.loading && trombi.files?.length > 0) {

      const loadImages = async () => {
        dispatch({ type: 'LOADING_TROMBI' });
        trombiServiceLoadPictures(trombi).then(response => {
        
          dispatch({ type: 'LOADED_TROMBI', payload: response!.files  });
        });
      };
  
      loadImages();
    }

  });

  return (
    <>
      <Router>
        <div id='main-page'> 
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/play" element={<Game />} />
            <Route path="/stats" element={<Statistics />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
