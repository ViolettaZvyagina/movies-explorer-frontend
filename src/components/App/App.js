import { Switch, Route, useHistory, Redirect} from 'react-router-dom';
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

function App() {
  const [isNavigationPopupOpen, setIsNavigationPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
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

  function handleLogout() {
    mainApi.logOut()
    .then((res) => {
      setIsLoggedIn(false);
      history.push('/');
      localStorage.removeItem('isloggedIn');
      localStorage.removeItem('searchedMovies');
      localStorage.removeItem('inputSearch');
      localStorage.removeItem('checkbox');
      setMovieSearch([]);
      setInput('');
      setIsChecked(false);
    })
    .catch((err) => {
      setError(err);
    })
  }

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

      /*function handleSearchSubmit(inputValue, isChecked) {
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
        }
      } */

      function handleSearchSubmit(inputValue, isChecked) {

        const movies = JSON.parse(localStorage.getItem('movies'));

        try {
          const foundMovies = movies.filter(data => {
            return data.nameRU.toLowerCase().includes(inputValue.toLowerCase());
          });

          localStorage.setItem('searchedMovies', JSON.stringify(foundMovies));
          setMovieSearch(foundMovies);
          localStorage.setItem('inputSearch', inputValue);
          setInput(inputValue);

          if (isChecked) {
            const shortMovies = foundMovies.filter((data) => data.duration <= 40);
            setMovieSearch(shortMovies);
            localStorage.setItem('searchedMovies', JSON.stringify(foundMovies));
            localStorage.setItem('inputSearch', inputValue);
          }
        } catch (err) {
          console.log(err);
          setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      }
    }

    function handleSavedSearchSubmit(inputValue, isChecked) {

      try {
        const isMoviesSaved = isMoviesSaved.filter(data => {
          return data.nameRU.toLowerCase().includes(inputValue.toLowerCase());
        });

        localStorage.setItem('isMoviesSaved', JSON.stringify(isMoviesSaved));
        setMovieSearch(foundMovies);
        localStorage.setItem('inputSearch', inputValue);
        setInput(inputValue);

        if (isChecked) {
          const shortMovies = foundMovies.filter((data) => data.duration <= 40);
          setMovieSearch(shortMovies);
          localStorage.setItem('searchedMovies', JSON.stringify(foundMovies));
          localStorage.setItem('inputSearch', inputValue);
        }
      } catch (err) {
        console.log(err);
        setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
    }
  }

  /*function handleSearchSubmit(inputValue, isChecked) {
    const movies = JSON.parse(localStorage.getItem('movies'));
    if (!isChecked) {
      const foundMovies = movies.filter(data => (data.duration <= 40) && (data.nameRU.toLowerCase().includes(inputValue.toLowerCase())))
    if (foundMovies.length) {
      localStorage.setItem('searchedMovies', JSON.stringify(foundMovies));
      setMovieSearch(foundMovies);
      localStorage.setItem('inputSearch', inputValue);
      console.log(foundMovies)
    } else {
      const foundMovies = movies.filter(data => {
        return data.nameRU.toLowerCase().includes(inputValue.toLowerCase());
      });
      if (foundMovies.length) {
        localStorage.setItem('searchedMovies', JSON.stringify(foundMovies));
        setMovieSearch(foundMovies);
        localStorage.setItem('inputSearch', inputValue);
        console.log(foundMovies)
    }
  }
}
} */

    function handleCheck(e) {
      const isChecked = e.target.checked;
      if (!isChecked) {
        setIsChecked(false);
        localStorage.removeItem('checkbox', isChecked);
      } else {
        setIsChecked(true);
        localStorage.setItem('checkbox', isChecked);
      }
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
    if (isChecked) {
      const shortMoviesCards = movieSearch.filter((data) => data.duration <= 40);
      setMovieSearch(shortMoviesCards);

    } if (!isChecked) {
      const movieSearch = JSON.parse(localStorage.getItem('searchedMovies'));
      setMovieSearch(movieSearch);
    } if (!movieSearch.length) {
      setMovieSearch([]);
    }
  };

  useEffect(() => {
    handleShortMovies(isChecked)
  }, [isChecked]);

  function handleShortMoviesSaved(isChecked) {
    if (isChecked) {
      const shortSavedMoviesCards = movieSearch.filter((data) => data.duration <= 40);
      setMovieSearch(shortSavedMoviesCards);

    } if (!isChecked) {
      const movieSearch = JSON.parse(localStorage.getItem('searchedMovies'));
      setMovieSearch(movieSearch);
    } if (!movieSearch.length) {
      setMovieSearch([]);
    }
  }

  /*function handleShortMoviesSaved(isChecked) {
    if (isChecked) {
      const shortMoviesCards = isMoviesSaved.filter((data) => data.duration <= 40);
      setMovies(shortMoviesCards);
    } else {
      const movies = JSON.parse(localStorage.getItem('searchedMovies'));
      setMovies(movies);
    }
  };*/

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
            <ProtectedRoute
                component={SavedMovies}
                isLogged={isLoggedIn}
                path="/saved-movies"
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
              />
            <ProtectedRoute
                component={Profile}
                path='/profile'
                isLogged={isLoggedIn}
                onLogOut={handleLogout}
              />
            <Route path='/signup'>
              { isLoggedIn
              ? <Redirect to="/profile" />
              : <Register
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
        </div>
    </CurrentUserContext.Provider>

  );
}

export default App;