import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import authorization from './components/screens/authorization/Authorization.Module.jsx';
import userMainMenu from './components/screens/userMainMenu/UserMainMenu.Module.jsx';
import buyCryptoMenu from './components/screens/buyCrypto/BuyCrypto.jsx';
import convertCryptoMenu from './components/screens/convertion/ConvertCrypto';
import sendCryptoMenu from './components/screens/sendCrypto/SendCrypto.jsx';
import historyMenu from './components/screens/history/History.jsx';
import accountMenu from './components/screens/account/Account.jsx';
import registration from './components/screens/registration/Registration.jsx';
import coins from './components/screens/coins/Coins.jsx';
import loginHistoryTable from './components/loginHistoryTable/LoginHistoryTable.jsx';
import replenishTheBalance from './components/replenishTheBalance/ReplenishTheBalance.jsx';
import withdrawMoney from './components/withdrawMoney/WithdrawMoney.jsx';
import editUserMyself from './components/editUserMyself/EditUserMyself.jsx';
import conversionHistory from './components/conversions/Conversions.jsx';
import depositHistory from './components/depositHistory/DepositHistory.jsx';
import withdrawHistory from './components/withdrawHistory/WithdrawHistory.jsx';
import transactionsHistory from './components/transactionsHistory/TransactionsHistory.jsx';




class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={authorization} />
          <Route path="/menu" component={userMainMenu} />  
          <Route path="/buyCrypto" component={buyCryptoMenu} />
          <Route path="/convertCrypto" component={convertCryptoMenu} />
          <Route path="/sendCrypto" component={sendCryptoMenu} />
          <Route path="/historyMenu" component={historyMenu} />
          <Route path="/accountMenu" component={accountMenu} />
          <Route path="/registration" component={registration} />
          <Route path="/coins" component={coins} />
          <Route path="/loginHistoryTable" component={loginHistoryTable} />
          <Route path="/replenishTheBalance" component={replenishTheBalance} />
          <Route path="/withdrawMoney" component={withdrawMoney} />
          <Route path="/editUserMyself" component={editUserMyself} />
          <Route path="/conversionHistory" component={conversionHistory} />
          <Route path="/depositHistory" component={depositHistory} />
          <Route path="/withdrawHistory" component={withdrawHistory} />
          <Route path="/transactionsHistory" component={transactionsHistory} />
        </Switch>
      </Router>
    )
  }
}

export default App;