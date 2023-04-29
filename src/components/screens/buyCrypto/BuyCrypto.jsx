/* import React from "react";
import './BuyCrypto.css';


function UserMainMenu() {
    return (
        <div className="container">
            <div className="navBar">
                bar
            </div>
            <div className="buingPanel">
                <div className="panel">
                    
                </div>
            </div>
        </div>
    )
}

export default UserMainMenu */



import './BuyCrypto.css';
import React, { useState } from 'react';
import usdtIcon from '../../../assets/images/cryptoicons_png/64/usdt.png';


function BuyCryptoForm() {
    const [token, setToken] = useState(''); // состояние выбранного токена
    const [amount, setAmount] = useState(0); // состояние введенной суммы

    // обработчик изменения выбранного токена
    const handleTokenChange = (event) => {
        setToken(event.target.value);
    };

    // обработчик изменения введенной суммы
    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    // обработчик отправки формы
    const handleSubmit = (event) => {
        event.preventDefault();
        // отправляем данные на сервер или обрабатываем их здесь
    };

    return (
        <div className="container">
            <div className="navBar">
                bar
            </div>
            <div className="buingPanel">
                <div className="panel">
                    <div className="buy-crypto-form">
                        <h1 className='mainLbl'>
                            Buy crypto
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className='sumPanel'>
                                <label>
                                    Отправить:<input type="number" value={amount} onChange={handleAmountChange} />
                                    <img className='usdtIcon' src={usdtIcon} alt="usdt"/>
                                </label>
                            </div>

                            <br />
                            <div className='coinPanel'>
                                <label>
                                    Получить:
                                    <select value={token} onChange={handleTokenChange}>
                                        <option value="">Выберите токен</option>
                                        <option value="BTC">Bitcoin</option>
                                        <option value="ETH">Ethereum</option>
                                        <option value="LTC">Litecoin</option>
                                    </select>
                                </label>
                            </div>

                            <div className='ratePanel'>
                                fgbknythibgfeodwcvjfn vkoedwnjn gfmen
                            </div>

                            <br />
                            <button className='buttonBuy' type="submit">Купить</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyCryptoForm;
