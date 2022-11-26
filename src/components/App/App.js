import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  const [isNavigationPopupOpen, setIsNavigationPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isMoviesSaved, setIsMoviesSaved] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isloggedIn'));
  const [movieSearch, setMovieSearch] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = useState('');
  const [infoTooltipImage, setInfoTooltipImage] = useState({});
  const history = useHistory();

  function handleNavigationPopupClick() {
    setIsNavigationPopupOpen(true);
  };

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function closePopup() {
    setIsNavigationPopupOpen(false);
    setIsInfoTooltipOpen(false)
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
        setInfoTooltipImage({
          imageType: 'imageSuccess'});
        setInfoTooltipStatus('Пользователь успешно зарегистрирован');
        handleInfoTooltipOpen();
        history.push('/signin');
      }
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
      setIsDisabled(true);
      setInfoTooltipImage({
        imageType: 'imageError'});
      setInfoTooltipStatus('Ошибка регистрации. Введены некорректные данные');
      handleInfoTooltipOpen();
    })
  };

  useEffect(() => {
    if(isLoggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([user, movieInfo]) => {
          setCurrentUser(user);
          setIsMoviesSaved(movieInfo);
          localStorage.setItem('movieSaved', JSON.stringify(movieInfo));
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        })
    }
  }, [isLoggedIn]);

  function handleLogin({email, password}) {
    mainApi.authorize({email, password})
      .then((data) => {
        setIsLoggedIn(() => {
          localStorage.setItem('isloggedIn', true);
          history.push('/movies');
          return true;
        });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsDisabled(true);
        setInfoTooltipImage({
          imageType: 'imageError'});
        setInfoTooltipStatus('Ошибка входа. Введены некорректные данные');
        handleInfoTooltipOpen();
        console.log(`Ошибка: ${err}`);
      })
  };

  function handleLogout() {
    mainApi.logOut()
    .then((res) => {
      setIsLoggedIn(false);
      history.push('/');
      localStorage.removeItem('isloggedIn');
      localStorage.removeItem('searchedMovies');
      localStorage.removeItem('movieSaved');
      localStorage.removeItem('inputSearch');
      localStorage.removeItem('checkbox');
      setMovieSearch([]);
    })
    .catch((err) => {
      setInfoTooltipImage({
        imageType: 'imageError'});
      setInfoTooltipStatus('Произошла ошибка. Попробуйте снова');
      handleInfoTooltipOpen();
      console.log(`Ошибка: ${err}`);
    })
  };

    function handleUpdateProfile(user) {
      mainApi.updateProfile(user.name, user.email)
      .then((userData) => {
        setCurrentUser(value => {
          return {
            ...value,
            name: userData.name,
            email: userData.email,
          }
        })
        setInfoTooltipImage({
          imageType: 'imageSuccess'});
        setInfoTooltipStatus('Данные успешно обновлены');
        handleInfoTooltipOpen();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
        setInfoTooltipImage({
          imageType: 'imageError'});
        setInfoTooltipStatus('Ошибка обновления профиля. Введите корректные данные');
        handleInfoTooltipOpen();
      })
    }

  function handleGetSavedMovies() {
    mainApi.getSavedMovies()
    .then((searchedMovies) => {
      setIsMoviesSaved(searchedMovies);
      localStorage.setItem('movieSaved', JSON.stringify(searchedMovies))
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
              <Main
                isLogged={isLoggedIn}
                isNavigationPopupOpen={handleNavigationPopupClick}
                isOpen={isNavigationPopupOpen}
                onClose={closePopup}
                onOverlayClose={closePopupOnOverlay}
              />
            </Route>
            <ProtectedRoute
                component={Movies}
                path="/movies"
                isLogged={isLoggedIn}
                isNavigationPopupOpen={handleNavigationPopupClick}
                onClose={closePopup}
                onOverlayClose={closePopupOnOverlay}
                isOpen={isNavigationPopupOpen}
                cards={movies}
                setMovies={setMovies}
                setMovieSearch={setMovieSearch}
                isLoading={isLoading}
                movieSearch={movieSearch}
                isMoviesSaved={isMoviesSaved}
                onMoviesSaved={handleSavedMovies}
                onMoviesDelete={handleDeleteMovies}
               />
            <ProtectedRoute
                component={SavedMovies}
                isLogged={isLoggedIn}
                path="/saved-movies"
                isNavigationPopupOpen={handleNavigationPopupClick}
                onClose={closePopup}
                onOverlayClose={closePopupOnOverlay}
                isOpen={isNavigationPopupOpen}
                isLoading={isLoading}
                cards={movies}
                isMoviesSaved={isMoviesSaved}
                onMoviesSaved={handleSavedMovies}
                onMoviesDelete={handleDeleteMovies}
                setIsMoviesSaved={setIsMoviesSaved}
              />
            <ProtectedRoute
                component={Profile}
                path='/profile'
                isLogged={isLoggedIn}
                onLogOut={handleLogout}
                onUpdateProfile={handleUpdateProfile}
                currentUser={currentUser}
              />
            <Route path='/signup'>
              { isLoggedIn
              ? <Redirect to="/profile" />
              : <Register
                  isDisabled={isDisabled}
                  onRegister={handleRegister}
                /> }
            </Route>
            <Route path='/signin'>
              { isLoggedIn
              ? <Redirect to="/profile" />
              :  <Login
                    onLogin={handleLogin}
                  /> }
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
          <InfoTooltip
            onClose={closePopup}
            isOpen={isInfoTooltipOpen}
            image={infoTooltipImage}
            status={infoTooltipStatus}
      />
        </div>
    </CurrentUserContext.Provider>

  );
}

export default App;