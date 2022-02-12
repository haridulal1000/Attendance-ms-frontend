import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceItem from "../attendanceitem/attendanceitem";
function Attendance(props){
    const {details,setDetails}=props;
    console.log('Inside component', props.details);
    const url='http://localhost:5000/api/attendances';
    const navigate=useNavigate();
    useEffect(async ()=>{
        if(localStorage.getItem('auth-token')===null){
            navigate('/login');

        }
          const authToken=localStorage.getItem('auth-token');
        const response=await fetch(url,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':authToken
            }
        });
        const json=await response.json(); 
        if(!json.success){
            alert('not loaded');
        }else{
            console.log(json);
            let temp=[];
            for(let i=0;i<json.checkIns.length;i++){
                temp.push({checkIn:json.checkIns[i],checkOut:json.checkOuts[i]});
            }

            console.log('temp',temp);
            setDetails(temp);
            console.log('Inside useeffect',details);

        }
        


        
    },[]);

       // if(details.length>0){
                 return(
               details.map((detail)=>{
                    return <AttendanceItem key={detail.checkIn._id} detail={detail}/>
                  })
                );
        //}
        // else{
        //     return(
        //         <h2>Nothing Records to Show</h2>
            // );
        // }
    }
    
    

export default Attendance;