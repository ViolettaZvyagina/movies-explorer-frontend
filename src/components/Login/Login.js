import Form from '../Form/Form';
import '../Register/Register.css';
import useFormWithValidation from '../../hooks/UseFormWithValidation';

function Login({onLogin, isLoading}) {

  const {
    isValid,
    inputValues,
    inputErrors,
    handleChange,
  } = useFormWithValidation({});

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({...inputValues});
  };

  return (
    <Form
      title='Рады видеть!'
      text='Ещё не зарегистрированы?'
      link='/signup'
      textLink='Регистрация'
      textButton='Войти'
      name='login'
      onSubmit={handleSubmit}
      isValid={isValid}
      isLoading={isLoading}
    >

      <label className="register__label" htmlFor="email-input">Email</label>
      <input
        required
        minLength="2"
        maxLength="30"
        type="email"
        name="email"
        pattern="^[\w]+@[a-zA-Z]+\.[a-zA-Z]{1,3}$"
        value={inputValues.email || ''}
        onChange={handleChange}
        disabled={isLoading}
        id="email-input"
        className="register__input login__input_type_email"
        placeholder="Email"
      />
      <span className="register__input-error register__input-error_place_first" id="input-email-error">{!isValid && inputErrors.email}</span>

      <label className="register__label" htmlFor="password-input">Пароль</label>
      <input
        required
        minLength="2"
        maxLength="30"
        type="password"
        name="password"
        value={inputValues.password || ''}
        onChange={handleChange}
        disabled={isLoading}
        id="password-input"
        className="register__input login__input_type_password"
        placeholder="Пароль"
      />
      <span className="register__input-error register__input-error_place_second" id="input-password-error">{!isValid && inputErrors.password}</span>
    </Form>
  );
}

export default Login;
