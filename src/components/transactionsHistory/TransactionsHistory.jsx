import styles from './TransactionsHistory.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";

function TransactionsHistory({ id }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("https://localhost:7157/Transaction/getUserTransactionsHistory?userId=" + id)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    const coinIcoins = {};
    function importAllCoinsIcons(r) {
        r.keys().forEach((key) => (coinIcoins[key] = r(key)));
    }
    importAllCoinsIcons(require.context("../../assets/images/cryptoicons_png/128", false, /\.(png|jpe?g|svg)$/));

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
    
    return (
        <div className='transactionsHistoryPanel'>
                {data ? (
                    <table className="tableCoins1">
                        <thead>
                            <tr className='tableHead'>
                                <th>Монета</th>
                                <th>Назв.</th>
                                <th>Кол-во</th>
                                <th>Дата</th>
                                <th>Отправитель</th>
                                <th>Получатель</th>
                                <th>Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(transaction => (
                                <tr key={transaction.id}>
                                    <td>
                                        <img className="coinIcon" src={coinIcoins['./' + transaction.coinName + '.png']} alt="icon" />
                                    </td>
                                    <td>{transaction.coinName}</td>
                                    <td>{transaction.quantity}</td>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.senderId}</td>
                                    <td>{transaction.receiverId}</td>
                                    <td className={transaction.senderId === id ? "received" : "sent"}>{transaction.senderId === id ? "Получено" : "Отправлено"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Loading...</p>
                )} 
            </div>
    );
}

export default TransactionsHistory;