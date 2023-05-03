import styles from './Registration.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../authorization/UP_logo.png'



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
    <div>
      <img className='logoImg' src={logo} alt="Logo"></img>
      <div className='line'>
        <h1>
          Регистрация
        </h1>
      </div>
      <div className="container11">
        <div className="regForm1">
          <form>
            <div className='regDataPlace'>
              <input className='inputField2' type="text" value={login} onChange={(event) => setLogin(event.target.value)} placeholder="Логин" />
              <input className='inputField2' type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Пароль" />
              <input className='inputField2' type="password" value={passwordRepeat} onChange={(event) => setPasswordRepeat(event.target.value)} placeholder="Повторите пароль" />
              <button className='buttonRegistrations' onClick={handleCreateNew}>Создать</button>
              <div className='createNewAccountLbl'><Link className="MenuCase" to={{ pathname: '/', }}>У меня уже есть аккаунт</Link></div>
              <h3 className="errorText1">{errorMessage}</h3>
            </div>
          </form>
        </div>
        <div className='bottomPanel'>
          &copy;2023 UPCrypto.com. All rights reserved. <a href="http://www.example.com" target="_self">Cookie settings</a>
        </div>
      </div>
    </div>
  );
}

export default AuthorizationPage;