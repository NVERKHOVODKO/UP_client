import './WithdrawMoney.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";

function WithdrawMoney({ id }) {
    const [quantityForWithdraw, setQuantity] = useState(0);
    const [userId] = useState(id);

    function handleReplanish(event) {
        console.log("quantityUsd: " + quantityForWithdraw + "\nuserId: " + userId);
        event.preventDefault();
        axios.put('https://localhost:7157/Transaction/withdrawUSDT', { userId, quantityForWithdraw })
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
                <input type="number" placeholder="Введите сумму" value={quantityForWithdraw} onChange={(event) => setQuantity(event.target.value)} />
                <button onClick={handleReplanish}>Вывести</button>
            </div>
        </div>
    );
}

export default WithdrawMoney;