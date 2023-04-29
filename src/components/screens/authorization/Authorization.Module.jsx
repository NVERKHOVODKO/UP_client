/* function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("https://localhost:7157/Authorization", {
      login: username,
      password: password
    })
      .then(response => {
        if (response.status === 200) {
          history.push('../userMainMenu/UserMainMenu.Module.jsx');
        }
        /* console.log(response.data);
        // Handle successful login
        const roleId = response.data.roleId;
        setRole(roleId);
        if (roleId === 1) {
          // переход на страницу администратора
          console.log("role: 1");
          window.location.href = "../userMainMenu/UserMainMenu.Module.jsx";
        } else if (roleId === 2) {
          // переход на страницу пользователя
          console.log("role: 2");
          window.location.href = "../userMainMenu/UserMainMenu.Module.jsx";
        } 
      })
      .catch(error => {
        console.log(error);
      });
  }; */

/* import styles from './Authorization.css'
import qrCode from './qrCode.png'
import logo from './UP_logo.png'
import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import MainMenu from '../userMainMenu/UserMainMenu.Module';


function LoginPage() {
  const [login, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setText] = useState('good');

  function handleSubmit(event) {
    event.preventDefault();
    // Отправляем запрос на сервер с логином и паролем
    axios.post('https://localhost:7157/Authorization', { login, password })
      .then(response => {

        if (response.status === 200) {
          console.log(response);
          setText('200: success');
          //MyComponent({ loggedIn, login });
        }
        // Обработка успешного ответа от сервера
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          setText('400: bad request');
        }
        if (error.response && error.response.status === 404) {
          setText('404: not found');
        }
        // Обработка ошибки
        console.log(error);
      });
  }


  if (loggedIn) {
    return <Redirect to="/main-menu" />;
  }
  

  return (
    <div>
       <Helmet>
        <title>UP crypto</title>
      </Helmet>
      <img className='logoImg' src={logo} alt="Logo"></img>
      <div className="container">
        <div className='line'>
        </div>
        <div className="loginForm">
          <form onSubmit={handleSubmit}>
            <h3 className="errorText">{errorMessage}</h3>
            <label>
              Username:
              <input type="text" value={login} onChange={(event) => setUsername(event.target.value)} />
            </label>
            <label>
              Password:
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="qrCodeForm">
          <div className="qrCodeForm">
            <h1>Fast login</h1>
            <img className="imageQrCode" src={qrCode} alt=''></img>
            <h4>Scan this QR code <br /> in <a href="http://www.example.com" target="_self">mobile app</a></h4>
          </div>
        </div>
        <div className='bottomPanel'>
          &copy;2023 UPCrypto.com. All rights reserved. <a href="http://www.example.com" target="_self">Cookie settings</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;*/


/* import styles from './Authorization.css'
import qrCode from './qrCode.png'
import logo from './UP_logo.png'
import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';


function LoginPage() {
  const [password, setPassword] = useState('');
  const [errorMessage, setText] = useState('good');
  const [login, setUsername] = useState('');
  const history = useHistory();

  function handleLogin(event) {
    event.preventDefault();
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
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          setText('400: bad request');
        }
        else if (error.response && error.response.status === 404) {
          setText('404: not found');
        }
        else {
          setText('*: unknown error');
        }
        console.log(error);
      });
  }

  return (
    <div>
      <Helmet>
        <title>UP crypto</title>
      </Helmet>
      <img className='logoImg' src={logo} alt="Logo"></img>
      <div className='line'></div>
      <div className="container">
        <div className="loginForm">
          <form onSubmit={handleLogin}>
            <h3 className="errorText">{errorMessage}</h3>
            <label>
              Username:
              <input type="text" value={login} onChange={(event) => setUsername(event.target.value)} />
            </label>
            <label>
              Password:
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
        <div className="qrCodeForm">
          <div className="qrCodeForm">
            <h1>Fast login</h1>
            <img className="imageQrCode" src={qrCode} alt=''></img>
            <h4>Scan this QR code <br /> in <a href="http://www.example.com" target="_self">mobile app</a></h4>
          </div>
        </div>
        <div className='bottomPanel'>
          &copy;2023 UPCrypto.com. All rights reserved. <a href="http://www.example.com" target="_self">Cookie settings</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage; */

import styles from './Authorization.css'
import qrCode from './qrCode.png'
import logo from './UP_logo.png'
import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';


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
                Username:
                <input className='inputField' type="text" value={login} onChange={(event) => setUsername(event.target.value)} />
              </label>
              <label>
                Password:
                <input className='inputField' type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
              </label>
              <button className='buttonLogin' onClick={handleLogin}>Login</button>
              <div>Don't have an account? <a href="http://www.example.com" target="_self">create new</a></div>
            </div>
          </form>
        </div>
        <div className="qrCodeForm">
          <div className="qrCodeForm">
            <h1>Fast login</h1>
            <img className="imageQrCode" src={qrCode} alt=''></img>
            <h4>Scan this QR code <br /> in <a href="http://www.example.com" target="_self">mobile app</a></h4>
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