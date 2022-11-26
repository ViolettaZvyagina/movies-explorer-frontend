import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Profile.css';
import useFormWithValidation from '../../hooks/UseFormWithValidation';
import { namePattern } from '../../utils/Сontans';

function Profile({
  onLogOut,
  isLogged,
  onUpdateProfile,
  currentUser,
  isNavigationPopupOpen,
  isOpen,
  onClose,
  onOverlayClose
}) {

  const {
    isValid,
    inputValues,
    inputErrors,
    handleChange,
    setInputValues,
    resetInputErrors
  } = useFormWithValidation({});

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if(isLogged) {
      resetInputErrors();
      setInputValues({name: currentUser.name, email: currentUser.email});
    }
  }, [currentUser, isLogged]);

  function handleCheckData() {
    const isRepeat = currentUser.name === inputValues.name && currentUser.email === inputValues.email;
    return isRepeat;
  };

  function handleSubmit(event) {
    event.preventDefault();
    setIsDisabled(!isDisabled);
    onUpdateProfile({...inputValues});
  };

  function handleDisable() {
    setIsDisabled(!isDisabled);
  };

  return (
    <section className="profile">
      <Header
        isLogged={isLogged}
        isNavigationPopupOpen={isNavigationPopupOpen}
        isOpen={isOpen}
        onClose={onClose}
        onOverlayClose={onOverlayClose}
       />
      <main className="profile__content">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>

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
              pattern={namePattern}
              value={inputValues.name || ''}
              onChange={handleChange}
              disabled = {!isDisabled}
            />
          </label>
          <span className="profile__input-error" id="input-name-error">{!isValid && inputErrors.name}</span>

          <label className="profile__label profile__label_position_second" htmlFor="email-input">
            E-mail
            <input
              className="profile__input profile__input_value_email"
              type="email"
              id="email-input"
              name="email"
              placeholder="E-mail"
              minLength="7"
              maxLength="30"
              required
              value={inputValues.email || ''}
              onChange={handleChange}
              disabled = {!isDisabled}
            />
          </label>
          <span className="profile__input-error" id="input-name-error">{!isValid && inputErrors.email}</span>

          { !isDisabled
            ? <button className="profile__button_edit" onClick={handleDisable} type="submit">Редактировать</button>
            : <button
                className={`${!isValid || handleCheckData() ? "profile__button_submit " : "profile__button_submit-active"}`}
                onClick={handleSubmit}
                disabled={!isValid || handleCheckData()}
                type="submit">
                  Сохранить
              </button>
          }
        </form>

        <Link className="profile__button_signout" to="/" onClick={onLogOut}>Выйти из аккаунта</Link>
      </main>
    </section>
  );
}

export default Profile;
