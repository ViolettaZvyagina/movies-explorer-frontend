import './AboutProject.css';
import '../MainHeader/MainHeader.css';

function AboutProject() {
  return (
    <section className="about-project">
      <h2 id="about-project" className="main-header">О проекте</h2>
      <ul className="about-project__content">
        <li className="about-project__content-item">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__item-text">Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.</p>
        </li>
        <li className="about-project__content-item">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__item-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно
            было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="progress">
        <ul className="progress__content">
          <li className="progress__line_color_black">1 неделя</li>
          <li className="progress__line_color_grey">4 недели</li>
        </ul>
        <ul className="progress__content">
          <p className="progress__description_position_first">Back-end</p>
          <p className="progress__description_position_second">Front-end</p>
        </ul>
      </div>
    </section>
  );
}

export default AboutProject;
