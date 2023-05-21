import './AdminMenu.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import BlockingMenu from '../../../components/blokingMenu/blocking';
import { useHistory } from 'react-router-dom';
import TransactionsHistory from '../../../components/transactionsHistory/TransactionsHistory';


function AdminMenu({ id }) {
    const [data, setData] = useState([]);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(1);
    const history = useHistory();



    useEffect(() => {
        axios.get("https://localhost:7157/Admin/getUserList")
            .then(response => {
                const sortedData = response.data.sort((a, b) => a.id - b.id);
                setData(sortedData);
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

    const handleButtonClick = async (buttonName, userId) => {
        setSelectedUserId(userId);

        if (selectedComponent === buttonName) {
            // Если текущий компонент совпадает с нажатой кнопкой, скрываем компонент
            setSelectedComponent(null);
            setSelectedUserId(null);
        } else {
            // Иначе выбираем новый компонент
            setSelectedComponent(buttonName);
            setSelectedUserId(userId);
        }
    };

    const [searchTerm, setSearchTerm] = useState('');


    const renderComponent = () => {
        if (selectedComponent === 'loginHistory' && selectedUserId) {
            return <TransactionsHistory id={selectedUserId} />;
        }
        if (selectedComponent === 'blocking' && selectedUserId) {
            return <BlockingMenu id={selectedUserId} />;
        }
        return null;
    };

    const filteredUsers = data.filter(user =>
        user.login.includes(searchTerm.toLowerCase())
    );

    const setStatusBlock = async (userId, status) => {
        try {
            const url = 'https://localhost:7157/Admin/setStatusBlock';
            const params = {
                id: userId,
                status: !status
            };
            const response = await axios.put(url, null, { params });
            console.log(response.data); // Обработка ответа сервера
            axios.get("https://localhost:7157/Admin/getUserList")
                .then(response => {
                    const sortedData = response.data.sort((a, b) => a.id - b.id);
                    setData(sortedData);
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };

    const setStatusDel = async (userId, statusDel) => {
        console.log("Status: " + statusDel + " Id: " + userId);
        try {
            const url = 'https://localhost:7157/Admin/setStatusDel';
            const params = {
                id: userId,
                status: !statusDel
            };
            const response = await axios.put(url, null, { params });
            console.log(response.data); // Обработка ответа сервера
            axios.get("https://localhost:7157/Admin/getUserList")
                .then(response => {
                    const sortedData = response.data.sort((a, b) => a.id - b.id);
                    setData(sortedData);
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };

    const btnChangeBlobikngStatusClick = async (userId, status, buttonName) => {
        //setStatusBlock(userId, status);

        setSelectedUserId(userId);

        if (selectedComponent === buttonName) {
            // Если текущий компонент совпадает с нажатой кнопкой, скрываем компонент
            setSelectedComponent(null);
            setSelectedUserId(null);
        } else {
            // Иначе выбираем новый компонент
            setSelectedComponent(buttonName);
            setSelectedUserId(userId);
        }
    }

    const btnChangeDeletingStatusClick = async (userId, status) => {
        setStatusDel(userId, status);
    }

    const btnBackClick = async () => {
        history.push('/');
    }

    return (
        <div className="containerAdmin">
            <div className='menuAdmin'>
                <div className='searchPanelAdmin'>
                    <button className='btnBack' onClick={btnBackClick}>
                        Выйти
                    </button>
                    <input className='inputField1' type="text" placeholder="Введите логин пользователя" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
            </div>
            <div className="userList">
                {data ? (
                    <table className="usersTable">
                        <thead>
                            <tr className='tableHead'>
                                <th className="btnColumn" onClick={() => sortTable('id')}>ID</th>
                                <th onClick={() => sortTable('login')}>Логин</th>
                                <th>Email</th>
                                <th onClick={() => sortTable('creationData')}>Дата создания</th>
                                <th onClick={() => sortTable('modificationDate')}>Дата модификации</th>
                                <th className="btnColumn" onClick={() => sortTable('isBlocked')}>Блок.</th>
                                <th className="btnColumn" onClick={() => sortTable('isDeleted')}>Удал.</th>
                                <th className="btnColumn">Информация</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <React.Fragment key={user.id}>
                                    <tr onClick={() => handleModalOpen(user)}>
                                        <td>{user.id}</td>
                                        <td>{user.login}</td>
                                        <td>{user.email}</td>
                                        <td>{formatDate(user.creationData)}</td>
                                        <td>{formatDate(user.modificationDate)}</td>
                                        <td>
                                            <button className='blockingBtn' onClick={() => btnChangeBlobikngStatusClick(user.id, user.isBlocked, 'blocking')}>
                                                {user.isBlocked ? 'Заблокирован' : 'Активен'}
                                            </button>
                                        </td>
                                        <td>
                                            <button className={user.isDeleted ? 'deleted' : 'not-deleted'} onClick={() => btnChangeDeletingStatusClick(user.id, user.isDeleted)}>
                                                {user.isDeleted ? 'Удален' : 'Активен'}
                                            </button>
                                        </td>
                                        <td>
                                            <button className='btnInfo' onClick={() => handleButtonClick('loginHistory', user.id)}>
                                                Информация
                                            </button>
                                        </td>
                                    </tr>
                                    {selectedUserId === user.id && (
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