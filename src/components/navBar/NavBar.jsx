/* import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './NavBar.css';
import usdtIcon from '../../assets/images/cryptoicons_png/64/usdt.png';
import mainIcon from '../../assets/images/UP_cryptowallet.png';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function NavBar(props){
    const locationState = props.locationState;
    const { id, login, password, email, creationData, isBlocked, isDeleted, modificationDate, roleId, salt } = props.location.state;
    const [data, setData] = useState(null);
    const [balanceData, setBalanceData] = useState(null);
    const location = useLocation();
    const response = location.state.response;
    const coinIcoins = {};
    const menuIcoins = {};
    const [isMasked, setIsMasked] = useState(false);
    const maskedBalance = "*********";
    
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

    function importAllMenuIcons(r) {
        r.keys().forEach((key) => (menuIcoins[key] = r(key)));
    }
    importAllMenuIcons(require.context("../../assets/images/standart_menu_icons", false, /\.(png|jpe?g|svg)$/));

    useEffect(() => {
        // здесь можно написать код для получения данных баланса из API или другого источника данных
        setBalanceData(123.456); // для тестирования мы задаем фиктивное значение
    }, []);

    const handleMaskBalance = () => {
        setIsMasked(!isMasked);
    };
    return (
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
    );
}

export default NavBar;




 */


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './NavBar.css';
import usdtIcon from '../../assets/images/cryptoicons_png/64/usdt.png';
import mainIcon from '../../assets/images/UP_cryptowallet.png';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function NavBar(props){
    const { state } = props;
    const { id, login, password, email, creationData, isBlocked, isDeleted, modificationDate, roleId, salt } = props.location.state;
    const [data, setData] = useState(null);
    const [balanceData, setBalanceData] = useState(null);
    const location = useLocation();
    const response = location.state.response;
    const coinIcoins = {};
    const menuIcoins = {};
    const [isMasked, setIsMasked] = useState(false);
    const maskedBalance = "*********";
    
    /* useEffect(() => {
        axios.get("https://localhost:7157/Currency/getUserBalance?userId=" + props.id)
            .then(response => {
                console.log(data);
                setBalanceData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function importAllMenuIcons(r) {
        r.keys().forEach((key) => (menuIcoins[key] = r(key)));
    }
    importAllMenuIcons(require.context("../../assets/images/standart_menu_icons", false, /\.(png|jpe?g|svg)$/));

    useEffect(() => {
        // здесь можно написать код для получения данных баланса из API или другого источника данных
        setBalanceData(123.456); // для тестирования мы задаем фиктивное значение
    }, []);*/

    const handleMaskBalance = () => {
        setIsMasked(!isMasked);
    }; 
    return (
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
    );
}

export default NavBar;