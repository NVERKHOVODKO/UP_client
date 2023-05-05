import './EditUserMyself.css';
import axios from 'axios';
import React, { useState } from "react";

function EditUserMyself({ id }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessageLogin, setErrorMsgLogin] = useState('___________________________________');
    const [errorMessagePassword, setErrorMsgPassword] = useState('___________________________________');
    const [errorMessageEmail, setErrorMsgEmail] = useState('___________________________________');


    /* function handleEdit(event) {
        console.log("id: " + id + "\nlogin: " + login + "\npassword: " + password + "\npasswordRepeat: " + passwordRepeat + "\nemail: " + email);
        event.preventDefault();
        axios.put('https://localhost:7157/User/editUser', { id, login, password, passwordRepeat, email })
            .then(response => {
                setErrorMsg(response.data);
                console.log(response.data);
            })
            .catch(error => {
                setErrorMsg(error.response.data);
                console.error(error);
            });
    } */

    function handleEditLogin(event) {
        console.log("id: " + id + "\nlogin: " + login);
        event.preventDefault();
        axios.put('https://localhost:7157/User/editUserLogin', { id, login })
            .then(response => {
                setErrorMsgLogin(response.data);
                console.log(response.data);
            })
            .catch(error => {
                setErrorMsgLogin(error.response.data);
                console.error(error);
            });
    }

    function handleEditPassword(event) {
        console.log("id: " + id + "\nPassword: " + password + "\nPasswordRepeat: " + passwordRepeat);
        event.preventDefault();
        axios.put('https://localhost:7157/User/editUserPassword', { id, password, passwordRepeat })
            .then(response => {
                setErrorMsgPassword(response.data);
                console.log(response.data);
            })
            .catch(error => {
                setErrorMsgPassword(error.response.data);
                console.error(error);
            });
    }

    function handleEditEmail(event) {
        console.log("id: " + id + "\nemail: " + email);
        event.preventDefault();
        axios.put('https://localhost:7157/User/editUserEmail', { id, email })
            .then(response => {
                setErrorMsgEmail(response.data);
                console.log(response.data);
            })
            .catch(error => {
                setErrorMsgEmail(error.response.data);
                console.error(error);
            });
    }

    return (
        <div className='editPanel'>
            <div className='inputFormLogin'>
                <input className='inputField4' type="text" placeholder="Введите логин" value={login} onChange={(event) => setLogin(event.target.value)} />
                <h3 className="errorText">{errorMessageLogin}</h3>
                <button className='btnEdit1' onClick={handleEditLogin}>Изменить логин</button>
            </div>
            <div className='inputFormPassword'>
                <input className='inputField4' type="text" placeholder="Введите пароль" value={password} onChange={(event) => setPassword(event.target.value)} />
                <input className='inputField4' type="text" placeholder="Повторите пароль" value={passwordRepeat} onChange={(event) => setPasswordRepeat(event.target.value)} />
                <h3 className="errorText">{errorMessagePassword}</h3>
                <button className='btnEdit1' onClick={handleEditPassword}>Изменить пароль</button>
            </div>
            <div className='inputFormEmail'>
                <input className='inputField4' type="text" placeholder="Введите email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <h3 className="errorText">{errorMessageEmail}</h3>
                <button className='btnEdit1' onClick={handleEditEmail}>Изменить email</button>
            </div>
        </div>
    );
}

export default EditUserMyself;