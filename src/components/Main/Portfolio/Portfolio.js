import './Portfolio.css';
import arrow from '../../../images/Portfolio/portfolio-arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-element">
          <a href="https://github.com/ViolettaZvyagina/how-to-learn" className="portfolio__list-link"
            target="_blank" rel="noreferrer">
            <p className="portfolio__list-text">Статичный сайт</p>
            <img src={arrow} alt="стрелка" className="portfolio__list-image"/>
          </a>
        </li>
        <li className="portfolio__list-element">
          <a href="https://github.com/ViolettaZvyagina/russian-travel" className="portfolio__list-link"
            target="_blank" rel="noreferrer">
            <p className="portfolio__list-text">Адаптивный сайт</p>
            <img src={arrow} alt="стрелка" className="portfolio__list-image"/>
          </a>
        </li>
        <li className="portfolio__list-element">
          <a href="https://github.com/ViolettaZvyagina/react-mesto-api-full" className="portfolio__list-link"
            target="_blank" rel="noreferrer">
            <p className="portfolio__list-text">Одностраничное приложение</p>
            <img src={arrow} alt="стрелка" className="portfolio__list-image"/>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
