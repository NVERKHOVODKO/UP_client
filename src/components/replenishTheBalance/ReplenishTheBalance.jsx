import './ReplenishTheBalance.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";

function ReplenishTheBalance({ id }) {
    const [quantityUsd, setQuantity] = useState();
    const [userId] = useState(id);
    const [errorMessage, setErrorMsg] = useState('_______________________________________________');


    function handleReplanish(event) {
        if(quantityUsd != null){
            console.log("quantityUsd: " + quantityUsd + "\nuserId: " + userId);
            event.preventDefault();
            axios.post('https://localhost:7157/Transaction/replenishTheBalance', { userId, quantityUsd })
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
        }else{
            setErrorMsg("Введите количество");
        }
    }

    return (
        <div className='replanish'>
            <div className='inputReplanishForm'>
                <input type="number" placeholder="Введите сумму" value={quantityUsd} onChange={(event) => setQuantity(event.target.value)} />
                <h3 className="errorText">{errorMessage}</h3>
                <button className='btnEdit' onClick={handleReplanish}>Пополнить баланс</button>
            </div>
        </div>
    );
}

export default ReplenishTheBalance;