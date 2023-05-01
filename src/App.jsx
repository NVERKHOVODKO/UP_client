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
        </Switch>
      </Router>
    )
  }
}

export default App;