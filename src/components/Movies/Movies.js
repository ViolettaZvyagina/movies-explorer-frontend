import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesMore from './MoviesMore/MoviesMore';

function Movies({
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
      <MoviesMore />
      <Footer />
      </main>
  );
}

export default Movies;
