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
  isLogged,
  onSearch,
  input,
  errоr,
}) {
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
        onCheckbox={onCheckbox}
        isChecked={isChecked}
        input={input}
        //errоr={error}
        onSearch={onSearch}
      />
      <MoviesCardList
        movieCards={movieCards}
        cards={cards}
        isMoviesSaved={isMoviesSaved}
        onMoviesDelete={onMoviesDelete}
      />
      <Footer />
    </main>
  );
}

export default SavedMovies;
