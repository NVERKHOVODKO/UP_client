import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import CoinTable from '../userMainMenu/CoinTable.js';
import styles from './Coins.css'
import mainIcon from '../../../assets/images/UP_cryptowallet.png';
import logo from '../userMainMenu/UserMainMenu.Module.jsx'
import { Link } from 'react-router-dom';
import NavBar from '../../navBar/NavBar.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import loadingGif from '../../../assets/images/loading.gif'


function App(props) {
  const { id, login, password, email, creationData, isBlocked, isDeleted, modificationDate, roleId, salt } = props.location.state;
  const [data, setData] = useState([]);
  const [balanceData, setBalanceData] = useState(null);
  const [coinName, setCoinName] = useState('');
  const location = useLocation();
  const response = location.state.response;
  const coinIcoins = {};
  const menuIcoins = {};
  const [isMasked, setIsMasked] = useState(false);
  const maskedBalance = "*********";

  useEffect(() => {
    axios.get("https://localhost:7157/Currency/getCurrenciesList")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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

  const imagePath = "C:/НЕ СИСТЕМА/BSUIR/второй курс/UP_client/src/assets/images/cryptoicons_png/128/btc.png";

  function formatNumber(num) {
    if (num >= 1e9) { // если число больше или равно 1 миллиарду
      return (num / 1e9).toFixed(2) + ' B$'; // делим на 1 миллиард, округляем до 2 знаков после запятой и добавляем букву B
    } else if (num >= 1e6) { // если число больше или равно 1 миллиону
      return (num / 1e6).toFixed(2) + ' M$'; // делим на 1 миллион, округляем до 2 знаков после запятой и добавляем букву M
    } else if (num >= 1e3) { // если число больше или равно 1 тысяче
      return (num / 1e3).toFixed(2) + ' T$'; // делим на 1 тысячу, округляем до 2 знаков после запятой и добавляем букву T
    } else { // если число меньше 1 тысячи
      return num.toString(); // возвращаем число в строковом формате
    }
  }

  function formatPercentage(num) {
    const sign = num >= 0 ? '+' : '-'; // определяем знак числа
    const percentage = Math.abs(num).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%'; // получаем процентное значение и форматируем его с помощью toLocaleString()

    return sign + percentage; // возвращаем число с знаком "+" или "-"
  }

  function priceImpact(num) {
    const sign = num >= 0 ? '+' : '-'; // определяем знак числа
    const percentage = Math.abs(num).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 3 }) + '$'; // получаем процентное значение и форматируем его с помощью toLocaleString()

    return sign + percentage; // возвращаем число с знаком "+" или "-"
  }


  function importAllCoinsIcons(r) {
    r.keys().forEach((key) => (coinIcoins[key] = r(key)));
  }
  importAllCoinsIcons(require.context("../../../assets/images/cryptoicons_png/128", false, /\.(png|jpe?g|svg)$/));


  function importAllMenuIcons(r) {
    r.keys().forEach((key) => (menuIcoins[key] = r(key)));
  }
  importAllMenuIcons(require.context("../../../assets/images/standart_menu_icons", false, /\.(png|jpe?g|svg)$/));


  const handleMaskBalance = () => {
    setIsMasked(!isMasked);
  };

  const btnSearchClick = () => {

  }

  const handleTokenNameChange = (event) => {
    setCoinName(event.target.value);
  }

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCoins = data.filter(coin =>
    coin.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [userName, setUserName] = useState('');

  useEffect(() => {
    axios.get("https://localhost:7157/User/getUserLoginById?id=" + id)
      .then(response => {
        console.log("Username:" + data);
        setUserName(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <div className="navBar">
        <img className="upIcon" src={mainIcon} alt="UP icon"></img>
        <div className="loginLbl">
          <h2>{userName}</h2>
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
            <p>0$</p>
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
          <Link className="MenuCase" to={{ pathname: '/sellCrypto', state: props.location.state }}><img className="MenuIcon" src={menuIcoins['./sell.png']} alt="Buy icon"></img>Продать</Link>
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
      <div className='coinListPanel'>
        <div className='searchCoinBar'>
          <div className='searchPanel'>
            <input className='inputField1' type="text" placeholder="Введите название монеты" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="coinListFull">
          {data ? (
            <table className="tableCoins">
              <thead>
                <tr className='tableHead'>
                  <th>Монета</th>
                  <th>Полн. назв.</th>
                  <th>Сокр.</th>
                  <th>Цена</th>
                  <th>Дневн. объем</th>
                  <th>Изм. цены</th>
                  <th>Проц. изм.</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoins.map(coin => (
                  <tr key={coin.id}>
                    <td>
                      <img className="coinIcon" src={coinIcoins['./' + coin.shortName + '.png']} alt="icon" />
                    </td>
                    <td>{coin.fullName}</td>
                    <td>{coin.shortName}</td>
                    <td>{(coin.price) + '$'}</td>
                    <td>{formatNumber(coin.dailyVolume)}</td>
                    <td>{priceImpact(coin.dailyImpact)}</td>
                    <td>{formatPercentage(coin.percentagePriceChangePerDay)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='loagingPanel'>
              <img className="loadingGif" src={loadingGif} alt="loaging" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;