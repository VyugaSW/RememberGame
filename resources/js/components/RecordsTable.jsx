import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import appPath from '../appPath';
import getTypes from "./AjaxRequests";

export default function RecordsTable(props){
    const [records, setRecords] = useState([]);
    const [loadedRecords, setLoadedRecords] = useState([]);
    const [message, setMessage] = useState('');
    const [gameType, setGameType] = useState('');
    const [userLogin, setUserLogin] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [types, setTypes] = useState([]);
    const [page, setPage] = useState(1);
    const [shouldRecordsUpdate, setShouldRecordsUpdate] = useState(true);
    const [concatRecords, setConcatRecords] = useState(false);
    const [isDisabledSearch, setIsDisabledSearch] = useState(false);
    const countAllRecords = useRef();

    useEffect(() => {
        if(shouldRecordsUpdate)
            getRecords();
    }, [shouldRecordsUpdate]);

    useEffect(() => {
        if(!types.length)
            getTypes(setTypes, setIsLoading);
    },[])

    const pad = (str,n) => (str+n).slice(-2);

    const getRecords = () => {
        setIsLoading(true);
        setShouldRecordsUpdate(false);
        axios
        .get(appPath('api/getrecords?userLogin='+userLogin+'&gameType='+gameType+'&page='+page))
        .then((response) => {
            setIsLoading(false);
            if(response.data.success){
                concatRecords ? setRecords(records.concat(response.data.data.data)) : setRecords(response.data.data.data);
            }
            if(!records.length)
                setMessage('There is not any record :(');

            countAllRecords.current = response.data.data.total;

            setConcatRecords(false);
        });
    }

    const selectOnChange = (value) => {
        if(value === '0')
            setGameType('');
        else
            setGameType(value);
        setPage(1);
        setShouldRecordsUpdate(true);
    }

    const searchOnChange = (value) => {
        setUserLogin(value);
        setPage(1);
        setShouldRecordsUpdate(true);
    }

    const loadMoreOnClick = () =>{
        setPage(page+1);
        setConcatRecords(true);
        setShouldRecordsUpdate(true);
        setLoadedRecords(records);
    }

    const myRecordsOnClick = () => {
        setIsDisabledSearch(true);
        setUserLogin(JSON.parse(localStorage.getItem('userData')).login);
        setShouldRecordsUpdate(true);
    }

    const allRecordsOnClick = () =>{
        setIsDisabledSearch(false);
        setUserLogin('');
        setShouldRecordsUpdate(true);
    }

    const getTable = () => {
        if(records.length){
            return (
                <>
                    <table className="records-tables">
                        <thead>
                            <tr>
                                <th>Login</th>
                                <th>Game type</th>
                                <th>Scores</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record) => 
                                <tr key={record.id}>
                                    <td>{record.login}</td>
                                    <td>{record.type+' '+'cards'}</td>
                                    <td>{record.scores}</td>
                                    <td>{pad('0',record.minutes)+':'+pad('0',record.seconds)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {countAllRecords.current === records.length 
                    ? 
                        <div>Its all records</div> 
                    :
                        <div className="result-btn" onClick={() => {loadMoreOnClick()}}>More</div>
                    }
                </>
            );
        }
        return (<div className="">{message}</div>);
    }


    return (
        <div className="records-container">
            <div className="header-container">
                <button className='close-btn' onClick={props.closeOnClick}>✖</button>
                <ul className='header-menu'>
                    <div className='header-option' onClick={() => {allRecordsOnClick();}}>All records</div>
                    <hr className='line'/>
                    {localStorage.getItem('isLoggedIn') ? <div className='header-option' onClick={() => {myRecordsOnClick();}}>My records</div> : <></>}
                </ul>
            </div>
            <div className="records-body">
                <div className="header-container">
                    <ul className='header-menu'>
                        <div className="header-option-disabled">
                            <div className="form-control">
                                <label htmlFor="type">Type:</label>
                                <select onChange={(e) => {selectOnChange(e.target.value)}}>
                                    <option value="0">All</option>
                                    {types.map(type => <option key={type} value={type}>{type} cards</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="header-option-disabled">
                            <div className="form-control">
                                <label htmlFor="userLogin">Search user</label>
                                {isDisabledSearch
                                ?
                                    <input type="text" disabled value={userLogin}/>
                                :   
                                    <input type="text" onChange={(e) => {searchOnChange(e.target.value)}} value={userLogin}/>
                                }    
                            </div>
                        </div>
                    </ul>
                </div>
                <div className="records-tables-container">
                    {isLoading ?
                        <div className='spinner-big'/>
                    :
                        <>{getTable()}</>
                    }
                </div>
            </div>
        </div>
    );
}
