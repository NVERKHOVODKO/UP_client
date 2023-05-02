import styles from './Registration.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function AuthorizationPage() {
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [login, setLogin] = useState('');
  const [errorMessage, setText] = useState('');

  function handleCreateNew(event) {
    event.preventDefault();
    console.log("Login: " + login + "\nPassword: " + password + "\nPasswordRep: " + passwordRepeat);
    // Отправляем запрос на сервер с логином и паролем
    axios.post('https://localhost:7157/Authorization/register', { login, password, passwordRepeat })
      .then(response => {
        if (response.status === 200) {
          setText(response.data);
          const user = response.data;
          const userParams = {
            id: user.id,
            login: user.login,
            password: user.password,
            email: user.email,
            creationData: user.creationData,
            isBlocked: user.isBlocked,
            isDeleted: user.isDeleted,
            modificationDate: user.modificationDate,
            roleId: user.roleId,
            salt: user.salt,
          };
        }
        // Обработка успешного ответа от сервера
      })
      .catch(error => {
        console.error(error.response.data);
        setText(error.response.data);
      });
  }



  return (
    <div className='container1'>
      <h1>Регистрация</h1>
      <div className='regForm'>
        <input className='inputField1' type="text" value={login} onChange={(event) => setLogin(event.target.value)} placeholder="Введите логин" />
        <input className='inputField1' type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Введите пароль" />
        <input className='inputField1' type="password" value={passwordRepeat} onChange={(event) => setPasswordRepeat(event.target.value)} placeholder="Повторите пароль" />
        <h3 className="errorText">{errorMessage}</h3>
        <label>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
        <button className='buttonLogin' onClick={handleCreateNew}>Создать аккаунт</button>
        <Link to={{ pathname: '/', }}>У меня уже есть аккаунт</Link>
      </div>
    </div>
  );
}

export default AuthorizationPage;