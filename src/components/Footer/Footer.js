import './Footer.css';

function Footer() {
  return (
    <section className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__list">
        <p className="footer__year">© 2022</p>
        <ul className="footer__links">
          <li className="footer__links-item">
            <a className="footer__link" href="https://practicum.yandex.ru"
              target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className="footer__links-item">
            <a className="footer__link" href="https://github.com/ViolettaZvyagina"
              target="_blank" rel="noreferrer">Github</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Footer;
