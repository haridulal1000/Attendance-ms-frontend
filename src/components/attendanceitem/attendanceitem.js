import { useNavigate } from "react-router-dom";
import './attendanceitem.css';

function AttendanceItem(props){
    const {detail}=props;
    const url='http://localhost:5000/api/attendance/delete/';
    const navigate=useNavigate();
    let status;
    if(detail.checkIn===null){
        status='ABSENT';
    }else if((detail.checkIn!==null && detail.checkOut===null)|| detail.checkIn.checkedIn!==true){
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

        }else{
            window.location.reload();
        }
    }
    const editNode=()=>{
        navigate('/edit/'+JSON.stringify(detail));
    }

    return(
        <>
        <div className="attendance-item-container">
            <div>Date: {detail.checkIn.year}-{detail.checkIn.month}-{detail.checkIn.date}</div>
        <div>CheckedIn: {detail.checkIn?`${detail.checkIn.hours}:${detail.checkIn.minute}:${detail.checkIn.second}`:'NOT AVAILABLE'}</div>
        <div>CheckedOut: {detail.checkOut?`${detail.checkOut.hours}:${detail.checkOut.minute}:${detail.checkOut.second}`:'NOT AVAILABLE'}</div>
        <div>Status: {status}</div>
        <div><button onClick={editNode}>EDIT</button> <button onClick={deleteNode}>DELETE</button></div>
        </div>
        </>
    );
    }


export default AttendanceItem;