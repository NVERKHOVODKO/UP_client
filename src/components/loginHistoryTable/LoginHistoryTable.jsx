import './LoginHistoryTable.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";

function LoginHistoryTable({id}) {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("https://localhost:7157/User/getUserLoginHistory?id=" + id)
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
        <div className='tableLoginHistory'>
            <div>
                <h3 className='alertMessage'>
                    Если вы заметили подозрительную активность - смените пароль и свяжитесь с техподдержкой
                </h3>
            </div>
            {data ? (
                <table className="tableCoins">
                    <thead>
                        <tr className='tableHead'>
                            <th>Дата</th>
                            <th>IP адресс</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(loginHistory => (
                            <tr key={loginHistory.id}>
                                <td>{formatDate(loginHistory.date)}</td>
                                <td>{loginHistory.ip}</td>
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

export default LoginHistoryTable;