import styles from './Authorization.css'
import qrCode from './qrCode.png'
import logo from './UP_logo.png'
import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


function LoginPage() {
  const [password, setPassword] = useState('');
  const [errorMessage, setText] = useState('');
  const [login, setUsername] = useState('');
  const history = useHistory();

  function handleLogin(event) {
    event.preventDefault();
    // Отправляем запрос на сервер с логином и паролем
    axios.post('https://localhost:7157/Authorization', { login, password })
      .then(response => {
        if (response.status === 200) {
          setText('200: success');
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
          history.push('/menu', userParams);
        }
        // Обработка успешного ответа от сервера
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          setText('400: There is no such user');
        }
        else if (error.response && error.response.status === 404) {
          setText('404: There is no such user');
        }
        else {
          setText('An unknown error occurred');
        }
        // Обработка ошибки
        console.log(error);
      });
  }

  return (
    <div>
      {/* <Helmet>
        <title>UP crypto</title>
      </Helmet> */}
      <img className='logoImg' src={logo} alt="Logo"></img>
      <div className='line'></div>
      <div className="container">
        <div className="loginForm">
          <form onSubmit={handleLogin}>
            <div className='loginDataPlace'>
              <h3 className="errorText">{errorMessage}</h3>
              <label>
                Имя пользователя:
                <input className='inputField2' type="text" value={login} onChange={(event) => setUsername(event.target.value)} placeholder="Логин"/>
              </label>
              <label>
                Пароль:
                <input className='inputField2' type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Пароль"/>
              </label>
              <button className='buttonLogin' onClick={handleLogin}>Login</button>
              <div className='createNewAccountLbl'>Нет аккаунта?<Link className="MenuCase" to={{ pathname: '/registration', }}>создайте новый</Link></div>
            </div>
          </form>
        </div>
        <div className="qrCodeForm">
          <div className="qrCodeForm">
            <h3>Быстрая авторизация</h3>
            <img className="imageQrCode" src={qrCode} alt=''></img>
            <h4>Отсканируйту этот QR code <br /> в <a href="http://www.example.com" target="_self">мобильном приложении</a></h4>
          </div>
        </div>
        <div className='bottomPanel'>
          &copy;2023 UPCrypto.com. All rights reserved. <a href="http://www.example.com" target="_self">Cookie settings</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;