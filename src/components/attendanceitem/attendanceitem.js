import { useNavigate } from "react-router-dom";
import './attendanceitem.css';

function AttendanceItem(props){
    const {detail}=props;
    const url='http://localhost:5000/api/attendance/delete/';
    const navigate=useNavigate();
    let status;
    if(detail.checkedIn===false){
        status='ABSENT';
    }else if((detail.checkedIn!==false && detail.checkedOut===false)|| detail.checkedIn!==true){
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
                id: detail._id
            })
        });
        const json = await response.json();
        if (!json.success) {
            if(json.type===500){
                navigate('/error');
            }
        }else{
            console.log(json);
            window.location.reload();
        }
    }
    const editNode=()=>{
        navigate('/edit/'+JSON.stringify(detail));
    }

    return(
        <>
        <div className="attendance-item-container">
            <div>Date: {detail.Year}-{detail.Month}-{detail.Date}</div>
        <div>CheckedIn: {detail.checkedIn?`${detail.checkInHours}:${detail.checkInMinute}:${detail.checkInSecond}`:'NOT AVAILABLE'}</div>
        <div>CheckedOut: {detail.checkedOut?`${detail.checkOutHours}:${detail.checkOutMinute}:${detail.checkOutSecond}`:'NOT AVAILABLE'}</div>
        <div>Status: {status}</div>
        <div><button onClick={editNode}>EDIT</button> <button onClick={deleteNode}>DELETE</button></div>
        </div>
        </>
    );
    }


export default AttendanceItem;