import styles from './WithdrawHistory.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";

function WithdrawHistory({ id }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("https://localhost:7157/Transaction/getUserWithdrawalsHistory?userId=" + id)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

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
                <table className="tableCoins1">
                    <thead>
                        <tr className='tableHead'>
                            <th>id</th>
                            <th>date</th>
                            <th>quantity</th>
                            <th>commission</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(withdraw => (
                            <tr key={withdraw.id}>
                                <td>{withdraw.id}</td>
                                <td>{formatDate(withdraw.date)}</td>
                                <td>{withdraw.quantity + ' $'}</td>
                                <td>{withdraw.commission + ' $'}</td>
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

export default WithdrawHistory;