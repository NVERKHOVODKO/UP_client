import styles from'./Conversions.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";

function Conversions({id}) {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("https://localhost:7157/Transaction/getUserConversationsHistory?id=" + id)
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
        <div className='bottomUserPanel'>
                    {data ? (
                        <table className="tableCoins1">
                            <thead>
                                <tr className='tableHead'>
                                    <th>№</th>
                                    <th>Сумма</th>
                                    <th>Нач. монета</th>
                                    <th></th>
                                    <th>Кон. монета</th>
                                    <th></th>
                                    <th>Дата</th>
                                    <th>Комиссия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(conversion => (
                                    <tr key={conversion.id}>
                                        <td>{conversion.id}</td>
                                        <td>{conversion.quantityUsd.toFixed(3) + ' $'}</td>
                                        <td>
                                            <img className="coinIcon" src={coinIcoins['./' + conversion.beginCoinShortname + '.png']} alt="icon" />
                                        </td>
                                        <td>{conversion.beginCoinShortname}({conversion.beginCoinQuantity.toFixed(9)})</td>
                                        <td>
                                            <img className="coinIcon" src={coinIcoins['./' + conversion.endCoinShortname + '.png']} alt="icon" />    
                                        </td>
                                        <td>{conversion.endCoinShortname}({conversion.endCoinQuantity.toFixed(9)})</td>
                                        <td>{formatDate(conversion.date)}</td>
                                        <td>{conversion.commission.toFixed(3) + ' $'}</td>
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

export default Conversions;