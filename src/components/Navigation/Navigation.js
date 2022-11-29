import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <div className="navigation__container">
        <NavLink className="navigation__films" activeClassName="navigation__films_active" to="/movies">Фильмы</NavLink>
        <NavLink className="navigation__saved-films" activeClassName="navigation__saved-films_active" to="/saved-movies">Сохранённые фильмы</NavLink>
      </div>
      <NavLink className="navigation__account" to="/profile"></NavLink>
    </nav>
  );
}

export default Navigation;
