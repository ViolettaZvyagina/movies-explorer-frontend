import { Switch, Route, useHistory} from 'react-router-dom';
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
import mainApi from '../../utils/MainApi';

function App() {
  const [isNavigationPopupOpen, setIsNavigationPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState(0);
  const [moreMovies, setMoreMovies] = useState(0);
  const [isMoviesSaved, setIsMoviesSaved] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isloggedIn'));
  const width = handleWindowSize();
  const history = useHistory();

  function handleNavigationPopupClick() {
    setIsNavigationPopupOpen(true);
  };

  function closePopup() {
    setIsNavigationPopupOpen(false);
  };

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
    if(isLoggedIn) {
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
  }, [isLoggedIn, setIsLoading]);

  function handleRegister({name, email, password}) {
    mainApi.register({name, email, password})
    .then((data) => {
      if(data) {
        /*setInfoTooltipStatus({
          imageType: 'imageSuccess',
          textType: 'textSuccess'});
        handleInfoTooltipOpen();*/
        history.push('/signin');
      }
    })
    /*.catch((error) => {
      setInfoTooltipStatus({
        imageType: 'imageError',
        textType: 'textError'});
      handleInfoTooltipOpen();
      console.log(`Ошибка: ${error}`);
    })*/
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
  };

  useEffect(() => {
    if(isLoggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([user, movieInfo]) => {
          setCurrentUser(user);
          console.log(movieInfo)
          setIsMoviesSaved(movieInfo);
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        })
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/movies');
    }
  }, [isLoggedIn, history])

  function handleLogin({email, password}) {
    mainApi.authorize({email, password})
      .then((data) => {
        setIsLoggedIn(() => {
          localStorage.setItem('isloggedIn', true)
          return true;
        });
      })
      /*.catch((error) => {
        setInfoTooltipStatus({
          imageType: 'imageError',
          textType: 'textError'});
        handleInfoTooltipOpen();
        console.log(`Ошибка: ${error}`);
      })*/
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
  };

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
  };

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
  };

  function handleGetSavedMovies() {
    mainApi.getSavedMovies()
    .then((searchedMovies) => {
      setIsMoviesSaved(searchedMovies);
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
  };

  function handleSavedMovies(data) {
    const isMovieSaved = isMoviesSaved.some(i => i.movieId === data.id);
    mainApi.handleSavedMovies(data, isMovieSaved)
      .then((myMovie) => {
        handleGetSavedMovies()
        setIsMoviesSaved(isMoviesSaved.map((savedMovie) =>
          savedMovie.movieId === data.id ? myMovie : savedMovie));
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
  };

  function handleDeleteMovies(data) {
    mainApi.deleteMovies(data)
      .then(() => {
        handleGetSavedMovies()
        setIsMoviesSaved((item) => item.filter((movie) => movie.movieId !== movie.id));
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
                isMoviesSaved={isMoviesSaved}
                onMoviesSaved={handleSavedMovies}
                onMoviesDelete={handleDeleteMovies}
               />
            </Route>
            <Route path="/saved-movies">
              <SavedMovies
                isNavigationPopupOpen={handleNavigationPopupClick}
                onClose={closePopup}
                onOverlayClose={closePopupOnOverlay}
                isOpen={isNavigationPopupOpen}
                cards={movies}
                isMoviesSaved={isMoviesSaved}
                onMoviesSaved={handleSavedMovies}
                onMoviesDelete={handleDeleteMovies}
              />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
            <Route path='/signup'>
              <Register
                onRegister={handleRegister}
              />
            </Route>
            <Route path='/signin'>
              <Login
                onLogin={handleLogin}
              />
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
