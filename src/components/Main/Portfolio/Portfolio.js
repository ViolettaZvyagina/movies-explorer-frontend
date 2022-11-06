import './Portfolio.css';
import arrow from '../../../images/Portfolio/portfolio-arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-element">
          <a href="https://github.com/ViolettaZvyagina/how-to-learn" className="portfolio__list-link"
             target="_blank" rel="noreferrer">Статичный сайт</a>
          <img src={arrow} alt="стрелка" className="portfolio__list-image"/>
        </li>
        <li className="portfolio__list-element">
          <a href="https://github.com/ViolettaZvyagina/russian-travel" className="portfolio__list-link"
             target="_blank" rel="noreferrer">Адаптивный сайт</a>
          <img src={arrow} alt="стрелка" className="portfolio__list-image"/>
        </li>
        <li className="portfolio__list-element">
          <a href="https://github.com/ViolettaZvyagina/react-mesto-api-full" className="portfolio__list-link"
             target="_blank" rel="noreferrer">Одностраничное приложение</a>
          <img src={arrow} alt="стрелка" className="portfolio__list-image"/>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
