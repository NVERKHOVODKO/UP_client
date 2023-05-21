import './blocking.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";

function BlokingMenu({ id }) {
    const [data, setData] = useState(null);
    const [blockingReason, setBlockingReason] = useState('');


    return (
        <div className='blokingContainer'>
            <input className='inputFieldBlokingReason' type="text" maxLength={50} placeholder="Введите причину блокировки" />
            <button className='btnBlock'>
                block
            </button>
            <button className='btnUnBlock'>
                Unblock
            </button>
            <h3 className='blokingReasonLbl'>
                Blockig reason: cheating with course
            </h3>
        </div>
    );
}

export default BlokingMenu;