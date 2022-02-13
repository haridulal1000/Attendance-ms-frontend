import Attendance from "../attendance/attendance";
import { useState } from 'react';
import CheckIn from "../Checkin/checkin";

function Details(props){
    const [details, setDetails] = useState([]);
    console.log('props',props);
    return(
        <>
        <Attendance details={details} setDetails={setDetails} setEditDetails={props.setEditDetails}/>
        <CheckIn/>
        </>
    )
}
export default Details;