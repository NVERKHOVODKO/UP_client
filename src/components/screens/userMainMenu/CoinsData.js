/* import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Navbar } from 'reactstrap';


class AuthorizationRequest extends Component {

    emptyItem = {
        id: '',
        fullName: '',
        shortName: '',
        iconPath: '',
        dailyVolume: '',
        dailyImpact: '',
        price: '',
        percentagePriceChangePerDay: ''
    };
    

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
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
    
        const response = await fetch('https://localhost:7157/Currency/getUserCoins?userId=1', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
    
        const data = await response.json();
        this.setState({ coins: data });
    }

    async componentDidMount() {
        // if (this.props.match.params.id !== 'new') {
        //     const client = await (await fetch(`/clients/${this.props.match.params.id}`)).json();
        //     this.setState({item: client});
        // }
    }

    
    render() {
        const { coins } = this.state;
    
        return (
            <div>
                <h1>My Coins</h1>
                <ul>
                    {coins.map(coin => (
                        <li key={coin.id}>
                            {coin.fullName} ({coin.shortName}): {coin.price}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default withRouter(AuthorizationRequest); */


export const coins = [
    {
        id: 1,
        fullName: 'Bitcoin',
        shortName: 'BTC',
        iconPath: 'btc',
        dailyVolume: '100402',
        dailyImpact: '349',
        price: '27593',
        percentagePriceChangePerDay: '1.3'
    },
    {
        id: 2,
        fullName: 'Etherium',
        shortName: 'ETH',
        iconPath: 'eth',
        dailyVolume: '429424',
        dailyImpact: '24',
        price: '1835',
        percentagePriceChangePerDay: '1.5'
    }
]