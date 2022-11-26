import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Movies/Preloader/Preloader/Preloader';
import MoviesErrorBox from '../Movies/MoviesErrorBox/MoviesErrorBox';

function SavedMovies({
  isNavigationPopupOpen,
  isOpen,
  onClose,
  onOverlayClose,
  movieCards,
  cards,
  isMoviesSaved,
  onMoviesDelete,
  isLogged,
  setIsMoviesSaved,
  isLoading,
}) {
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('Нет сохранённых фильмов');
    const [foundSavedMovies, setFoundSavedMovies] = useState([]);

    useEffect(() => {
      setIsChecked(false);

      const isMoviesSaved = JSON.parse(localStorage.getItem('movieSaved'));
      if (isMoviesSaved) {
        setIsMoviesSaved(isMoviesSaved);
      }
    }, [setIsMoviesSaved]);

  function handleSavedSearchSubmit(inputValue, isChecked) {

    try {
      const foundMovies = isMoviesSaved.filter(data => {
        return data.nameRU.toLowerCase().includes(inputValue.toLowerCase());
      });
        setIsMoviesSaved(foundMovies);
        setFoundSavedMovies(foundMovies);

      if (isChecked) {
        const shortMovies = foundMovies.filter((data) => data.duration <= 40);
         setIsMoviesSaved(shortMovies);
         setFoundSavedMovies(shortMovies);
      } else {
        setError('Ничего не найдено');
      }
    } catch (err) {
      console.log(`Ошибка: ${err}`);
      setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
    }
  };

  function handleSavedShortMovies(isChecked) {
    if (isChecked) {
      const shortMoviesCards = isMoviesSaved.filter((data) => data.duration <= 40);
      setIsMoviesSaved(shortMoviesCards);
      if (!isMoviesSaved.length) {
        setError('Ничего не найдено');
    } if (!isChecked) {
        if (foundSavedMovies.length) {
          setIsMoviesSaved(foundSavedMovies);
        } else {
            const isMoviesSaved = JSON.parse(localStorage.getItem('movieSaved'));
            setIsMoviesSaved(isMoviesSaved);
        };
      };
    };
  };

  useEffect(() => {
    handleSavedShortMovies(isChecked)
  }, [isChecked]);

  function handleCheckSaved(e) {
    const isChecked = e.target.checked;
    if (!isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

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
        setError={setError}
        onSearch={handleSavedSearchSubmit}
        onCheckbox={handleCheckSaved}
        isChecked={isChecked}
      />
      { isMoviesSaved.length
      ? ( isLoading
        ? <Preloader />
        : <MoviesCardList
          movieCards={movieCards}
          cards={cards}
          isMoviesSaved={isMoviesSaved}
          onMoviesDelete={onMoviesDelete}
      /> )
      : <MoviesErrorBox
          error={error}
        />
      }
      <Footer />
    </main>
  );
}

export default SavedMovies;
