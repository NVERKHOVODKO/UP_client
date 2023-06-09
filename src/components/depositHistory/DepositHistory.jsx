import styles from './DepositHistory.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";

function DepositHistory({ id }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("https://localhost:7157/Transaction/getUserDepositHistory?id=" + id)
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
        <div className='depositHistoryPanel'>
            {data ? (
                <table className="tableReplenisment">
                    <thead>
                        <tr className='tableHead'>
                            <th>№</th>
                            <th>Дата</th>
                            <th>Кол-во</th>
                            <th>Комиссия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(deposit => (
                            <tr key={deposit.id}>
                                <td>{deposit.id}</td>
                                <td>{formatDate(deposit.date)}</td>
                                <td>{deposit.quantity + ' $'}</td>
                                <td>{deposit.commission + ' $'}</td>
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

export default DepositHistory;