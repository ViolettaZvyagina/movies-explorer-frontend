import { Link } from 'react-router-dom';
import './Form.css';

function Form({
  children,
  title,
  text,
  link,
  textLink,
  textButton,
  name
}) {
  return (
    <section className={`form form_type_${name}`} name={`${name}`}>
      <form className="form__container">
        <div className="form__inputs-container">
          <Link className="form__logo" to="/"></Link>
          <h2 className="form__title">{ title }</h2>

          { children }

        </div>

        <div className="form__button-container">
          <button
            type="submit"
            aria-label="Регистрация"
            className="form__submit-button"
            name={`${name}-button`}
            >
            { textButton }
          </button>
          <div className="form__info">
            <p className="form__text">{ text }</p>
            <Link className="form__link" to={ link }>{ textLink }</Link>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Form;
