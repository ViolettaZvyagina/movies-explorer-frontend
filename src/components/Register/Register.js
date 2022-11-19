import { useState } from 'react';
import Form from '../Form/Form';
import './Register.css';

function Register({onRegister}) {

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(registerData);
  };

  function handleChange(e) {
    const {name, value} = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    })
  }

  return (
    <Form
      title='Добро пожаловать!'
      text='Уже зарегистрированы?'
      link='/signin'
      textLink='Войти'
      textButton='Зарегистрироваться'
      name='register'
      onSubmit={handleSubmit}
    >

      <label className="register__label" htmlFor="name-input">Имя</label>
      <input
        required
        minLength="2"
        maxLength="30"
        type="name"
        name="name"
        value={registerData.name}
        onChange={handleChange}
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
        value={registerData.email}
        onChange={handleChange}
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
        value={registerData.password}
        onChange={handleChange}
        id="password-input"
        className="register__input register__input_type_password"
        placeholder="Пароль"
      />
    </Form>
  );
}

export default Register;
