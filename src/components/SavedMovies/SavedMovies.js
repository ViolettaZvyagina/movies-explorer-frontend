import { useEffect, useState, useContext } from 'react';
import AppContext from '../../contexts/AppContext';
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
  isLogged,
  isLoading,
  searchedSavedMovies,
  setSearchedSavedMovies,
  setIsLoading
}) {
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('Нет сохранённых фильмов');
    const [foundSavedMovies, setFoundSavedMovies] = useState([]);
    const {isMoviesSaved, cards, onMoviesDelete} = useContext(AppContext);

  function handleSavedSearchSubmit(inputValue, isChecked) {

    setIsLoading(true);
    try {
      const movieSaved = JSON.parse(localStorage.getItem('movieSaved'));
      const foundMovies = movieSaved.filter(data => {
        return data.nameRU.toLowerCase().includes(inputValue.toLowerCase());
      });
        setSearchedSavedMovies(foundMovies);
        setFoundSavedMovies(foundMovies);

      if (isChecked) {
        const shortMovies = foundMovies.filter((data) => data.duration <= 40);
          setSearchedSavedMovies(shortMovies);
      } else {
        setError('Ничего не найдено');
      }
    } catch (err) {
      console.log(`Ошибка: ${err}`);
      setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
    } finally {
      setTimeout(()=> setIsLoading(false), 300);
    }
  };

  function handleSavedShortMovies(isChecked) {
    if (isChecked) {
      const shortMoviesCards = searchedSavedMovies.filter((data) => data.duration <= 40);
      setSearchedSavedMovies(shortMoviesCards);
    }
    if (!isChecked && foundSavedMovies.length) {
      setSearchedSavedMovies(foundSavedMovies);
    }
    if (!isChecked && !foundSavedMovies.length) {
      const movieSaved = JSON.parse(localStorage.getItem('movieSaved'));
      setSearchedSavedMovies(movieSaved);
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
      { searchedSavedMovies.length
      ? ( isLoading
        ? <Preloader />
        : <MoviesCardList
          movieCards={movieCards}
          cards={cards}
          isMoviesSaved={isMoviesSaved}
          onMoviesDelete={onMoviesDelete}
          movies={searchedSavedMovies}
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