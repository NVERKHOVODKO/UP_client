import './EditUserMyself.css';
import axios from 'axios';
import React, { useState } from "react";

function EditUserMyself({ id }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [email, setEmail] = useState('');

    function handleEdit(event) {
        console.log("id: " + id + "\nlogin: " + login + "\npassword: " + password + "\npasswordRepeat: " + passwordRepeat + "\nemail: " + email);
        event.preventDefault();
        axios.put('https://localhost:7157/User/editUser', { id, login, password, passwordRepeat, email })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className='replanish'>
            <div className='inputForm'>
                <input type="text" placeholder="Введите логин" value={login} onChange={(event) => setLogin(event.target.value)} />
                <input type="text" placeholder="Введите пароль" value={password} onChange={(event) => setPassword(event.target.value)} />
                <input type="text" placeholder="Повторите пароль" value={passwordRepeat} onChange={(event) => setPasswordRepeat(event.target.value)} />
                <input type="text" placeholder="Введите email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <button onClick={handleEdit}>Редактировать</button>
            </div>
        </div>
    );
}

export default EditUserMyself;