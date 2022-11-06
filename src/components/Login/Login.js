import Form from '../Form/Form';
import '../Register/Register.css';

function Login() {
  return (
    <Form
      title='Рады видеть!'
      text='Ещё не зарегистрированы?'
      link='/signup'
      textLink='Регистрация'
      textButton='Войти'
      name='login'
    >

      <label className="register__label" htmlFor="email-input">Email</label>
      <input
        required
        minLength="2"
        maxLength="30"
        type="email"
        name="email"
        id="email-input"
        className="register__input login__input_type_email"
        placeholder="Email"
      />

      <label className="register__label" htmlFor="password-input">Пароль</label>
      <input
        required
        minLength="2"
        maxLength="30"
        type="password"
        name="password"
        id="password-input"
        className="register__input login__input_type_password"
        placeholder="Пароль"
      />
    </Form>
  );
}

export default Login;
