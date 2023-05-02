import './History.css';
import usdtIcon from '../../../assets/images/cryptoicons_png/64/usdt.png';
import mainIcon from '../../../assets/images/UP_cryptowallet.png';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavBar from '../../navBar/NavBar.jsx';



function BuyCryptoForm(props) {
    const { id, login, password, email, creationData, isBlocked, isDeleted, modificationDate, roleId, salt } = props.location.state;
    const [errorMessage, setText] = useState('-----');
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const [quantityCoin, setCoinQuantity] = useState();


    const menuIcoins = {};
    function importAllMenuIcons(r) {
        r.keys().forEach((key) => (menuIcoins[key] = r(key)));
    }
    importAllMenuIcons(require.context("../../../assets/images/standart_menu_icons", false, /\.(png|jpe?g|svg)$/));

    const [receiverId, setRecieverId] = useState(id);
    const [senderId] = useState(id);
    const [coinName, setCoinName] = useState();
    const [quantityForSend, setQuantityForSend] = useState();

    const handleRecieverIdChange = (event) => {
        setRecieverId(event.target.value)
    }

    function handleConvert(event) {
        setText('Загрузка...');
        event.preventDefault();
        axios.post('https://localhost:7157/Transaction/sendCrypto', { receiverId, senderId, coinName, quantityForSend })
            .then(response => {
                if (response.status === 200) {
                    setText('Транзакция совершена успешно');
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setText('Некорректные данные');
                }
                console.log(error);
            });
    }

    const handleQuantityChange = (event) => {
        setQuantityForSend(event.target.value)
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
                                <button className='btnMaskBalance'onClick={handleMaskBalance}>
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
                        <Link className="MenuCase" to={{ pathname: '/historyMenu', state: props.location.state }}><img className="MenuIcon" src={menuIcoins['./stake.png']} alt="Sell icon"></img>История</Link>
                    </div>
                    <div className="MenuCaseItem">
                        <Link className="MenuCase" to={{ pathname: '/sendCrypto', state: props.location.state }}> <img className="MenuIcon" src={menuIcoins['./money.png']} alt="Send icon"></img>Отправить</Link>
                    </div>
                    <div className="MenuCaseItem">
                        <a className="MenuCase" href="#"> <img className="MenuIcon" src={menuIcoins['./settings.png']} alt="Settings icon"></img>
                            Настройки</a>
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
                <nav class="menu">
                    <ul>
                        <li><a href="#section1">Раздел 1</a></li>
                        <li><a href="#section2">Раздел 2</a></li>
                        <li><a href="#section3">Раздел 3</a></li>
                        <li><a href="#section4">Раздел 4</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default BuyCryptoForm;