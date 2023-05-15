import './AdminMenu.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import LoginHistoryTable from '../../../components/loginHistoryTable/LoginHistoryTable';


function AdminMenu({ id }) {
    const [data, setData] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(1);

    useEffect(() => {
        axios.get("https://localhost:7157/Admin/getUserList")
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

    function sortTable(column) {
        if (sortColumn === column) {
            setSortDirection(sortDirection * -1);
        } else {
            setSortColumn(column);
            setSortDirection(1);
        }
    }

    function getSortedData() {
        if (sortColumn) {
            return [...data].sort((a, b) => {
                const aValue = a[sortColumn];
                const bValue = b[sortColumn];
                if (aValue < bValue) {
                    return -1 * sortDirection;
                } else if (aValue > bValue) {
                    return 1 * sortDirection;
                } else {
                    return 0;
                }
            });
        } else {
            return data;
        }
    }

    const sortedData = getSortedData();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = (selectedUser) => {
        setSelectedUser(selectedUser);
        setSelectedButton('loginHistory');
        setIsModalOpen(true);
    };


    const handleModalClose = () => {
        setIsModalOpen(false);
    };



    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedButton, setSelectedButton] = useState(null);

    const [selectedComponent, setSelectedComponent] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    
    const handleButtonClick = (buttonName, userId) => {
      setSelectedComponent(buttonName);
      setSelectedUserId(userId);
    };
    
    const renderComponent = () => {
      if (selectedComponent === 'loginHistory' && selectedUserId) {
        return <LoginHistoryTable id={1} />;
      }
      return null;
    };


    return (
        <div>
            <div className='menuAdmin'>
                
            </div>
            <div className="userList">
                {data ? (
                    <table className="usersTable">
                        <thead>
                            <tr className='tableHead'>
                                <th onClick={() => sortTable('id')}>ID</th>
                                <th onClick={() => sortTable('login')}>Логин</th>
                                <th>Email</th>
                                <th onClick={() => sortTable('creationData')}>Дата создания</th>
                                <th onClick={() => sortTable('modificationDate')}>Дата модификации</th>
                                <th onClick={() => sortTable('isBlocked')}>Блок.</th>
                                <th onClick={() => sortTable('isDeleted')}>Удал.</th>
                                <th>Информация</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((coin) => (
                                <React.Fragment key={coin.id}>
                                    <tr onClick={() => handleModalOpen(coin)}>
                                        <td>{coin.id}</td>
                                        <td>{coin.login}</td>
                                        <td>{coin.email}</td>
                                        <td>{formatDate(coin.creationData)}</td>
                                        <td>{formatDate(coin.modificationDate)}</td>
                                        <td>{coin.isBlocked ? 'true' : 'false'}</td>
                                        <td>{coin.isDeleted ? 'true' : 'false'}</td>
                                        <td>
                                            <button onClick={() => handleButtonClick('loginHistory', coin.id)}>
                                                Информация
                                            </button>
                                        </td>
                                    </tr>
                                    {selectedUserId === coin.id && (
                                        <tr>
                                            <td colSpan="8">{renderComponent()}</td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default AdminMenu;










{/* <div>
                <button onClick={handleModalOpen}>Открыть панель</button>
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <div className='buttonsBar'>
                                <nav className="menu1">
                                    <ul>
                                        <button className="btnAccountMenuCase" onClick={handleModalClose}>Закрыть</button>
                                        <button className="btnAccountMenuCase">История</button>
                                        <button className="btnAccountMenuCase">Выводы</button>
                                        <button className="btnAccountMenuCase">Транзакции</button>
                                        <button className="btnAccountMenuCase" onClick={() => handleButtonClick('loginHistory')}>Авторизации</button>
                                    </ul>
                                </nav>
                            </div>
                            {renderComponent()}
                        </div>
                    </div>
                )}
            </div> */}