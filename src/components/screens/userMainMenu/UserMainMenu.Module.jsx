/* import React from 'react';
import CoinTable from './CoinTable.js';
import styles from './UserMainMenu.css'

class UserMainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: {
        id: '',
        fullName: '',
        shortName: '',
        iconPath: '',
        dailyVolume: '',
        dailyImpact: '',
        price: '',
        percentagePriceChangePerDay: ''
      },
      error: null,
      isLoaded: false,
      coins: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://localhost:7157/Currency/getUserCoinsFull?userId=1")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            coins: result.coins
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  render() {
    const { error, isLoaded, coins } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {coins.map(coin => (
            <li key={coin.id}>
              {coin.shortName} {coin.price}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default UserMainMenu; */

/* import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import CoinTable from './CoinTable.js';
import styles from './UserMainMenu.css'
import mainIcon from '../../../assets/images/UP_cryptowallet.png';
import logo from './UP_logo.png'
import { useHistory } from 'react-router-dom';



function App(props) {
  const { id, login, password, email, creationData, isBlocked, isDeleted, modificationDate, roleId, salt } = props.location.state;
  const [data, setData] = useState(null);
  const [balanceData, setBalanceData] = useState(null);
  const location = useLocation();
  const user = location.state.jsonResponse;
  const history = useHistory();


  console.log(user);

  useEffect(() => {
    axios.get("https://localhost:7157/Currency/getUserCoinsFull?userId=" + id)
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

  const coinIcoins = {};
  function importAllCoinsIcons(r) {
    r.keys().forEach((key) => (coinIcoins[key] = r(key)));
  }
  importAllCoinsIcons(require.context("../../../assets/images/cryptoicons_png/128", false, /\.(png|jpe?g|svg)$/));


  const menuIcoins = {};
  function importAllMenuIcons(r) {
    r.keys().forEach((key) => (menuIcoins[key] = r(key)));
  }
  importAllMenuIcons(require.context("../../../assets/images/standart_menu_icons", false, /\.(png|jpe?g|svg)$/));


  const [isMasked, setIsMasked] = useState(false);

  const handleMaskBalance = () => {
    setIsMasked(!isMasked);
  };

  const maskedBalance = "*********";


  function handleClickBuyCrypto() {
    history.push('/buyCrypto');
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
              <button className="buttonMaskBalance" onClick={handleMaskBalance}>
                {isMasked ? "Show" : "Mask"}
              </button>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="MenuCaseItem">
          <a className="MenuCase" href="#">
            <img className="MenuIcon" src={menuIcoins['./wallet.png']} alt="Wallet icon">
            </img>
            Wallet
          </a>
        </div>
        <div className="MenuCaseItem">
          <a className="MenuCase" href="#"> <img className="MenuIcon" src={menuIcoins['./two-arrows.png']} alt="Exchange icon"></img>
            Exchange
          </a>
        </div>
        <div className="MenuCaseItem">
          <a className="MenuCase" href="#"> <img className="MenuIcon" src={menuIcoins['./credit-card.png']} alt="Buy icon" onClick={handleClickBuyCrypto}></img>Buy
            crypto</a>
        </div>
        <div className="MenuCaseItem">
          <a className="MenuCase" href="#"> <img className="MenuIcon" src={menuIcoins['./stake.png']} alt="History icon"></img>
            History</a>
        </div>
        <div className="MenuCaseItem">
          <a className="MenuCase" href="#"> <img className="MenuIcon" src={menuIcoins['./stake.png']} alt="Staking icon"></img>
            Staking</a>
        </div>
        <div className="MenuCaseItem">
          <a className="MenuCase" href="#"> <img className="MenuIcon" src={menuIcoins['./settings.png']} alt="Settings icon"></img>
            Settings</a>
        </div>
        <div className="MenuCaseItem">
          <a className="MenuCase" href="#"> <img className="MenuIcon" src={menuIcoins['./question.png']} alt="Support icon"></img>
            Support</a>
        </div>
        <div className="MenuCaseItem">
          <a className="MenuCase" href="#"> <img className="MenuIcon" src={menuIcoins['./money.png']} alt="Send icon"></img>
            Send crypto</a>
        </div>
        <div className="MenuCaseItem">
          <a className="MenuCase" href="#" target="_self"> <img className="MenuIcon" src={menuIcoins['./power-off.png']}
            alt="Exit icon"></img> Exit</a>
        </div>
      </div>
      <div className="coinList">
        {data ? (
          <table className="tableCoins">
            <thead>
              <tr className='tableHead'>
                <th>Icon</th>
                <th>Full name</th>
                <th>Short name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Daily volume</th>
                <th>Daily impact</th>
                <th>Percentage change</th>
              </tr>
            </thead>
            <tbody>
              {data.map(coin => (
                <tr key={coin.id}>
                  <td>
                    <img className="coinIcon" src={coinIcoins['./' + coin.shortName + '.png']} alt="icon" />
                  </td>
                  <td>{coin.fullName}</td>
                  <td>{coin.shortName}</td>
                  <td>{(coin.price) + '$'}</td>
                  <td>{coin.quantity.toFixed(4)}</td>
                  <td>{formatNumber(coin.dailyVolume)}</td>
                  <td>{priceImpact(coin.dailyImpact)}</td>
                  <td>{formatPercentage(coin.percentagePriceChangePerDay)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App; */

import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import CoinTable from './CoinTable.js';
import styles from './UserMainMenu.css'
import mainIcon from '../../../assets/images/UP_cryptowallet.png';
import logo from './UP_logo.png'
import { Link } from 'react-router-dom';
import NavBar from '../../navBar/NavBar.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';




function App(props) {
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
    axios.get("https://localhost:7157/Currency/getUserCoinsFull?userId=" + id)
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
      <div className="coinList">
        {data ? (
          <table className="tableCoins">
            <thead>
              <tr className='tableHead'>
                <th>Монета</th>
                <th>Полн. назв.</th>
                <th>Сокр.</th>
                <th>Цена</th>
                <th>Кол-во</th>
                <th>Дневн. объем</th>
                <th>Изм. цены</th>
                <th>Проц. изм.</th>
              </tr>
            </thead>
            <tbody>
              {data.map(coin => (
                <tr key={coin.id}>
                  <td>
                    <img className="coinIcon" src={coinIcoins['./' + coin.shortName + '.png']} alt="icon" />
                  </td>
                  <td>{coin.fullName}</td>
                  <td>{coin.shortName}</td>
                  <td>{(coin.price) + '$'}</td>
                  <td>{coin.quantity.toFixed(4)}</td>
                  <td>{formatNumber(coin.dailyVolume)}</td>
                  <td>{priceImpact(coin.dailyImpact)}</td>
                  <td>{formatPercentage(coin.percentagePriceChangePerDay)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;