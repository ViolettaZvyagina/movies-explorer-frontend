import './NavTab.css';

function NavTab() {
  return (
    <div className="nav-tab">
      <nav className="nav-tab__conent">
        <ul className="nav-tab__list">
          <li className="nav-tab__list-item">
            <a href="#about-project" className="nav-tab__link">О проекте</a>
          </li>
          <li className="nav-tab__list-item">
            <a href="#techs" className="nav-tab__link">Технологии</a>
          </li>
          <li className="nav-tab__list-item">
            <a href="#student" className="nav-tab__link">Студент</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavTab;
