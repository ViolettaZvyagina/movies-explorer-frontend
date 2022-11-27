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
  searchedSavedMovies,
  setSearchedSavedMovies
}) {
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('Нет сохранённых фильмов');
    const [foundSavedMovies, setFoundSavedMovies] = useState([]);


  function handleSavedSearchSubmit(inputValue, isChecked) {

    try {
      const foundMovies = isMoviesSaved.filter(data => {
        return data.nameRU.toLowerCase().includes(inputValue.toLowerCase());
      });
        setSearchedSavedMovies(foundMovies);
        //setFoundSavedMovies(foundMovies);

      if (isChecked) {
        const shortMovies = foundMovies.filter((data) => data.duration <= 40);
          setSearchedSavedMovies(shortMovies);
          //setFoundSavedMovies(shortMovies);
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
      const shortMoviesCards = searchedSavedMovies.filter((data) => data.duration <= 40);
      setSearchedSavedMovies(shortMoviesCards);
    }
    if (!isChecked) {
            const isMoviesSaved = JSON.parse(localStorage.getItem('movieSaved'));
            setSearchedSavedMovies(isMoviesSaved);
            console.log(isMoviesSaved)
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