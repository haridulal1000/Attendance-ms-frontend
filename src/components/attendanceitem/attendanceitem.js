import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './attendanceitem.css';

function AttendanceItem(props){
    const {detail}=props;
    console.log(detail);
    const url='http://localhost:5000/api/attendance/delete/';
    const navigate=useNavigate();
    let status;
    if(detail.checkIn===null){
        status='ABSENT';
    }else if(detail.checkIn!==null && detail.checkOut===null){
        status='MISSED';
    }else{
        status='PRESENT';
    }

    const deleteNode=async function () {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({
                id: detail.checkIn._id
            })
        });
        const json = await response.json();
        if (!json.success) {
            console.log('Could not success');
        }else{
            window.location.reload();
        }
    }

    return(
        <>
        <div className="attendance-item-container">
            <div>Date: {detail.checkIn.year}-{detail.checkIn.month}-{detail.checkIn.date}</div>
        <div>Checked In: {detail.checkIn?'YES':'NO'}</div>
        <div>Checked Out: {detail.checkOut?'YES':'NO'}</div>
        <div>Status: {status}</div>
        <div><button>EDIT</button> <button onClick={deleteNode}>DELETE</button></div>
        </div>
        </>
    );
    }


export default AttendanceItem;