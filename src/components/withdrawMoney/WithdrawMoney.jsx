import './WithdrawMoney.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";

function WithdrawMoney({ id }) {
    const [quantityForWithdraw, setQuantity] = useState();
    const [userId] = useState(id);
    const [errorMessage, setErrorMsg] = useState('-----');

    function handleReplanish(event) {
        if (quantityForWithdraw != null) {
            console.log("quantityUsd: " + quantityForWithdraw + "\nuserId: " + userId);
            event.preventDefault();
            axios.put('https://localhost:7157/Transaction/withdrawUSDT', { userId, quantityForWithdraw })
                .then(response => {
                    if (response.status === 200) {
                        console.log(response);
                        setErrorMsg(response.data);
                    }
                })
                .catch(error => {
                    console.error(error.response.data);
                    setErrorMsg(error.response.data);
                });
        } else {
            setErrorMsg("Введите количество");
        }
    }

    return (
        <div className='replanish'>
            <div className='inputForm'>
                <input type="number" placeholder="Введите сумму" value={quantityForWithdraw} onChange={(event) => setQuantity(event.target.value)} />
                <h3 className="errorText">{errorMessage}</h3>
                <button onClick={handleReplanish}>Вывести</button>
            </div>
        </div>
    );
}

export default WithdrawMoney;