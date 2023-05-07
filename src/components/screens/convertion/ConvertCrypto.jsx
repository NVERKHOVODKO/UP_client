import './ConvertCrypto.css';
import usdtIcon from '../../../assets/images/cryptoicons_png/64/usdt.png';
import mainIcon from '../../../assets/images/UP_cryptowallet.png';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function BuyCryptoForm(props) {
    const { id, login, password, email, creationData, isBlocked, isDeleted, modificationDate, roleId, salt } = props.location.state;
    const [errorMessage, setText] = useState('________________________________________________________________');
    const [quantityCoinConvert, setQuantityCoinConvertText] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
    };

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

    const [shortNameStart, setShortNameStart] = useState('btc');
    const [shortNameFinal, setShortNameFinal] = useState('btc');
    const [quantity, setQuantity] = useState();
    const [userId, setUserId] = useState(id);


    const handleStartTokenChange = (event) => {
        const selectedCoin = coins.find((coin) => coin.value === event.target.value);
        if (selectedCoin) {
            GetConvertQuantityWithFirstCoin(selectedCoin.value.toLowerCase());
            setShortNameStart(selectedCoin.value.toLowerCase());
            setIconStart(coinIcoins['./' + selectedCoin.value.toLowerCase() + '.png']);
            fetchCoinQuantity(selectedCoin.value.toLowerCase());
        }
    }

    const handleFinalTokenChange = (event) => {
        const selectedCoin = coins.find((coin) => coin.value === event.target.value);
        if (selectedCoin) {
            GetConvertQuantity(selectedCoin.value.toLowerCase());
            setShortNameFinal(selectedCoin.value.toLowerCase());
            setIconFinal(coinIcoins['./' + selectedCoin.value.toLowerCase() + '.png']);
        }
    }

    const coinIcoins = {};
    function importAllCoinsIcons(r) {
        r.keys().forEach((key) => (coinIcoins[key] = r(key)));
    }
    importAllCoinsIcons(require.context("../../../assets/images/cryptoicons_png/128", false, /\.(png|jpe?g|svg)$/));


    function handleConvert(event) {
        setText('Загрузка...');
        event.preventDefault();
        axios.post('https://localhost:7157/Transaction/convert', { shortNameStart, shortNameFinal, quantity, userId })
            .then(response => {
                setText(response.data);
            })
            .catch(error => {
                setText(error.response.data);
                console.log(error);
            });
    }

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value)
    }

    const [isMasked, setIsMasked] = useState(false);

    const handleMaskBalance = () => {
        setIsMasked(!isMasked);
    };
    const maskedBalance = "*********";
    const [balanceData, setBalanceData] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("https://localhost:7157/Currency/getUserBalance?userId=" + id)
            .then(response => {
                console.log(data);
                setBalanceData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function GetConvertQuantity(secondCoin) {
        setQuantityCoinConvertText('Загрузка...');
        axios.get("https://localhost:7157/Currency/getQuantityAfterConversion?shortNameStart=" + shortNameStart + "&shortNameFinal=" + secondCoin + "&quantity=" + quantity + "&userId=" + id)
                .then(response => {
                    console.log(data);
                    setQuantityCoinConvertText(response.data);
                })
                .catch(error => {
                    setQuantityCoinConvertText('?');
                    console.log(error);
                });
    }

    function GetConvertQuantityWithFirstCoin(firstCoin) {
        setQuantityCoinConvertText('Загрузка...');
        axios.get("https://localhost:7157/Currency/getQuantityAfterConversion?shortNameStart=" + firstCoin + "&shortNameFinal=" + shortNameFinal + "&quantity=" + quantity + "&userId=" + id)
                .then(response => {
                    console.log(data);
                    setQuantityCoinConvertText(response.data);
                })
                .catch(error => {
                    setQuantityCoinConvertText('?');
                    console.log(error);
                });
    }

    const [iconFirst, setIconStart] = useState(coinIcoins['./' + shortNameStart + '.png']);
    const [iconSecond, setIconFinal] = useState(coinIcoins['./' + shortNameFinal + '.png']);
    const [quantityCoin, setCoinQuantity] = useState();

    const fetchCoinQuantity = (coinName) => {
        console.log("id: " + id + "\ncoinName: " + coinName);
        axios
            .get(
                "https://localhost:7157/Currency/getCoinQuantityInUserWallet?userId=" +
                id +
                "&coinName=" + coinName +
                "&quantityUSD="
            )
            .then((response) => {
                setCoinQuantity(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div className="container">
            <div className="navBar">
                <div className="navBar">
                    <img className="upIcon" src={mainIcon} alt="UP icon"></img>
                    <div className="loginLbl">
                        <h2>{login}</h2>
                    </div>
                    <div className="balanceLbl">
                        {balanceData ? (
                            <div>
                                <p>{isMasked ? maskedBalance : balanceData.toFixed(3) + "$"}</p>
                                <button className='btnMaskBalance' onClick={handleMaskBalance}>
                                    {isMasked ? "Показать" : "Скрыть"}
                                </button>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div className="MenuCaseItem">
                        <Link className="MenuCase" to={{ pathname: '/menu', state: props.location.state }}><img className="MenuIcon" src={menuIcoins['./wallet.png']} alt="Buy icon"></img>Кошелек</Link>
                    </div>
                    <div className="MenuCaseItem">
                        <Link className="MenuCase" to={{ pathname: '/convertCrypto', state: props.location.state }}><img className="MenuIcon" src={menuIcoins['./two-arrows.png']} alt="Exchange icon"></img>Конвертировать</Link>
                    </div>
                    <div className="MenuCaseItem">
                        <Link className="MenuCase" to={{ pathname: '/buyCrypto', state: props.location.state }}><img className="MenuIcon" src={menuIcoins['./credit-card.png']} alt="Buy icon"></img>Купить</Link>
                    </div>
                    <div className="MenuCaseItem">
                        <Link className="MenuCase" to={{ pathname: '/sellCrypto', state: props.location.state }}><img className="MenuIcon" src={menuIcoins['./credit-card.png']} alt="Buy icon"></img>Продать</Link>
                    </div>
                    <div className="MenuCaseItem">
                        <Link className="MenuCase" to={{ pathname: '/historyMenu', state: props.location.state }}><img className="MenuIcon" src={menuIcoins['./stake.png']} alt="Sell icon"></img>История</Link>
                    </div>
                    <div className="MenuCaseItem">
                        <Link className="MenuCase" to={{ pathname: '/sendCrypto', state: props.location.state }}> <img className="MenuIcon" src={menuIcoins['./money.png']} alt="Send icon"></img>Отправить</Link>
                    </div>
                    <div className="MenuCaseItem">
                        <Link className="MenuCase" to={{ pathname: '/coins', state: props.location.state }}> <img className="MenuIcon" src={menuIcoins['./cryptocurrencies.png']} alt="Token icon"></img>Токены</Link>
                    </div>
                    <div className="MenuCaseItem">
                        <Link className="MenuCase" to={{ pathname: '/accountMenu', state: props.location.state }}><img className="MenuIcon" src={menuIcoins['./user.png']} alt="Account icon"></img>Аккаунт</Link>
                    </div>
                    <div className="MenuCaseItem">
                        <a className="MenuCase" href="#"> <img className="MenuIcon" src={menuIcoins['./question.png']} alt="Support icon"></img>
                            Поддержка</a>
                    </div>
                    <div className="MenuCaseItem">
                        <Link className="MenuCase" to={{ pathname: '/', state: props.location.state }}><img className="MenuIcon" src={menuIcoins['./power-off.png']}
                            alt="Exit icon"></img>Выход</Link>
                    </div>
                </div>
            </div>
            <div className="buingPanel">
                <div className="panel">
                    <div className="buy-crypto-form">
                        <h1 className='mainLbl'>
                            Конвертировать
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className='firstCoinPanel'>
                                <label>
                                    Отправить:
                                    <br />
                                    <br />
                                    <select className="selectInput" onChange={handleStartTokenChange}>
                                        {coins.map((coin) => (
                                            <option key={coin.value} value={coin.value}>
                                                {coin.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <br />
                                <label>
                                    <h4>max: {quantityCoin ? quantityCoin.toFixed(5) : 0} {shortNameStart.toUpperCase()}</h4>
                                    <br />
                                    <img className='usdtIcon' src={iconFirst} alt="usdt" />
                                    <input className='inputQuantityCoinConvert' type="number" placeholder="Введите сумму" onChange={handleQuantityChange} />
                                </label>
                            </div>
                            <br />
                            <div className="secondCoinPanel">
                                <label>
                                    Получить:
                                    <br />
                                    <br />
                                    <select className="selectInput" onChange={handleFinalTokenChange}>
                                        {coins.map((coin) => (
                                            <option key={coin.value} value={coin.value}>
                                                {coin.label}
                                            </option>
                                        ))}
                                    </select>
                                    <img className='usdtIcon' src={iconSecond} alt="" />
                                </label>
                            </div>
                            <div className='ratePanel'>
                                <br />
                                Вы получите ~ {quantityCoinConvert} {shortNameFinal.toLocaleUpperCase()}
                            </div>
                            <h3 className="errorText">{errorMessage}</h3>
                            <br />
                            <button className='buttonBuy' type="submit" onClick={handleConvert}>Конвертировать</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyCryptoForm;
