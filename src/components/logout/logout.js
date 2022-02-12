import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout(){
    const navigate=useNavigate();
    useEffect(()=>{
        localStorage.removeItem('auth-token');
        navigate('/login');
    });
    return(
        <></>
    );
}
export default Logout;