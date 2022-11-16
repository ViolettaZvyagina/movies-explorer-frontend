import Header from '../Header/Header';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import MoviesMore from '../Movies/MoviesMore/MoviesMore';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Footer from '../Footer/Footer';

function SavedMovies({
  isNavigationPopupOpen,
  isOpen,
  onClose,
  onOverlayClose,
  movieCards,
  cards
}) {
  return (
    <main className="content">
      <Header
        isNavigationPopupOpen={isNavigationPopupOpen}
        isOpen={isOpen}
        onClose={onClose}
        onOverlayClose={onOverlayClose}
      />
      <SearchForm />
      <MoviesCardList
        movieCards={movieCards}
        cards={cards}
      />
      <Footer />
    </main>
  );
}

export default SavedMovies;
