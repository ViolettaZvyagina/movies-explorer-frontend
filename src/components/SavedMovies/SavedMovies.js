import Header from '../Header/Header';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Footer from '../Footer/Footer';

function SavedMovies({
  isNavigationPopupOpen,
  isOpen,
  onClose,
  onOverlayClose
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
      <MoviesCardList />
      <Footer />
    </main>
  );
}

export default SavedMovies;
