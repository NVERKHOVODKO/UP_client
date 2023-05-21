import './ReplenishTheBalance.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";

function ReplenishTheBalance({ id }) {
    const [quantityUsd, setQuantity] = useState();
    const [userId] = useState(id);
    const [errorMessage, setErrorMsg] = useState('_______________________________________________');


    function handleReplanish(event) {
        if(quantityUsd != null){
            if(commission == 0){
                setErrorMsg("Некорректные данные");
                return;
            }
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
    const [commission, setCommission] = useState('0');

    function getCommission(quantity){
        setCommission(quantity*0.02)
    }

    const handleInputChange = (event) =>{
        setQuantity(event.target.value)
        getCommission(event.target.value)
    }

    return (
        <div className='replanish'>
            <div className='inputReplanishForm'>
                <input className='inputReplanish' type="number" placeholder="Введите сумму" value={quantityUsd} onChange={handleInputChange} />
                <h3 className="errorText">{errorMessage}</h3>
                <div>
                Коммиссия составит ~ {commission >= 0 ? (commission) : '?'} USDT
                </div>
                <div>
                    Вы получите ~ {(quantityUsd - commission) >= 0 ? (quantityUsd - commission) : '?'} USDT
                </div>
                <button className='btnReplanish' onClick={handleReplanish}>Пополнить баланс</button>
            </div>
        </div>
    );
}

export default ReplenishTheBalance;