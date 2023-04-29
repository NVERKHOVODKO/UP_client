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
import usdtIcon from '../../../assets/images/cryptoicons_png/64/usdt.png';
import mainIcon from '../../../assets/images/UP_cryptowallet.png';
import axios from 'axios';
import React, { useState, useEffect } from "react";


function BuyCryptoForm() {
    const [errorMessage, setText] = useState('-----');

    // обработчик отправки формы
    const handleSubmit = (event) => {
        event.preventDefault();
        //fetchCoinQuantity();
        // отправляем данные на сервер или обрабатываем их здесь
    };

    const [quantityCoin, setCoinQuantity] = useState();

    const fetchCoinQuantity = () => {
        console.log(coinName);
        console.log(quantity);

        axios.get("https://localhost:7157/Transaction/getCoinQuantity?coinName=" + coinName + "&quantityUSD=" + quantity)
            .then(response => {
                setCoinQuantity(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }


    //setText('400: There is no such user');


    const coins = [
        { value: "BTC", label: "Bitcoin - BTC" },
        { value: "ETH", label: "Ethereum - ETH" },
        { value: "USDT", label: "Tether - USDT" },
        { value: "BNB", label: "Binance Coin - BNB" },
        { value: "SOL", label: "Solana - SOL" },
        { value: "ADA", label: "Cardano - ADA" },
        { value: "XRP", label: "XRP - XRP" },
        { value: "DOT", label: "Polkadot - DOT" },
        { value: "DOGE", label: "Dogecoin - DOGE" },
        { value: "UNI", label: "Uniswap - UNI" },
        { value: "LUNA", label: "Terra - LUNA" },
        { value: "LINK", label: "Chainlink - LINK" },
        { value: "AVAX", label: "Avalanche - AVAX" },
        { value: "MATIC", label: "Polygon - MATIC" },
        { value: "SHIB", label: "Shiba Inu - SHIB" },
        { value: "ATOM", label: "Cosmos - ATOM" },
        { value: "FIL", label: "Filecoin - FIL" },
        { value: "XTZ", label: "Tezos - XTZ" },
        { value: "LTC", label: "Litecoin - LTC" },
        { value: "FTT", label: "FTX Token - FTT" },
        { value: "ALGO", label: "Algorand - ALGO" },
        { value: "VET", label: "VeChain - VET" },
        { value: "EOS", label: "EOS - EOS" },
        { value: "TRB", label: "Tellor - TRB" },
        { value: "KSM", label: "Kusama - KSM" },
        { value: "CAKE", label: "PancakeSwap - CAKE" },
        { value: "TFUEL", label: "Theta Fuel - TFUEL" },
        { value: "SUSHI", label: "SushiSwap - SUSHI" },
        { value: "DCR", label: "Decred - DCR" },
        { value: "FET", label: "Fetch.ai - FET" }
    ];

    const menuIcoins = {};
    function importAllMenuIcons(r) {
        r.keys().forEach((key) => (menuIcoins[key] = r(key)));
    }
    importAllMenuIcons(require.context("../../../assets/images/standart_menu_icons", false, /\.(png|jpe?g|svg)$/));

    const [quantity, setQuantity] = useState();
    const [userId, setUserId] = useState('1');
    const [coinName, setCoinName] = useState('btc');

    const handleTokenChange = (event) => {
        const selectedCoin = coins.find((coin) => coin.value === event.target.value);
        if (selectedCoin) {
            setCoinName(selectedCoin.value.toLowerCase());
        }
        fetchCoinQuantity();
    }

    function handleBuy(event) {
        setText('Загрузка...');
        event.preventDefault();
        axios.post('https://localhost:7157/Transaction/buyCrypto', { userId, coinName, quantity })
            .then(response => {
                if (response.status === 200) {
                    setText('Транзакция совершена успешно');
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setText('Транзакция не была выполнена');
                }
                else if (error.response && error.response.status === 422) {
                    setText('Некоректный запрос');
                }
                else {
                    setText('Произошла неизвестная ошибка');
                }
                console.log(error);
            });
    }

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value)
        fetchCoinQuantity();
    }

    return (
        <div className="container">
            <div className="navBar">
                <img className="upIcon" src={mainIcon} alt="UP icon"></img>
                <div className="MenuCaseItem">
                    <a className="MenuCase" href="#">
                        <img className="MenuIcon" src={menuIcoins['./wallet.png']} alt="Wallet icon">
                        </img>
                        Кошелек
                    </a>
                </div>
                <div className="MenuCaseItem">
                    <a className="MenuCase" href="#"> <img className="MenuIcon" src={menuIcoins['./two-arrows.png']} alt="Exchange icon"></img>
                        Конвертировать
                    </a>
                </div>
                <div className="MenuCaseItem">
                    <a className="MenuCase" href="#"> <img className="MenuIcon" src={menuIcoins['./credit-card.png']} alt="Buy icon"></img>Купить</a>
                </div>
                <div className="MenuCaseItem">
                    <a className="MenuCase" href="#"> <img className="MenuIcon" src={menuIcoins['./stake.png']} alt="History icon"></img>
                        История</a>
                </div>
                <div className="MenuCaseItem">
                    <a className="MenuCase" href="#"> <img className="MenuIcon" src={menuIcoins['./stake.png']} alt="Staking icon"></img>
                        Staking</a>
                </div>
                <div className="MenuCaseItem">
                    <a className="MenuCase" href="#"> <img className="MenuIcon" src={menuIcoins['./settings.png']} alt="Settings icon"></img>
                        Настройки</a>
                </div>
                <div className="MenuCaseItem">
                    <a className="MenuCase" href="#"> <img className="MenuIcon" src={menuIcoins['./question.png']} alt="Support icon"></img>
                        Поддержка</a>
                </div>
                <div className="MenuCaseItem">
                    <a className="MenuCase" href="#"> <img className="MenuIcon" src={menuIcoins['./money.png']} alt="Send icon"></img>
                        Отправить</a>
                </div>
                <div className="MenuCaseItem">
                    <a className="MenuCase" href="#" target="_self"> <img className="MenuIcon" src={menuIcoins['./power-off.png']}
                        alt="Exit icon"></img>Выход</a>
                </div>
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
                                    Отправить:
                                    <br />
                                    <br />
                                    <br />
                                    <input type="text" placeholder="Введите сумму" onChange={handleQuantityChange} />
                                    <img className='usdtIcon' src={usdtIcon} alt="usdt" />
                                </label>
                            </div>
                            <br />
                            <div className="coinPanel">
                                <label>
                                    Получить:
                                    <br />
                                    <br />
                                    <select className="selectInput" onChange={handleTokenChange}>
                                        {coins.map((coin) => (
                                            <option key={coin.value} value={coin.value}>
                                                {coin.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className='ratePanel'>
                                <br />
                                Вы получите ~ {quantityCoin} {coinName}
                            </div>
                            <h3 className="errorText">{errorMessage}</h3>
                            <br />
                            <button className='buttonBuy' type="submit" onClick={handleBuy}>Купить</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyCryptoForm;