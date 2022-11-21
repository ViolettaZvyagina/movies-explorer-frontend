import { Switch, Route, useHistory} from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  const [isMoviesSaved, setIsMoviesSaved] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isloggedIn'));
  const [movieSearch, setMovieSearch] = useState([]);
  const [input, setInput] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('Введите название фильма в поиск');
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
          setIsMoviesSaved(movieInfo);
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

  useEffect(() => {
    const movieSearch = localStorage.getItem('searchedMovies');
    if (movieSearch) {
      const parsedMovies = JSON.parse(movieSearch);
      setMovieSearch(parsedMovies);
    }

    const inputSearch = localStorage.getItem('inputSearch');
    if (inputSearch) {
      setInput(inputSearch);
    }

    const checkbox = localStorage.getItem('checkbox');
    if (checkbox === 'true') {
      setIsChecked(true);
    }
  }, []);

    /*function handleSearchSubmit(inputValue, isChecked) {

      const movies = JSON.parse(localStorage.getItem('movies'));

      const foundMovies = movies.filter(data => {
        return data.nameRU.toLowerCase().includes(inputValue.toLowerCase());
      });
      if (foundMovies.length) {
        localStorage.setItem('searchedMovies', JSON.stringify(foundMovies));
        setMovieSearch(foundMovies);
        localStorage.setItem('inputSearch', inputValue);
      }

      };*/

      function handleSearchSubmit(inputValue, isChecked) {

        const movies = JSON.parse(localStorage.getItem('movies'));

        const foundMovies = movies.filter(data => {
          return data.nameRU.toLowerCase().includes(inputValue.toLowerCase());
        });
        if (foundMovies.length) {
          localStorage.setItem('searchedMovies', JSON.stringify(foundMovies));
          setMovieSearch(foundMovies);
          localStorage.setItem('inputSearch', inputValue);
          console.log(foundMovies)
        }
        /*if (isChecked) {
          const shortMoviesCards = foundMovies.filter((data) => data.duration <= 40);
          setMovieSearch(shortMoviesCards);
        } */
      }

    function handleCheck(e) {
      const isChecked = e.target.checked;
      if (!isChecked) {
        setIsChecked(false);
        localStorage.removeItem('checkbox', isChecked);
      } else {
        setIsChecked(true);
        localStorage.setItem('checkbox', isChecked);
      }
      console.log(isChecked)
    }


  /*function handleShortMovies(isChecked) {
    if (isChecked && movieSearch[0]) {
      const shortMoviesCards = movieSearch.filter((data) => data.duration <= 40);
      setMovieSearch(shortMoviesCards);

    } if (!isChecked && movieSearch[0]) {
      const movieSearch = JSON.parse(localStorage.getItem('searchedMovies'));
      setMovieSearch(movieSearch);
    } if (!movieSearch[0]) {
      setError('Ничего не найдено');
      console.log('Ничего не найдено')
    }
  }; */

  function handleShortMovies(isChecked) {
    if (isChecked && movieSearch[0]) {
      const shortMoviesCards = movieSearch.filter((data) => data.duration <= 40);
      setMovieSearch(shortMoviesCards);

    } if (!isChecked && movieSearch[0]) {
      const movieSearch = JSON.parse(localStorage.getItem('searchedMovies'));
      setMovieSearch(movieSearch);
    } else {
      setError('Ничего не найдено');
      console.log('Ничего не найдено')
    }
  };

  useEffect(() => {
    handleShortMovies(isChecked)
  }, [isChecked]);

  function handleShortMoviesSaved(isChecked) {
    if (isChecked) {
      const shortMoviesCards = isMoviesSaved.filter((data) => data.duration <= 40);
      setMovies(shortMoviesCards);
    } else {
      const movies = JSON.parse(localStorage.getItem('searchedMovies'));
      setMovies(movies);
    }
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
                setMovies={setMovies}
                isLoading={isLoading}
                input={input}
                movieSearch={movieSearch}
                onSearch={handleSearchSubmit}
                isMoviesSaved={isMoviesSaved}
                onMoviesSaved={handleSavedMovies}
                onMoviesDelete={handleDeleteMovies}
                onCheckbox={handleCheck}
                isChecked={isChecked}
                error={setError}
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
                //onCheckbox={handleCheck}
                //isChecked={isChecked}
               // isMovieShort={isMovieShort}
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
