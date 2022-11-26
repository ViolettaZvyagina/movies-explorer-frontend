import Form from '../Form/Form';
import './Register.css';
import { namePattern } from '../../utils/Сontans';
import useFormWithValidation from '../../hooks/UseFormWithValidation';

function Register({onRegister}) {

  const {
    isValid,
    inputValues,
    inputErrors,
    handleChange,
    resetInputErrors
  } = useFormWithValidation({});

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({...inputValues})
    resetInputErrors();

  };

  return (
    <Form
      title='Добро пожаловать!'
      text='Уже зарегистрированы?'
      link='/signin'
      textLink='Войти'
      textButton='Зарегистрироваться'
      name='register'
      onSubmit={handleSubmit}
      isValid={isValid}
    >

      <label className="register__label" htmlFor="name-input">Имя</label>
      <input
        required
        minLength="2"
        maxLength="30"
        type="name"
        name="name"
        pattern={namePattern}
        value={inputValues.name || ''}
        onChange={handleChange}
        id="name-input"
        className="register__input register__input_type_name"
        placeholder="Имя"
      />
      <span className="register__input-error register__input-error_place_first" id="input-name-error">{!isValid && inputErrors.name}</span>

      <label className="register__label" htmlFor="email-input">Email</label>
      <input
        required
        minLength="2"
        maxLength="30"
        type="email"
        name="email"
        value={inputValues.email || ''}
        onChange={handleChange}
        id="email-input"
        className="register__input register__input_type_email"
        placeholder="Email"
      />
      <span className="register__input-error register__input-error_place_second" id="input-name-error">{!isValid && inputErrors.email}</span>

      <label className="register__label" htmlFor="password-input">Пароль</label>
      <input
        required
        minLength="2"
        maxLength="30"
        type="password"
        name="password"
        value={inputValues.password || ''}
        onChange={handleChange}
        id="password-input"
        className="register__input register__input_type_password"
        placeholder="Пароль"
      />
      <span className="register__input-error register__input-error_place_third" id="input-name-error">{!isValid && inputErrors.password}</span>
    </Form>
  );
}

export default Register;
