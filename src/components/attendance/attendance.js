import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AttendanceItem from "../Attendanceitem/attendanceitem";
function Attendance(props){
    const {details,setDetails}=props;
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
          if(json.type===500){
              navigate('/error');
          }
        }else{
            setDetails(json.attendances);

        }
        


        
    },[]);

                 return(
               details.map((detail)=>{
                    return <AttendanceItem key={detail._id} detail={detail} />
                  })
                );
        
    }
    
    

export default Attendance;