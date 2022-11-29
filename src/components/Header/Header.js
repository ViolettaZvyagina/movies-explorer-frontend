import {
  Route,
  Switch,
  Link,
  useRouteMatch
} from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../Movies/BurgerMenu/BurgerMenu';
import NavigationPopup from '../NavigationPopup/NavigationPopup';

function Header({
  isNavigationPopupOpen,
  isOpen,
  onClose,
  onOverlayClose,
  isLogged
}) {
  const isMain = useRouteMatch({ path: '/', exact: true });

  return (
    <header className={`${isMain ? 'header_theme_pink' : 'header_theme_white'}`}>
      <div className="header__content">
      <Link className="header__logo" to="/"></Link>
      <Switch>
      { !isLogged ?
        <Route exact path="/">
          <div className="header__info">
            <Link className="header__registration" to="/signup">Регистрация</Link>
            <Link className="header__login" to="/signin">Войти</Link>
          </div>
        </Route> :
        <>
          <Navigation />
          <BurgerMenu
            isNavigationPopupOpen={isNavigationPopupOpen}
            isMain={isMain}
          />
          <NavigationPopup
            isOpen={isOpen}
            onClose={onClose}
            onOverlayClose={onOverlayClose}
          />
        </> }
      </Switch>
      </div>
    </header>
  );
}

export default Header;
