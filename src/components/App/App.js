import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import AppContext from '../../contexts/AppContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import './App.css';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
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
  const [searchedSavedMovies, setSearchedSavedMovies] = useState(JSON.parse(localStorage.getItem('movieSaved')) || []);

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
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([user, movieInfo]) => {
          setCurrentUser(user);
          setIsMoviesSaved(movieInfo);
          localStorage.setItem('movieSaved', JSON.stringify(movieInfo));
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
            if (error === 401) {
              history.push('/');
              localStorage.clear();
              setIsLoggedIn(false);
            }
        })
    }
  }, [isLoggedIn]);

  function handleRegister({name, email, password}) {
    setIsLoading(true);
    mainApi.register({name, email, password})
    .then((data) => {
      if(data) {
        handleLogin({email, password});
        setInfoTooltipImage({
          imageType: 'imageSuccess'});
        setInfoTooltipStatus('Пользователь успешно зарегистрирован');
        handleInfoTooltipOpen();
      }
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
      setInfoTooltipImage({
        imageType: 'imageError'});
      setInfoTooltipStatus('Ошибка регистрации. Введены некорректные данные');
      handleInfoTooltipOpen();
    })
    .finally(() => setIsLoading(false));
  };

  function handleLogin({email, password}) {
    setIsLoading(true);
    mainApi.authorize({email, password})
      .then((data) => {
        if(data) {
          setIsLoggedIn(true)
          localStorage.setItem('isloggedIn', true);
          history.push('/movies');
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setInfoTooltipImage({
          imageType: 'imageError'});
        setInfoTooltipStatus('Ошибка входа. Введены некорректные данные');
        handleInfoTooltipOpen();
      })
      .finally(() => setIsLoading(false))
  };


  function handleLogout() {
    mainApi.logOut()
    .then((res) => {
      setIsLoggedIn(false);
      history.push('/');
      localStorage.removeItem('isloggedIn');
      localStorage.removeItem('searchedMovies');
      localStorage.removeItem('movieSaved');
      localStorage.removeItem('movies')
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
    };

  function handleGetSavedMovies() {
    mainApi.getSavedMovies()
    .then((searchedMovies) => {
      setIsMoviesSaved(searchedMovies);
      localStorage.setItem('movieSaved', JSON.stringify(searchedMovies));
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
      if (error === 401) {
        history.push('/');
        localStorage.clear();
        setIsLoggedIn(false);
      }
    });
  };

  function handleSavedMovies(data) {
    const movieSaved = JSON.parse(localStorage.getItem('movieSaved'));
    const isMovieSaved = movieSaved.some(i => i.movieId === data.id);
    mainApi.handleSavedMovies(data, isMovieSaved)
      .then((myMovie) => {
        handleGetSavedMovies()
        setIsMoviesSaved(isMoviesSaved.map((savedMovie) =>
          savedMovie.movieId === data.id ? myMovie : savedMovie));
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
        if (error === 401) {
          history.push('/');
          localStorage.clear();
          setIsLoggedIn(false);
        }
      })
  };

  function handleDeleteMovies(data) {
    mainApi.deleteMovies(data)
      .then(() => {
        const movieSaved = JSON.parse(localStorage.getItem('movieSaved'));
        const movieDeleted = movieSaved.filter(savedCard => data._id !== savedCard._id)
        setIsMoviesSaved(movieDeleted);
        localStorage.setItem('movieSaved', JSON.stringify(movieDeleted));
        const newSavedMovies = searchedSavedMovies.filter((movie) => data._id !== movie._id)
        setSearchedSavedMovies(newSavedMovies);
        localStorage.setItem('newSavedMovies', JSON.stringify(newSavedMovies));
  })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AppContext.Provider
        value={{
          isMoviesSaved: isMoviesSaved,
          cards: movies,
          onMoviesDelete: handleDeleteMovies,

        }}>
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
                setMovies={setMovies}
                setMovieSearch={setMovieSearch}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                movieSearch={movieSearch}
                onMoviesSaved={handleSavedMovies}
               />
            <ProtectedRoute
                path="/saved-movies"
                component={SavedMovies}
                isLogged={isLoggedIn}
                isNavigationPopupOpen={handleNavigationPopupClick}
                onClose={closePopup}
                onOverlayClose={closePopupOnOverlay}
                isOpen={isNavigationPopupOpen}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setIsMoviesSaved={setIsMoviesSaved}
                searchedSavedMovies={searchedSavedMovies}
                setSearchedSavedMovies={setSearchedSavedMovies}
              />
            <ProtectedRoute
                component={Profile}
                path='/profile'
                isLogged={isLoggedIn}
                onLogOut={handleLogout}
                onUpdateProfile={handleUpdateProfile}
                currentUser={currentUser}
                isNavigationPopupOpen={handleNavigationPopupClick}
                isOpen={isNavigationPopupOpen}
                onClose={closePopup}
                onOverlayClose={closePopupOnOverlay}
              />
            <Route path='/signup'>
              { isLoggedIn
              ? <Redirect to="/profile" />
              : <Register
                  onRegister={handleRegister}
                  isLoading={isLoading}
                /> }
            </Route>
            <Route path='/signin'>
              { isLoggedIn
              ? <Redirect to="/profile" />
              :  <Login
                    onLogin={handleLogin}
                    isLoading={isLoading}
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
        </AppContext.Provider>
    </CurrentUserContext.Provider>

  );
}

export default App;