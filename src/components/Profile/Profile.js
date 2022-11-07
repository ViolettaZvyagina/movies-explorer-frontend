import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Profile.css';

function Profile() {
  return (
    <section className="profile">
      <Header />
      <main className="profile__content">
        <h2 className="profile__title">Привет, Виолетта!</h2>

        <form className="profile__form" name="profile">
          <label className="profile__label profile__label_position_first" htmlFor="name-input">
            Имя
            <input
              className="profile__input profile__input_value_name"
              type="text"
              id="name-input"
              name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              required
            />
          </label>

          <label className="profile__label profile__label_position_second" htmlFor="email-input">
            E-mail
            <input
              className="profile__input profile__input_value_email"
              type="email"
              id="email-input"
              name="email"
              placeholder="E-mail"
              minLength="2"
              maxLength="30"
              required
            />
          </label>

          <button className="profile__button_edit">Редактировать</button>
        </form>

        <Link className="profile__button_signout" to="/">Выйти из аккаунта</Link>
      </main>
    </section>
  );
}

export default Profile;
