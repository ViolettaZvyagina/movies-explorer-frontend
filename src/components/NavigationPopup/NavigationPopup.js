import { NavLink } from 'react-router-dom';
import './NavigationPopup.css';

function NavigationPopup({ isOpen, onClose, onOverlayClose }) {
  return (
    <nav className={isOpen
      ? 'navigation-popup navigation-popup_opened'
      : 'navigation-popup'}
      onMouseDown={onOverlayClose}
    >
      <div className="navigation-popup__container">
        <div className="navigation-popup__content">
          <button className="navigation-popup__button" type="button" aria-label="Закрыть" onClick={onClose}></button>
          <ul className="navigation-popup__links">
            <li className="navigation-popup__element">
              <NavLink className="navigation-popup__link" activeClassName="navigation-popup__link_active" to="/" exact={true}>Главная</NavLink>
            </li>
            <li className="navigation-popup__element">
             <NavLink className="navigation-popup__link" activeClassName="navigation-popup__link_active" to="/movies">Фильмы</NavLink>
           </li>
            <li className="navigation-popup__element">
             <NavLink className="navigation-popup__link" activeClassName="navigation-popup__link_active" to="/saved-movies">Сохранённые фильмы</NavLink>
            </li>
          </ul>
        </div>
        <NavLink className="navigation-popup__account" to="/profile"></NavLink>
      </div>
    </nav>
  );
}

export default NavigationPopup;
