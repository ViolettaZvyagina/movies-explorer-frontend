import './Main.css';
import Promo from './Promo/Promo';
import Header from '../Header/Header';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main({
  isLogged,
  isNavigationPopupOpen,
  isOpen,
  onClose,
  onOverlayClose
}) {
  return (
      <main className="content">
        <Header
          isLogged={isLogged}
          isNavigationPopupOpen={isNavigationPopupOpen}
          isOpen={isOpen}
          onClose={onClose}
          onOverlayClose={onOverlayClose}
        />
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
        <Footer />
      </main>
  );
}

export default Main;
