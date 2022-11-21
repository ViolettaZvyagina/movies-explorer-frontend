import { useEffect, useState, useLayoutEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader/Preloader';

function Movies({
  isNavigationPopupOpen,
  isOpen,
  onClose,
  onOverlayClose,
  cards,
  setMovies,
  input,
  movieSearch,
  onSearch,
  isLoading,
  isMoviesSaved,
  onMoviesSaved,
  onMoviesDelete,
  onCheckbox,
  isChecked,
  error,
}) {
  const width = handleWindowSize();
  const [moreMovies, setMoreMovies] = useState(0);

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
    setMovies(cards + moreMovies);
  };

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
        errоr={error}
        onSearch={onSearch}
        onCheckbox={onCheckbox}
        isChecked={isChecked}
      />
      { isLoading ? <Preloader /> :
          <MoviesCardList
            searchMovie={movieSearch}
            //isMovieShort={isMovieShort}
            cards={cards}
            isLoading={isLoading}
            moviesMore={handleClickMoreCards}
            isMoviesSaved={isMoviesSaved}
            onMoviesSaved={onMoviesSaved}
            onMoviesDelete={onMoviesDelete}
          />
      }
      <Footer />
    </main>
  );
}

export default Movies;
