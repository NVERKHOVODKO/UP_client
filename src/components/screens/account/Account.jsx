import './Account.css';
import mainIcon from '../../../assets/images/UP_cryptowallet.png';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import upIcon from '../../../assets/images/UP_crypto.png';
import LoginHistoryTable from '../../../components/loginHistoryTable/LoginHistoryTable';
import ReplenishTheBalance from '../../../components/replenishTheBalance/ReplenishTheBalance';
import WithdrawMoney from '../../../components/withdrawMoney/WithdrawMoney';
import EditUserMyself from '../../../components/editUserMyself/EditUserMyself';


function BuyCryptoForm(props) {
    const { id, login, password, email, creationData, isBlocked, isDeleted, modificationDate, roleId, salt } = props.location.state;

    const [isMasked, setIsMasked] = useState(false);

    const handleMaskBalance = () => {
        setIsMasked(!isMasked);
    };

    const [errorMessage, setText] = useState('-----');
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

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short'
        };
        return date.toLocaleDateString('ru-RU', options);
    }

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
    const handleButtonClick = (component) => {
        setSelectedComponent(component);
    }

    const [selectedComponent, setSelectedComponent] = useState('loginHistory');

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'loginHistory':
                return <LoginHistoryTable id={id} />;
            case 'replenishBalance':
                return <ReplenishTheBalance id={id} />;
            case 'withdrawMoney':
                return <WithdrawMoney id={id} />;
            case 'editUserMyself':
                return <EditUserMyself id={id} />;
            default:
                return <EditUserMyself id={id} />;
        }
    }

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
                    <Link className="MenuCase" to={{ pathname: '/', state: props.location.state }}><img className="MenuIcon" src={menuIcoins['./power-off.png']}
                        alt="Exit icon"></img>Выход</Link>
                </div>
            </div>
            <div className="accountPanel">
                <div className='accountHeadPanel'>
                    <div className='mainUserPanel'>
                        <div className='upId'>
                            {/* <img className="accountIcon" src={accountIcon} alt="Account icon"></img> */}
                            <div className='loginPlace'>
                                <h2>
                                    UP-ID: {id}
                                </h2>
                            </div>
                            <button className='btnCopyId' onClick={copyToClipboard}>Копировать  ваш UP-ID</button>
                        </div>
                    </div>
                    <div className='upIcon'>
                        <img className='upIconImage' src={upIcon} alt="Account icon"></img>
                    </div>
                </div>
                <div className='buttonsBar'>
                    <nav className="menu1">
                        <ul>
                            <button className="btnAccountMenuCase" onClick={() => handleButtonClick('editUserMyself')}>Редактирование</button>
                            <button className="btnAccountMenuCase" onClick={() => handleButtonClick('loginHistory')}>История</button>
                            <button className="btnAccountMenuCase" onClick={() => handleButtonClick('withdrawMoney')}>Вывод</button>
                            <button className="btnAccountMenuCase" onClick={() => handleButtonClick('replenishBalance')}>Пополнить</button>
                        </ul>
                    </nav>
                </div>
                <div className='bottomUserPanel'>
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
}

export default BuyCryptoForm;