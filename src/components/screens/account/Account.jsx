import './Account.css';
import usdtIcon from '../../../assets/images/cryptoicons_png/64/usdt.png';
import mainIcon from '../../../assets/images/UP_cryptowallet.png';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavBar from '../../navBar/NavBar.jsx';
import accountIcon from '../../../assets/images/businessman.png';
import upIcon from '../../../assets/images/UP_crypto.png';



function BuyCryptoForm(props) {
    const { id, login, password, email, creationData, isBlocked, isDeleted, modificationDate, roleId, salt } = props.location.state;

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

    const [textToCopy, setTextToCopy] = useState(id);

    function copyToClipboard() {
        navigator.clipboard.writeText(textToCopy);
        alert("Текст скопирован в буфер обмена!");
    }

    const menuIcoins = {};

    function importAllMenuIcons(r) {
        r.keys().forEach((key) => (menuIcoins[key] = r(key)));
    }
    importAllMenuIcons(require.context("../../../assets/images/standart_menu_icons", false, /\.(png|jpe?g|svg)$/));


    return (
        <div className="container">
            <div className="navBar">
                <img className="upIcon" src={mainIcon} alt="UP icon"></img>
                <div className="loginLbl">
                    <h2>{login}</h2>
                </div>
                <div className="balanceLbl">
                    {balanceData ? (
                        <div>
                            <p>{isMasked ? maskedBalance : balanceData.toFixed(3) + "$"}</p>
                            <button onClick={handleMaskBalance}>
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
                    <Link className="MenuCase" to={{ pathname: '/menu', state: props.location.state }}><img className="MenuIcon" src={menuIcoins['./user.png']} alt="Buy icon"></img>Аккаунт</Link>
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
            <div className="accountPanel">
                <div className='accountHeadPanel'>
                    <div className='mainUserPanel'>
                        <div className='accountPhoto'>
                            <img className="accountIcon" src={accountIcon} alt="Account icon"></img>
                            <div className='loginPlace'>
                                <h2 className='loginLblMenu'>{login}</h2>
                            </div>
                        </div>
                    </div>
                    <div className='upId'>
                        <div className='upIdLbl'>
                            <h2>
                                UP-ID: {id}
                            </h2>
                        </div>
                        <button className='btnCopyId' onClick={copyToClipboard}>Копировать  ваш UP-ID</button>
                    </div>
                    <div className='upIcon'>
                        <img className='upIconImage' src={upIcon} alt="Account icon"></img>
                    </div>
                </div>

                <div className='buttonsBar'>

                </div>
                <div className='bottomUserPanel'>
                </div>
            </div>
        </div>
    );
}

export default BuyCryptoForm;