import './ReplenishTheBalance.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";

function ReplenishTheBalance({id}) {
    const [quantityUsd, setQuantity] = useState(0);
    const [userId] = useState(id);

    function handleReplanish(event) {
        console.log("quantityUsd: " + quantityUsd + "\nuserId: " + userId);
        event.preventDefault();
        axios.post('https://localhost:7157/Transaction/replenishTheBalance', { userId, quantityUsd })
            .then(response => {
                if (response.status === 200) {
                    console.log(response);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className='replanish'>
            <div className='inputForm'>
                <input type="number" placeholder="Введите сумму" value={quantityUsd} onChange={(event) => setQuantity(event.target.value)} />
                <button onClick={handleReplanish}>Пополнить баланс</button>
            </div>
        </div>
    );
}

export default ReplenishTheBalance;