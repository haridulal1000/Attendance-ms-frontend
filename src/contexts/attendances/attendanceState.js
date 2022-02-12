import { useState } from "react";
import attendanceContext from "./attendanceContext";
const AttendanceState=(props)=>{
    const initialState={};
    const [state,setState]=useState(initialState);
    const loadAttendances=async(req,res)=>{
        const authToken=localStorage.getItem('auth-token');
        const response=await fetch('http://localhost:5000/api/attendances',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':authToken
            }
            
    
        });
        const json=await response.json(); 
        if(!json.success){

        }else{
            console.log(json);
            setState({checkIns:json.checkIns,checkOuts:json.checkOuts});
        }

    }
    return(
        <attendanceContext.Provider value={{state,loadAttendances}}>
            {props.children}
        </attendanceContext.Provider>
    );
}
export default AttendanceState;