import { Switch, Route } from 'react-router-dom';
import { useState, useEffect, useLayoutEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
// import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import './App.css';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import moviesApi from '../../utils/MoviesApi';

function App() {
  const [isNavigationPopupOpen, setIsNavigationPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const width = handleWindowSize();
  const [movies, setMovies] = useState(0);
  const [moreMovies, setMoreMovies] = useState(0);

  function handleNavigationPopupClick() {
    setIsNavigationPopupOpen(true);
  }

  function closePopup() {
    setIsNavigationPopupOpen(false);
  }

  function closePopupOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      closePopup();
    }
  }

  useEffect(() => {
    if (isNavigationPopupOpen) {
      function handleEscClose(evt) {
        if (evt.key === 'Escape') {
          closePopup();
        }
      }

      document.addEventListener('keydown', handleEscClose);
      return () => {
        document.removeEventListener('keydown', handleEscClose);
      };
    }
  }, [isNavigationPopupOpen]);

  useEffect(() => {
    /* if(isLoggedIn) { */
      setIsLoading(true);
      moviesApi.getMovies()
        .then((movies) => {
          localStorage.setItem('movies', JSON.stringify(movies));
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        })
        .finally(() => setIsLoading(false));
    }
  /*}, [isLoggedIn] */)


  function handleWindowSize() {
    const [size, setSize] = useState(0);

    useLayoutEffect(() => {
      function useSize() {
        setSize(window.innerWidth);
      }
      window.addEventListener('resize', () =>{
        setTimeout(useSize, 1500);
      });
      useSize();

      return () => window.removeEventListener('resize', useSize);
    }, []);
    return size;
  }

  useEffect(() => {
    function getMovies() {
      if (width > 1200) {
        setMovies(12);
        setMoreMovies(3);
      } else if (width <= 1200 && width > 760) {
        setMovies(8);
        setMoreMovies(2);
      } else if (width <= 760) {
        setMovies(5);
        setMoreMovies(1);
      }
    }
    getMovies();
  }, [width]);

  function handleClickMoreCards() {
    setMovies(movies + moreMovies);
  }


  return (
    <CurrentUserContext.Provider>
        <div className="page">
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/movies">
              <Movies
                isNavigationPopupOpen={handleNavigationPopupClick}
                onClose={closePopup}
                onOverlayClose={closePopupOnOverlay}
                isOpen={isNavigationPopupOpen}
                cards={movies}
                moviesMore={handleClickMoreCards}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
               />
            </Route>
            <Route path="/saved-movies">
              <SavedMovies
                isNavigationPopupOpen={handleNavigationPopupClick}
                onClose={closePopup}
                onOverlayClose={closePopupOnOverlay}
                isOpen={isNavigationPopupOpen}
                cards={movies}
              />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
            <Route path='/signup'>
              <Register />
            </Route>
            <Route path='/signin'>
              <Login />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
