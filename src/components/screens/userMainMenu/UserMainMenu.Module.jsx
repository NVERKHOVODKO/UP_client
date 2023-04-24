/* import styles from './UserMainMenu.css'
import { coins } from './CoinsData.js'
import CoinTable from './CoinTable.js';


function UserMainMenu() {
    return (
        <div className="container">
            <div className="navBar">
                <div className="loginLbl">
                    nverkhovodko
                </div>
                <div>
                    ~542.5$
                </div>
                <a class={styles.MenuCase} href="#"> <img src="./standart_menu_icons/wallet.png" alt="Wallet icon"></img>
                    Wallet</a>
                <a class={styles.MenuCase} href="#"> <img src="./standart_menu_icons/two-arrows.png" alt="Exchange icon"></img>
                    Exchange</a>
                <a class={styles.MenuCase} href="#"> <img src="./standart_menu_icons/credit-card.png" alt="Buy icon"></img> Buy
                    crypto</a>
                <a class={styles.MenuCase} href="#"> <img src="./standart_menu_icons/history.png" alt="History icon"></img>
                    History</a>
                <a class={styles.MenuCase} href="#"> <img src="./standart_menu_icons/stake.png" alt="Staking icon"></img>
                    Staking</a>
                <a class={styles.MenuCase} href="#"> <img src="./standart_menu_icons/settings.png" alt="Settings icon"></img>
                    Settings</a>
                <a class={styles.MenuCase} href="#"> <img src="./standart_menu_icons/question.png" alt="Support icon"></img>
                    Support</a>
                <a class={styles.MenuCase} href="#"> <img src="./standart_menu_icons/money.png" alt="Send icon"></img>
                    Send crypto</a>
                <a class={styles.MenuCase} href="#" target="_self"> <img src="./standart_menu_icons/power-off.png"
                    alt="Support icon"></img> Exit</a>
            </div>
            <div className="coinList">
                <table>
                <div className="coinList">
                <CoinTable coins={coins} />
            </div>
                </table>
            </div>
        </div>
    )
}

export default UserMainMenu */



/* handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;

    const response = await fetch('https://localhost:7157/Currency/getUserCoinsFull?userId=1', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    }); 

    const data = await response.json();
    this.setState({ coins: data });
  } */

/* render() {
  return (
      <div className="container">
          <div className="navBar">
              <div className="loginLbl">
                  nverkhovodko
              </div>
              <div>
                  ~542.5$
              </div>
              <a className="MenuCase" href="#"> <img src="./standart_menu_icons/wallet.png" alt="Wallet icon"></img>
                  Wallet</a>
              <a className="MenuCase" href="#"> <img src="./standart_menu_icons/two-arrows.png" alt="Exchange icon"></img>
                  Exchange</a>
              <a className="MenuCase" href="#"> <img src="./standart_menu_icons/credit-card.png" alt="Buy icon"></img> Buy
                  crypto</a>
              <a className="MenuCase" href="#"> <img src="./standart_menu_icons/history.png" alt="History icon"></img>
                  History</a>
              <a className="MenuCase" href="#"> <img src="./standart_menu_icons/stake.png" alt="Staking icon"></img>
                  Staking</a>
              <a className="MenuCase" href="#"> <img src="./standart_menu_icons/settings.png" alt="Settings icon"></img>
                  Settings</a>
              <a className="MenuCase" href="#"> <img src="./standart_menu_icons/question.png" alt="Support icon"></img>
                  Support</a>
              <a className="MenuCase" href="#"> <img src="./standart_menu_icons/money.png" alt="Send icon"></img>
                  Send crypto</a>
              <a className="MenuCase" href="#" target="_self"> <img src="./standart_menu_icons/power-off.png"
                  alt="Exit icon"></img> Exit</a>
          </div>
          <div className="coinList">
              <CoinTable coins={coins} />
          </div>
      </div>
  );
} */


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


import React, { useState, useEffect } from "react";
import axios from "axios";
import CoinTable from './CoinTable.js';
import styles from './UserMainMenu.css'

function App() {
    const [data, setData] = useState(null);
    const [balanceData, setBalanceData] = useState(null);

    useEffect(() => {
        axios.get("https://localhost:7157/Currency/getUserCoinsFull?userId=1")
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get("https://localhost:7157/Currency/getUserBalance?userId=1")
            .then(response => {
                setBalanceData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className="container">
            <div className="navBar">
                <div className="loginLbl">
                    nverkhovodko
                </div>
                <div className="balanceLbl">
                    {balanceData ? <p>{balanceData}</p> : <p>Loading...</p>}
                </div>
                <a className="MenuCase" href="#"> <img src="./standart_menu_icons/wallet.png" alt="Wallet icon"></img>
                    Wallet</a>
                <a className="MenuCase" href="#"> <img src="./standart_menu_icons/two-arrows.png" alt="Exchange icon"></img>
                    Exchange</a>
                <a className="MenuCase" href="#"> <img src="./standart_menu_icons/credit-card.png" alt="Buy icon"></img> Buy
                    crypto</a>
                <a className="MenuCase" href="#"> <img src="./standart_menu_icons/history.png" alt="History icon"></img>
                    History</a>
                <a className="MenuCase" href="#"> <img src="./standart_menu_icons/stake.png" alt="Staking icon"></img>
                    Staking</a>
                <a className="MenuCase" href="#"> <img src="./standart_menu_icons/settings.png" alt="Settings icon"></img>
                    Settings</a>
                <a className="MenuCase" href="#"> <img src="./standart_menu_icons/question.png" alt="Support icon"></img>
                    Support</a>
                <a className="MenuCase" href="#"> <img src="./standart_menu_icons/money.png" alt="Send icon"></img>
                    Send crypto</a>
                <a className="MenuCase" href="#" target="_self"> <img src="./standart_menu_icons/power-off.png"
                    alt="Exit icon"></img> Exit</a>
            </div>
            <div className="coinList">
                {data ? (
                    <table className="tableCoins">
                    <thead>
                      <tr>
                        <th>Full name</th>
                        <th>Short name</th>
                        <th>Price</th>
                        <th>Daily volume</th>
                        <th>Daily impact</th>
                        <th>Percentage price change per day</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map(coin => (
                        <tr key={coin.id}>
                          <td>{coin.fullName}</td>
                          <td>{coin.shortName}</td>
                          <td>{coin.price}</td>
                          <td>{coin.dailyVolume}</td>
                          <td>{coin.dailyImpact}</td>
                          <td>{coin.percentagePriceChangePerDay}</td>
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