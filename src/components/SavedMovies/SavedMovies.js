import Header from '../Header/Header';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Footer from '../Footer/Footer';

function SavedMovies({
  isNavigationPopupOpen,
  isOpen,
  onClose,
  onOverlayClose,
  movieCards,
  cards,
  isMoviesSaved,
  onMoviesDelete,
  onCheckbox,
  isChecked,
  isMovieShort,
}) {
  return (
    <main className="content">
      <Header
        isNavigationPopupOpen={isNavigationPopupOpen}
        isOpen={isOpen}
        onClose={onClose}
        onOverlayClose={onOverlayClose}
      />
      <SearchForm
        onCheckbox={onCheckbox}
        isChecked={isChecked}
      />
      <MoviesCardList
        movieCards={movieCards}
        cards={cards}
        isMoviesSaved={isMoviesSaved}
        onMoviesDelete={onMoviesDelete}
        //isMovieShort={isMovieShort}
      />
      <Footer />
    </main>
  );
}

export default SavedMovies;
