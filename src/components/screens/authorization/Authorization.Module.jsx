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



import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("https://localhost:7157/Authorization", { 
      username: username,
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

export default Login;