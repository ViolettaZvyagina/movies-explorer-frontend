import { useEffect, useState, useLayoutEffect, useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader/Preloader';
import MoviesErrorBox from './MoviesErrorBox/MoviesErrorBox';
import moviesApi from '../../utils/MoviesApi';
import {
  MoviesDuration,
  CardsQuantitySmall,
  CardsQuantityMedium,
  CardsQuantityBig,
  CardsMoreSmall,
  CardsMoreSBig,
  WidthSmall,
  WidthMediumAndBig
} from '../../utils/contans';

function Movies({
  isNavigationPopupOpen,
  isOpen,
  onClose,
  onOverlayClose,
  setMovies,
  movieSearch,
  isLoading,
  onMoviesSaved,
  isLogged,
  setMovieSearch,
  setIsLoading,
}) {
  const width = handleWindowSize();
  const [input, setInput] = useState('');
  const [moreMovies, setMoreMovies] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('Введите название фильма в поиск');
  const {isMoviesSaved, cards, onMoviesDelete} = useContext(AppContext);

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
      if (width > WidthMediumAndBig) {
        setMovies(CardsQuantityBig);
        setMoreMovies(CardsMoreSBig);
      } else if (width <= WidthMediumAndBig && width > WidthSmall) {
        setMovies(CardsQuantityMedium);
        setMoreMovies(CardsMoreSmall);
      } else if (width <= WidthSmall) {
        setMovies(CardsQuantitySmall);
        setMoreMovies(CardsMoreSmall);
      }
    }
    getMovies();
  }, [width]);

  function handleClickMoreCards() {
    setMovies(cards + moreMovies);
  };

  useEffect(() => {
    const movieSearch = localStorage.getItem('searchedMovies');
    if (movieSearch) {
      setMovieSearch(movieSearch);
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

function handleSearchSubmit(inputValue, isChecked) {
  const movies = JSON.parse(localStorage.getItem('movies'));

  try {
    if (movies) {
    const foundMovies = movies.filter(data => {
      return data.nameRU.toLowerCase().includes(inputValue.toLowerCase());
    });

    localStorage.setItem('searchedMovies', JSON.stringify(foundMovies));
    setMovieSearch(foundMovies);
    localStorage.setItem('inputSearch', inputValue);
    setInput(inputValue);

    if (isChecked) {
      const shortMovies = foundMovies.filter((data) => data.duration <= MoviesDuration);
      setMovieSearch(shortMovies);
      localStorage.setItem('searchedMovies', JSON.stringify(foundMovies));
      localStorage.setItem('inputSearch', inputValue);
    } else {
      setError('Ничего не найдено');
    }
    } else {
    if(isLogged && !movies) {
      setIsLoading(true);
      moviesApi.getMovies()
        .then((movies) => {
          localStorage.setItem('movies', JSON.stringify(movies));
          const foundMovies = movies.filter(data => {
            return data.nameRU.toLowerCase().includes(inputValue.toLowerCase());
          });

          localStorage.setItem('searchedMovies', JSON.stringify(foundMovies));
          setMovieSearch(foundMovies);
          localStorage.setItem('inputSearch', inputValue);
          setInput(inputValue);

          if (isChecked) {
            const shortMovies = foundMovies.filter((data) => data.duration <= MoviesDuration);
            setMovieSearch(shortMovies);
            localStorage.setItem('searchedMovies', JSON.stringify(foundMovies));
            localStorage.setItem('inputSearch', inputValue);
          } else {
            setError('Ничего не найдено');
          }
        })
        }
  }
  } catch (err) {
    console.log(`Ошибка: ${err}`);
    setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
} finally {
  setTimeout(()=> setIsLoading(false), 3000);
}
};


function handleShortMovies(isChecked) {
  if (isChecked) {
    const shortMoviesCards = movieSearch.filter((data) => data.duration <= MoviesDuration);
    setMovieSearch(shortMoviesCards);

  } if (!isChecked) {
    const movieSearch = JSON.parse(localStorage.getItem('searchedMovies'));
    setMovieSearch(movieSearch);
  } if (!movieSearch.length) {
    const movieSearch = JSON.parse(localStorage.getItem('searchedMovies'));
    setMovieSearch(movieSearch || []);
  } else {
    setError('Ничего не найдено');
  }
};

useEffect(() => {
  handleShortMovies(isChecked)
}, [isChecked]);

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

return (
  <main className="content">
    <Header
      isNavigationPopupOpen={isNavigationPopupOpen}
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      isLogged={isLogged}
    />
    <SearchForm
      input={input}
      setError={setError}
      onSearch={handleSearchSubmit}
      onCheckbox={handleCheck}
      isChecked={isChecked}
    />
    { isLoading
      ? <Preloader />
      : ( movieSearch.length
        ? <MoviesCardList
            searchMovie={movieSearch}
            cards={cards}
            isLoading={isLoading}
            moviesMore={handleClickMoreCards}
            isMoviesSaved={isMoviesSaved}
            onMoviesSaved={onMoviesSaved}
            onMoviesDelete={onMoviesDelete}
          />
        : <MoviesErrorBox
            error={error}
        />)
      }
    <Footer />
  </main>
);
}
export default Movies;
