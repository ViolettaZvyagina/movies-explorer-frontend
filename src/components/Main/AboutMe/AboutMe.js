import './AboutMe.css';
import '../MainHeader/MainHeader.css';
import Foto from '../../../images/AboutMe/my-foto.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 id="about-me" className="main-header">Студент</h2>
      <div className="about-me__content">
        <div className="about-me__info">
          <h3 className="about-me__title">Виолетта</h3>
          <h4 className="about-me__subtitle">Обучаюсь фронтенд-разработке, 32 года</h4>
          <p className="about-me__text">
            Я родилась в городе Волгограде, сейчас живу в Москве. Закончила Волгоградский
            Государственый университет по специальности "история и международные отношения".
            Более 6 лет проработала в банковской сфере. Мне всегда нравилось изучать что-то
            новое, анализировать, решать сложные задачи. В IT я как раз могу применить все
            эти способности. В данный момент заканчиваю курс по веб-разработке на Яндекс.Практикуме,
            чтобы в дальнейшем реализовать себя в новой профессии.
          </p>
          <a className="about-me__link"
           href="https://github.com/ViolettaZvyagina"
            target="_blank"
           rel="noopener noreferrer">
            Github
          </a>
        </div>
        <img className="about-me__foto" src={ Foto } alt="моё фото" />
      </div>
    </section>
  );
}

export default AboutMe;
