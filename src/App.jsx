/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/



/* import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
    const response = await fetch('https://localhost:7157/Admin/getUserList');
    const body = await response.json();
    this.setState({users: body});
  }

  render() {
    const {users} = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <div className="App-intro">
              <h2>Users</h2>
              {users.map(user =>
                  <div key={user.id}>
                    {user.login} ({user.email})
                  </div>
              )}
            </div>
          </header>
        </div>
    );
  }
}
export default App; */

//ADAM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import authorization from './components/screens/authorization/Authorization.Module.jsx';
import userMainMenu from './components/screens/userMainMenu/UserMainMenu.Module.jsx';
import buyCryptoMenu from './components/screens/buyCrypto/BuyCrypto.jsx';

//import userMainMenu from './CoinsData.js';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={authorization} />
          <Route path="/menu" component={userMainMenu} />  
          <Route path="/buyCrypto" component={buyCryptoMenu} />
        </Switch>
      </Router>
    )
  }
}

export default App;