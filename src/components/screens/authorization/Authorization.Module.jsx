/* function Authorization(){
    return(
        <div>
            <h1>
                Authorization
            </h1>
            <div>
                
            </div>
        </div>
    )
}

export default Authorization */

/* import styles from './Authorization.css'
import qrCode from './qrCode.png'
import logo from './UP_logo.png'

function Authorization() {
    return (
        <div>
            <img className='logoImg' src={logo} alt="Logo"></img>
            <div className="container">
                <div className='line'>
                </div>
                <div className="loginForm">
                    <label for="username">Username or email:</label>
                    <input type="text" id="username" name="username"></input>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password"></input>
                </div>
                <div className="qrCodeForm">
                    <div>
                        <h3>Fast login</h3>
                        <img className={styles.imageQrCode} src={qrCode} alt=''></img>
                        <h4>Scan this QR code <br /> in <a href="http://www.example.com" target="_self">mobile app</a></h4>
                    </div>
                </div>
                <div className='bottomPanel'>
                    &copy;2023 UPCrypto.com. All rights reserved. <a href="http://www.example.com" target="_self">Cookie settings</a>
                </div>
            </div>
        </div>
    )
}

export default Authorization */



/* import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("https://localhost:7157/Authorization", { 
      login: username,
      password: password
    })
      .then(response => {
        console.log(response.data);
        // Handle successful login
      })
      .catch(error => {
        console.log(error);
        // Handle failed login
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login; */



/* import React, { useState } from "react";
import axios from "axios";
import styles from './Authorization.css'
import qrCode from './qrCode.png'
import logo from './UP_logo.png'
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    axios.post("https://localhost:7157/Authorization", {
      login: username,
      password: password
    })
    if (response.status === 200) {
      history.push('/src/components/screens/userMainMenu/UserMainMenu.Module.jsx');
    }
  }

  return (
    <div>
      <img className='logoImg' src={logo} alt="Logo"></img>
      <div className="container">
        <div className='line'>
        </div>
        <div className="loginForm">
          <form className="loginForm" onSubmit={handleSubmit}>
            <label>
              Username:
              <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
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
            <h3>Fast login</h3>
            <img className="imageQrCode" src={qrCode} alt=''></img>
            <h4>Scan this QR code <br /> in <a href="http://www.example.com" target="_self">mobile app</a></h4>
          </div>
        </div>
        <div className='bottomPanel'>
          &copy;2023 UPCrypto.com. All rights reserved. <a href="http://www.example.com" target="_self">Cookie settings</a>
        </div>
      </div>
    </div>
  )
}

export default Login; */







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

export default LoginPage;
 */

import styles from './Authorization.css'
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
    // Отправляем запрос на сервер с логином и паролем
    axios.post('https://localhost:7157/Authorization', { login, password })
      .then(response => {
        if (response.status === 200) {
          console.log(response);
          setText('200: success');
          if (login.trim()) {
            //const user = response.json();
            //var jsonResponse = JSON.parse(response.data);
            //var jsonResponse = response.data;

            const jsonResponse = {
              "id": 14,
              "login": "string",
              "password": "9e3f50aac21c57fc122e9f9a7231550bbc8e77579109be887c46c4be0f2f268a",
              "email": "string",
              "creationData": "2023-04-17T14:34:29.24797",
              "modificationDate": "2023-04-17T14:34:29.247972",
              "isDeleted": false,
              "isBlocked": false,
              "roleId": 1,
              "salt": "yolmYDiA8JoGPD4A+p3P9Q=="
            };
            history.push('/menu', {jsonResponse});
          }
          //setLoggedIn(true); // Обновляем состояние loggedIn на true в случае успешной авторизации
        }
        // Обработка успешного ответа от сервера
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          setText('400: bad request');
        }
        else if (error.response && error.response.status === 404) {
          setText('404: not found');
        }
        else{
          setText('*: unknown error');
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
      <div className="container">
        <div className='line'>
        </div>
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

export default LoginPage;


/* import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    if (username.trim()) {
      history.push('/menu', { username });
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
}

export default Login; */


/* import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    if (username.trim()) {
      try {
        const response = await fetch('https://your-api-url.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });

        if (response.ok) {
          const user = await response.json();
          history.push('/menu', { user });
        } else {
          // Обработка ошибки
          console.error('Ошибка авторизации');
        }
      } catch (error) {
        // Обработка ошибки
        console.error('Ошибка запроса:', error);
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
}

export default Login; */