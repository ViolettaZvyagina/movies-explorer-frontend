import Form from '../Form/Form';
import './Register.css';

function Register() {
  return (
    <Form
      title='Добро пожаловать!'
      text='Уже зарегистрированы?'
      link='/signin'
      textLink='Войти'
      textButton='Зарегистрироваться'
      name='register'
    >

      <label className="register__label" htmlFor="name-input">Имя</label>
      <input
        required
        minLength="2"
        maxLength="30"
        type="name"
        name="name"
        id="name-input"
        className="register__input register__input_type_name"
        placeholder="Имя"
      />

      <label className="register__label" htmlFor="email-input">Email</label>
      <input
        required
        minLength="2"
        maxLength="30"
        type="email"
        name="email"
        id="email-input"
        className="register__input register__input_type_email"
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
        className="register__input register__input_type_password"
        placeholder="Пароль"
      />
    </Form>
  );
}

export default Register;
