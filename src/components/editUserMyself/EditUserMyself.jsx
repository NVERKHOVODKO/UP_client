import './EditUserMyself.css';
import axios from 'axios';
import React, { useState } from "react";

function EditUserMyself({ id }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMsg] = useState('_________________________________________________________________________________________________________________________________________________________________');


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
                setErrorMsg(response.data);
                console.log(response.data);
            })
            .catch(error => {
                setErrorMsg(error.response.data);
                console.error(error);
            });
    }


    function handleEditPassword(event) {
        console.log("id: " + id + "\nPassword: " + password + "\nPasswordRepeat: " + passwordRepeat);
        event.preventDefault();
        axios.put('https://localhost:7157/User/editUserPassword', { id, password, passwordRepeat })
            .then(response => {
                setErrorMsg(response.data);
                console.log(response.data);
            })
            .catch(error => {
                setErrorMsg(error.response.data);
                console.error(error);
            });
    }

    function handleEditEmail(event) {
        console.log("id: " + id + "\nemail: " + email);
        event.preventDefault();
        axios.put('https://localhost:7157/User/editUserEmail', { id, email })
            .then(response => {
                setErrorMsg(response.data);
                console.log(response.data);
            })
            .catch(error => {
                setErrorMsg(error.response.data);
                console.error(error);
            });
    }

    return (
        <div className='editPanel'>
            <h2 className='personalDataLbl'>
                Персональные данные
            </h2>
            <div className='errorLbl'>
                <h3 className="errorText">{errorMessage}</h3>
            </div>
            <div className='editContainer'>
                <div className='inputFormLogin'>
                    <div>
                        <div className='editOperationLbl'>
                            <h3>
                                Редактировать имя пользователя
                            </h3>
                        </div>
                        <input className='inputFieldEdit' type="text" placeholder="Введите логин" value={login} onChange={(event) => setLogin(event.target.value)} />
                    </div>
                    <div>
                        <button className='btnEditLogin' onClick={handleEditLogin}>Изменить логин</button>
                    </div>
                </div>
                <div className='inputFormPassword'>
                    <div className='editOperationLbl'>
                        <h3>
                            Изменить пароль
                        </h3>
                    </div>
                    <div className='passwordContainer'>
                        <div className='inputPasswords'>
                            <input className='inputFieldEdit' type="text" placeholder="Введите пароль" value={password} onChange={(event) => setPassword(event.target.value)} />
                            <input className='inputFieldEdit' type="text" placeholder="Повторите пароль" value={passwordRepeat} onChange={(event) => setPasswordRepeat(event.target.value)} />
                        </div>
                        <div>
                            <button className='btnEditPassword' onClick={handleEditPassword}>Изменить пароль</button>
                        </div>
                    </div>
                </div>
                <div className='inputFormEmail'>
                    <div className='editOperationLbl'>
                        <h3>
                            Изменить Email
                        </h3>
                    </div>
                    <div>
                        <input className='inputFieldEdit' type="text" placeholder="Введите email" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <button className='btnEditEmail' onClick={handleEditEmail}>Изменить email</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUserMyself;