import axios from 'axios';
import React, { useState, useEffect } from "react";

function LoginHistoryTable({ id }) {
    const [data, setData] = useState(null);
    const coinIcoins = {};

    useEffect(() => {
        axios.get("https://localhost:7157/Currency/getUserCoinsFull?userId=" + id)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function importAllCoinsIcons(r) {
        r.keys().forEach((key) => (coinIcoins[key] = r(key)));
    }
    importAllCoinsIcons(require.context("../../assets/images/cryptoicons_png/128", false, /\.(png|jpe?g|svg)$/));

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


    return (
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
                                <td style={{ color: coin.dailyImpact < 0 ? 'red' : 'green' }}>{priceImpact(coin.dailyImpact)}</td>
                                <td style={{ color: coin.percentagePriceChangePerDay < 0 ? 'red' : 'green' }}>
                                    {formatPercentage(coin.percentagePriceChangePerDay)}
                                </td>                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default LoginHistoryTable;