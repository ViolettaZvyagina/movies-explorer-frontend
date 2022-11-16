import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesMore from './MoviesMore/MoviesMore';
import Preloader from './Preloader/Preloader/Preloader';

function Movies({
  isNavigationPopupOpen,
  isOpen,
  onClose,
  onOverlayClose,
  cards,
  moviesMore,
  setIsLoading,
  isLoading
}) {
  const moviesRoute = useRouteMatch({ path: '/movies', exact: false });
  const [movieSearch, setMovieSearch] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('Введите название фильма в поиск');

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
  }, [])

    function handleSearchSubmit(inputValue) {
      //setIsLoading(true);
      const movies = JSON.parse(localStorage.getItem('movies'));

      /*try {*/
      const foundMovies = movies.filter(data => {
        return data.nameRU.toLowerCase().includes(inputValue.toLowerCase());
      });

      if (foundMovies.length) {
        localStorage.setItem('searchedMovies', JSON.stringify(foundMovies));
        setMovieSearch(foundMovies);
        localStorage.setItem('inputSearch', inputValue);
      }
      } /*finally {
      setIsLoading(false);
    }
    }*/

  return (
    <main className="content">
      <Header
        isNavigationPopupOpen={isNavigationPopupOpen}
        isOpen={isOpen}
        onClose={onClose}
        onOverlayClose={onOverlayClose}
      />
      <SearchForm
        input={input}
        errоr={setError}
        onSearch={handleSearchSubmit}
      />
      { isLoading ?
        <Preloader /> :
        <>
          <MoviesCardList
            searchMovie={movieSearch}
            cards={cards}
            moviesRoute={moviesRoute}
            isLoading={isLoading}
          />
          <MoviesMore
            moviesMore={moviesMore}
          />
        </>
      }
      <Footer />
    </main>
  );
}

export default Movies;
