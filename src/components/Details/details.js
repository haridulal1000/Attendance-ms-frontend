import Attendance from "../attendance/attendance";
import { useState } from 'react';
import CheckIn from "../Checkin/checkin";

function Details(props){
    const [details, setDetails] = useState([]);
    return(
        <>
        <Attendance details={details} setDetails={setDetails}/>
        <CheckIn/>
        </>
    )
}
export default Details;